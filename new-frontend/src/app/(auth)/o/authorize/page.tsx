import BannerHome from '@/widgets-page/home/banner'
import { getHome } from '@/shared/api/static/home/getHome'
import OAuth2Client from '@/features/OAuth2/OAuth2Client'

interface OAuth2PageProps {
  searchParams: Promise<{
    response_type: string
    code_challenge: string
    code_challenge_method: string
    client_id: string
    redirect_uri: string
    scope: string
  }>
}

export default async function OAuth2Page({ searchParams }: OAuth2PageProps) {
  const [data, homeData] = await Promise.all([
    searchParams,
    getHome()
  ]);

  const { promotional_video} = homeData;

  return (
    <>
      <BannerHome promoVideo={promotional_video}/>
      <OAuth2Client {...data} />

    </>
  )
}
