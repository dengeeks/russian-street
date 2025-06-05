import { StateCreator } from 'zustand/vanilla'
import { ModalState } from './type'
import {StoreState} from "@/shared/store"

export const createModalSlice: StateCreator<StoreState, [], [], ModalState> = (set) => ({
  currentModal: null,
  openModal: (type) => set((state) => ({ modal: { ...state.modal, currentModal: type } })),
  closeModal: () => set((state) => ({ modal: { ...state.modal, currentModal: null } })),
})