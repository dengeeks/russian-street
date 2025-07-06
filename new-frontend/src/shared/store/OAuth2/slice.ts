import { StateCreator } from 'zustand/vanilla'
import {StoreState} from "@/shared/store/type"
import { OAuth2StateType } from './type'

export const createOAuth2Slice: StateCreator<StoreState, [], [], OAuth2StateType> = (set) => ({
  triggerOAuth2: false,
  toggleTriggerOAuth2: () =>
    set((prev) => ({
      OAuth2: {
        ...prev.OAuth2,
        triggerOAuth2: !prev.OAuth2.triggerOAuth2,
      },
    })),
})
