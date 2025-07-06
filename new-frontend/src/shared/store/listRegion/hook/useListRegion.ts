import { useBoundStore } from '@/shared/store'

const useRegion = () => useBoundStore(state => state.listRegion)

export default useRegion
