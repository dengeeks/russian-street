import dogovor from '@/shared/legal-json/dogovor-oferty.json'
import Documentation from '@/widgets-page/legal/Documentation'

export default async function DogovorOfertyPage() {
  return (
        <Documentation data={dogovor}/>
  )
}
