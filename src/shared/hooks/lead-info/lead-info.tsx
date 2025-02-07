import { useCallback, useState } from "react"

import { DateService } from '@/shared/services'

interface LeadInfo {
  ad?: string | null
  source?: string | null
  username?: string | null
  name: string
  email: string
  phone: string
  country: string
  avatar: string
  startAt: string
  videoWatchTime: number
}

export const useLeadInfo = () => {
  const [isLoading, setIsLoading] = useState(false)

  const onSaveLead = useCallback(async (fbclid: string | null, { ad, source, username, name, email, phone, country, avatar, startAt, videoWatchTime = 0 }: LeadInfo) => {
    setIsLoading(true)

    const data = {
      AVATAR: avatar,
      NAME: name,
      EMAIL: email,
      PHONE: phone,
      COUNTRY: country,
      START: startAt,
      SUBMIT: DateService.getFormattedDate(),
      VSL_TIME: videoWatchTime,
      SOURCE: source,
      AD: ad,
      FBC: fbclid,
      USERNAME: username
    }
    
    try {
      const response = await fetch('https://devlive-website-leads-9608.twil.io/notion-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        mode: 'cors',
        body: JSON.stringify(data)
      })

      setIsLoading(false)

      if (response.body && response?.ok) {
        const responseBody = await response.body.getReader().read()
        const responseText = new TextDecoder().decode(responseBody.value)
        const data = JSON.parse(responseText)
        return data.id
      }

      return response
    } catch(error) {
      console.log(error)
      setIsLoading(false)
    }
}, [setIsLoading])

  return { isLoading, onSaveLead }
}