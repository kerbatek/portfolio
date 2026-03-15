export const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export const formatDateShort = (date) =>
  new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
