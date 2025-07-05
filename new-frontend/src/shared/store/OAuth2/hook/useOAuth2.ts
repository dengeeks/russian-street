import { useBoundStore } from '@/shared/store'

const useOAuth2 = () => useBoundStore(state => state.OAuth2)

export default useOAuth2
