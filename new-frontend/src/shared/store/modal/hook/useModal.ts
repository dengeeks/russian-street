import { useBoundStore } from '@/shared/store'

const useModal = () => useBoundStore(state => state.modal)

export default useModal
