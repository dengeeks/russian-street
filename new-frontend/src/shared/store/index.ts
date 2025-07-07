import { create } from 'zustand'
import { createModalSlice } from '@/shared/store/modal/slice'
import {createOAuth2Slice} from '@/shared/store/OAuth2/slice'
import {createRegionSlice} from '@/shared/store/listRegion/slice'
import { StoreState } from './type'


export const useBoundStore =  create<StoreState>()((...a) => ({
  modal: createModalSlice(...a),
  OAuth2: createOAuth2Slice(...a),
  listRegion: createRegionSlice(...a)
}))