import { BaseRequest } from '../common/vo/BaseRequest';

/**忘記密碼 request */
export interface ForgotPasswordRequest extends BaseRequest {
  email: string;
  phoneNumber: string;
}
