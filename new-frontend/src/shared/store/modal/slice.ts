import { StateCreator } from 'zustand/vanilla'
import { ModalStateType } from './type'
import {StoreState} from "@/shared/store"

export const createModalSlice: StateCreator<StoreState, [], [], ModalStateType> = (set) => ({
  currentModal: null,
  openModal: (type) => set((state) => ({ modal: { ...state.modal, currentModal: type } })),
  closeModal: () => set((state) => ({ modal: { ...state.modal, currentModal: null } })),
})