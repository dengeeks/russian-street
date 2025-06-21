import { StateCreator } from 'zustand/vanilla'
import {StoreState} from "@/shared/store"
import { OAuth2StateType } from '@/shared/store/OAuth2/type'

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
