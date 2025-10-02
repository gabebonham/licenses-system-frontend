'use client'
const handleDownload = (fileUrl: string) => {
  const link = document.createElement('a')
  link.href = fileUrl
  link.download = 'archive.zip'
  link.click()
}
export { handleDownload }
