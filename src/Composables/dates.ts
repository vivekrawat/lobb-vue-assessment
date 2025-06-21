export const dates = () => {
  const date = new Date()
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const monthName = monthNames[date.getMonth()]

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const dayName = dayNames[date.getDay()]
  const dayNumber = date.getDate()

  return {
    monthName,
    dayName,
    dayNumber,
  }
}
