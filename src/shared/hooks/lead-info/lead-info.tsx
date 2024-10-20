import { useCallback } from "react"

interface LeadInfo {
  ad?: string | null
  source?: string | null
  name: string
  email: string
  phone: string
  avatar: string
  videoWatchTime: number
}

const getFormattedDate = () => {
  const currentDate = new Date()
  const options = {
    timeZone: 'America/Belize',
    hour12: false
  }
  const formattedDate = currentDate.toLocaleString('en-US', options)
  const [dateString, timeString] = formattedDate.split(', ')
  const [month, day, year] = dateString.split('/')
  const formattedDateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  const [hour, minute] = timeString.split(':')
  const formattedTimeStr = `${hour}:${minute}`
  const formattedDateTime = `${formattedDateStr} ${formattedTimeStr}`

  return formattedDateTime
}

export const useLeadInfo = () => {
  const onSaveLead = useCallback(async ({ ad, source, name, email, phone, avatar, videoWatchTime = 0 }: LeadInfo) => {
    const data = {
      AVATAR: avatar,
      NAME: name,
      EMAIL: email,
      PHONE: phone,
      START: getFormattedDate(),
      SUBMIT: getFormattedDate(),
      VSL_TIME: videoWatchTime,
      SOURCE: source,
      AD: ad,
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

      if (response.body && response?.ok) {
        const responseBody = await response.body.getReader().read()
        const responseText = new TextDecoder().decode(responseBody.value)
        const data = JSON.parse(responseText)
        return data.id
      }

      return response
    } catch(error) {
      console.log(error)
    }
  }, [])

  return { onSaveLead }
}