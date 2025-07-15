import privacyPolicy from '@/shared/legal-json/privacy-policy.json'
import Documentation from '@/widgets-page/legal/Documentation'

export default async function PrivacyPolicyPage() {
  return (
    <Documentation data={privacyPolicy}/>
  )
}
