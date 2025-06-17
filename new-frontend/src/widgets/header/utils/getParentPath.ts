export const getParentPath = (path: string) => {
  const segments = path.split('/').filter(Boolean)
  if (segments.length === 0) return '/'
  segments.pop()
  return '/' + segments.join('/')
}
