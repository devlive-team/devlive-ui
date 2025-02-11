import { useCallback, useState } from "react"

import { DateService } from "@/shared/services"

interface LeadQuestions {
  pageId: string;
  english: string;
  job: string;
  experience: string;
  goal: string;
  salaryGoal: string;
  salaryGap: string;
  urgency: string;
  budget: string;
  isValidApplication: boolean;
}

interface LeadInfo {
  ad?: string | null
  name: string
  email: string
  phone: string
  country: string
}

export const useLeadQuestions = () => {
  const [isLoading, setIsLoading] = useState(false)
  
  const onSaveQuestions = useCallback(async (fbclid: string | null, questions: LeadQuestions, lead: LeadInfo) => {
    setIsLoading(true)

    const data = {
      AD: lead.ad,
      NAME: lead.name,
      EMAIL: lead.email,
      PHONE: lead.phone,
      COUNTRY: lead.country,
      END:  DateService.getFormattedDate(),
      FBC: fbclid,
      PAGE_ID: questions.pageId,
      JOB: questions.job,
      GOAL: questions.goal,
      BUDGET: questions.budget,
      ENGLISH: questions.english,
      URGENCY: questions.urgency,
      SALARY_GAP: questions.salaryGap,
      EXPERIENCE: questions.experience,
      SALARY_GOAL: questions.salaryGoal,
      IS_VALID: questions.isValidApplication,
    }
    
    try {
      const response = await fetch('https://devlive-website-leads-9608.twil.io/lead-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        mode: 'cors',
        body: JSON.stringify(data)
      })
      setIsLoading(false)

      return response?.ok
    } catch(error) {
      setIsLoading(false)
      console.log(error)
    }
  }, [setIsLoading])

  return { isLoading, onSaveQuestions }
}