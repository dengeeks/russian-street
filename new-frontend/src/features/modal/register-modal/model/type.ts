import { RegisterType } from '@/shared/api/user/postRegister'

export type RegisterUserType = RegisterType & {
  agreement: boolean;
  memberRightsAgreement: boolean;
}