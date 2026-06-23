import { BaseRequest } from '../common/vo/BaseRequest';

/**註冊使用者 request */
export interface RegisterRequest extends BaseRequest {
  userId: string;
  userName: string;
  userPd: string;
  email: string;
  phoneNumber: string;
}

/**註冊使用者 response */
export interface RegisterResponse {
  userId: string;
  userName: string;
  email: string;
  phoneNumber: string;
}
