import { create } from 'zustand'
import { ModalState } from '@/shared/store/modal/type'
import { createModalSlice } from '@/shared/store/modal/slice'


export type StoreState = {
  modal: ModalState
}

export const useBoundStore =  create<StoreState>()((...a) => ({
  modal: createModalSlice(...a),
}))