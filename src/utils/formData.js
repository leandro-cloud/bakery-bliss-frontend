export function objectToFormData(obj) {
  const formData = new FormData()

  Object.entries(obj).forEach(([key, value]) => {
    if (key === "ingredients" || key === "category" || key === "instructions") {
      formData.append(key, JSON.stringify(value))
    } else {
      formData.append(key, value)
    }
  })
  
  return formData
}


export const cleanData = (data) => {
  const dataCleaned = {}

  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'string' && value !== '') {
      dataCleaned[key] = value
    } else if (Array.isArray(value) && value.length > 0) {
      dataCleaned[key] = value
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value) && Object.keys(value).length > 0) {
      dataCleaned[key] = value
    } else if (value instanceof File) {
      dataCleaned[key] = value
    }
  })

  return dataCleaned
}