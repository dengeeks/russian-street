export type JoinOrganizationType = {
  // Личные данные
  firstName: string
  lastName: string
  patronymic: string
  email: string
  phone: string
  birthDate: string
  gender: 'М' | 'Ж'
  city: string
  social: string

  // Паспортные данные
  passportSeries: string
  passportNumber: string
  passportIssueDate: string
  passportIssuedBy: string

  // Согласия
  memberRightsAgreement: boolean
  agreement: boolean
}