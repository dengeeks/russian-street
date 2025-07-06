import { ModalStateType } from '@/shared/store/modal/type'
import { OAuth2StateType } from '@/shared/store/OAuth2/type'
import { RegionStateType } from '@/shared/store/listRegion/type'

export type StoreState = {
  modal: ModalStateType;
  OAuth2: OAuth2StateType;
  listRegion: RegionStateType;
}
