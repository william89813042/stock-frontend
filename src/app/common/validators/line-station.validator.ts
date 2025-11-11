import { AbstractControl, ValidationErrors, FormArray, ValidatorFn } from "@angular/forms";


// 檢查Station是否重複
export function markDuplicateStations(control: AbstractControl): ValidationErrors | null {
  const formArray = control as FormArray;

  const stationMap = new Map<string, number[]>();

  formArray.controls.forEach((group, idx) => {
    const stationCtrl = group.get('station');
    const stationValue = stationCtrl?.value;

    // 清除原本的 duplicate 錯誤
    if (stationCtrl?.hasError('duplicate')) {
      const errors = { ...stationCtrl.errors };
      delete errors['duplicate'];
      stationCtrl.setErrors(Object.keys(errors).length ? errors : null);
    }

    if (stationValue) {
      if (!stationMap.has(stationValue)) {
        stationMap.set(stationValue, []);
      }
      stationMap.get(stationValue)!.push(idx);
    }
  });

  // 標記重複項目
  stationMap.forEach((indexes) => {
    if (indexes.length > 1) {
      indexes.forEach(idx => {
        const stationCtrl = formArray.at(idx).get('station');
        const currentErrors = stationCtrl?.errors || {};
        stationCtrl?.setErrors({ ...currentErrors, duplicate: true });
      });
    }
  });

  return null; // formArray 本身不需要設錯誤
}


// 檢查Seq是否重複
export function markDuplicateSeqs(control: AbstractControl): ValidationErrors | null {
  const formArray = control as FormArray;

  const seqMap = new Map<number, number[]>();

  formArray.controls.forEach((group, idx) => {
    const seqCtrl = group.get('seq');
    const seqValue = Number(seqCtrl?.value);

    // 清除原本的 duplicate 錯誤
    if (seqCtrl?.hasError('duplicate')) {
      const errors = { ...seqCtrl.errors };
      delete errors['duplicate'];
      seqCtrl.setErrors(Object.keys(errors).length ? errors : null);
    }

    if (!isNaN(seqValue) && seqValue > 0) {
      if (!seqMap.has(seqValue)) {
        seqMap.set(seqValue, []);
      }
      seqMap.get(seqValue)!.push(idx);
    }
  });

  // 標記重複 seq
  seqMap.forEach(indexes => {
    if (indexes.length > 1) {
      indexes.forEach(idx => {
        const seqCtrl = formArray.at(idx).get('seq');
        const errors = seqCtrl?.errors || {};
        seqCtrl?.setErrors({ ...errors, duplicate: true });
      });
    }
  });

  return null;
}



// 檢查Seq是否連續
export function checkSeqOrdered(control: AbstractControl): ValidationErrors | null {
  const formArray = control as FormArray;

  const seqValues: number[] = [];

  formArray.controls.forEach((group, idx) => {
    const seqCtrl = group.get('seq');
    const value = Number(seqCtrl?.value);

    // 移除舊的 notOrdered 錯誤
    if (seqCtrl?.hasError('notOrdered')) {
      const errors = { ...seqCtrl.errors };
      delete errors['notOrdered'];
      seqCtrl.setErrors(Object.keys(errors).length ? errors : null);
    }

    if (!isNaN(value) && value > 0) {
      seqValues.push(value);
    }
  });

  // 檢查連續性
  const sorted = [...seqValues].sort((a, b) => a - b);
  const expected = Array.from({ length: sorted.length }, (_, i) => i + 1);
  const notOrdered = sorted.some((val, idx) => val !== expected[idx]);

  if (notOrdered) {
    // 所有 seq 都標示錯誤
    formArray.controls.forEach((group) => {
      const ctrl = group.get('seq');
      const errors = ctrl?.errors || {};
      ctrl?.setErrors({ ...errors, notOrdered: true });
    });
  }

  return null;
}


// 檢查Time是否根據seq遞增
export function checkTimeOrdered(control: AbstractControl): ValidationErrors | null {
  const formArray = control as FormArray;

  // 依據 seq 欄位排序 controls
  const sortedControls = [...formArray.controls].sort((a, b) => {
    const seqA = Number(a.get('seq')?.value);
    const seqB = Number(b.get('seq')?.value);
    return seqA - seqB;
  });

  let prevTime: number | null = null;

  sortedControls.forEach(group => {
    const timeCtrl = group.get('time');
    const timeValue = Number(timeCtrl?.value);

    // 清除舊的錯誤訊息
    if (timeCtrl?.hasError('notOrderedTime')) {
      const errors = { ...timeCtrl.errors };
      delete errors['notOrderedTime'];
      timeCtrl.setErrors(Object.keys(errors).length ? errors : null);
    }

    if (!isNaN(timeValue)) {
      if (prevTime !== null && timeValue <= prevTime) {
        const errors = timeCtrl?.errors || {};
        timeCtrl?.setErrors({ ...errors, notOrderedTime: true });
      }
      prevTime = timeValue;
    }
  });

  return null;
}


// 檢查起始/終點次序是否正確
export function checkBoundarySeq(lineValue?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formArray = control as FormArray;
    if (!lineValue || typeof lineValue !== 'string') return null;

    // 將 line 字串分割成站點代碼陣列（每三碼為一個站點代碼）
    const stationCodes: string[] = [];
    for (let i = 0; i < lineValue.length; i += 3) {
      const code = lineValue.substring(i, i + 3).trim();
      if (code) {
        stationCodes.push(code);
      }
    }

    // 第一個起站，第二個終點站
    const firstStation = stationCodes[0];
    const lastStation = stationCodes[1];

    let firstSeq: number | undefined;
    let lastSeq: number | undefined;

    formArray.controls.forEach(group => {
      const station = group.get('station')?.value;
      const seq = Number(group.get('seq')?.value);
      if (station === firstStation) {
        firstSeq = seq;
      }
      if (station === lastStation) {
        lastSeq = seq;
      }
    });

    // 清除原本的錯誤
    formArray.controls.forEach(group => {
      const seqCtrl = group.get('seq');
      if (seqCtrl?.hasError('boundaryError')) {
        const errors = { ...seqCtrl.errors };
        delete errors['boundaryError'];
        seqCtrl.setErrors(Object.keys(errors).length ? errors : null);
      }
    });

    let hasError = false;

    if (firstSeq !== 1) {
      // 找出第一站，標記錯誤
      formArray.controls.forEach(group => {
        if (group.get('station')?.value === firstStation) {
          const ctrl = group.get('seq');
          const errors = ctrl?.errors || {};
          ctrl?.setErrors({ ...errors, boundaryError: true });
        }
      });
      hasError = true;
    }

    if (lastSeq !== formArray.length) {
      // 找出最後一站，標記錯誤
      formArray.controls.forEach(group => {
        if (group.get('station')?.value === lastStation) {
          const ctrl = group.get('seq');
          const errors = ctrl?.errors || {};
          ctrl?.setErrors({ ...errors, boundaryError: true });
        }
      });
      hasError = true;
    }

    return hasError ? { boundaryError: true } : null;
  };
}



