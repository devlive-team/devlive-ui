export class DateService {
  
  static getFormattedDate = () => {
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
}