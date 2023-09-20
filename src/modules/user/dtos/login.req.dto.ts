import { LoginSceneType } from '../../auth/constants/auth.constant';

export class LoginReqDto {
  name: string;
  type: LoginSceneType;
}
