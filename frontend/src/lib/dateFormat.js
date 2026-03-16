export const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''

export const formatDateShort = (date) =>
  date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''
