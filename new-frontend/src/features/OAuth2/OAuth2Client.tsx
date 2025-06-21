'use client'
import { postOAuth2, OAuth2Type, PostOAuth2Response } from '@/shared/api/OAuth2/postOAuth2'
import { useCallback, useEffect, useState } from 'react'
import useOAuth2 from '@/shared/store/OAuth2'
import useModal from '@/shared/store/modal'
import {useRouter} from 'next/navigation'
import { useBodyScrollLock } from '@/shared/hooks/useBodyScrollLock'

const OAuth2Client = (data: OAuth2Type) => {
  const [OAuth2Data, setOAuth2Data] = useState<PostOAuth2Response>({ status: 0, json: null });
  const {triggerOAuth2} = useOAuth2()
  const {openModal} = useModal()
  const router = useRouter()

  const fetchOAuth2 = useCallback(async () => {
    const response = await postOAuth2(data)
    setOAuth2Data(response)
  }, [data]);

  useBodyScrollLock(false)

  useEffect(() => {
    void fetchOAuth2();
  }, [fetchOAuth2, triggerOAuth2]);

  useEffect(() => {

    if (OAuth2Data.status === 401) {
      openModal('login-user')
    }

    if (OAuth2Data.json?.url) {
      router.push(OAuth2Data.json.url)
    }

  }, [OAuth2Data, openModal, router])

  return (
    <>

    </>
  )
}

export default OAuth2Client;