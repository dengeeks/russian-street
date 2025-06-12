import ResetPasswordForm from '@/features/modal/reset-password-modal'
import BannerHome from '@/widgets-page/home/banner'
import { getHome } from '@/shared/api/static/home/getHome'

interface ResetPasswordPageProps {
  params: Promise<{ uid: string; token: string }>
}

export default async function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  const { uid, token } = await params

  const homeData = await getHome()

  const { promotional_video } = homeData;

  return (
    <>
      <BannerHome promoVideo={promotional_video} />
      <ResetPasswordForm uid={uid} token={token} />
    </>
  )
}
