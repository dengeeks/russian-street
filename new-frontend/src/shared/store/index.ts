import { create } from 'zustand'
import { ModalStateType } from '@/shared/store/modal/type'
import { createModalSlice } from '@/shared/store/modal/slice'

import {createOAuth2Slice} from '@/shared/store/OAuth2/slice'
import {OAuth2StateType} from '@/shared/store/OAuth2/type'

export type StoreState = {
  modal: ModalStateType;
  OAuth2: OAuth2StateType;

}

export const useBoundStore =  create<StoreState>()((...a) => ({
  modal: createModalSlice(...a),
  OAuth2: createOAuth2Slice(...a)
}))