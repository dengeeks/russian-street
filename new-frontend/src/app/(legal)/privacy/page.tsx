import policy from '@/shared/legal-json/privacy.json'
import Documentation from '@/widgets-page/legal/Documentation'

export default async function PrivacyPage() {
  return (
        <Documentation data={policy}/>
  )
}
