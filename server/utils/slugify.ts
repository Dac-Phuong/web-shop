export const slugify = (text: string, maxLength = 100): string => {
  if (!text) return ''

  return text
    .toString()
    .normalize('NFD')                
    .replace(/[\u0300-\u036f]/g, '')  
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')      
    .replace(/\s+/g, '-')              
    .replace(/-+/g, '-')              
    .replace(/^-+|-+$/g, '')         
    .slice(0, maxLength)
}
