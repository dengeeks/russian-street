import { IconName } from '@/shared/icon/type'

export const legalRouteMap: Record<string, { title: string; isFile: boolean; icon: IconName }> = {
  '/dogovor-oferty': {
    title: 'Договор-оферта',
    isFile: false,
    icon: 'donating'
  },
  '/privacy-policy': {
    title: 'Политика конфиденциальности',
    isFile: false,
    icon: 'user-lock'
  },
  '/assets/legal/Устав_ОООУКС_Улицы_России_оригинал.pdf': {
    title: 'Устав',
    isFile: true,
    icon: 'book'
  },
  '/assets/legal/Согласие_на_обработку_персональных_данных_Сайт_УР.pdf': {
    title: 'Согласие на обработку персональных данных',
    isFile: true,
    icon: 'user-check'
  }
}
