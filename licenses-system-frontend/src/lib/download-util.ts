'use server'
import { Expert } from "@/entities/expert.entity"
import { api } from "./api"

const handleDownload = async (entity: Expert) => {
  try {
    // Send request to download file as a blob
    const res = await api.get('/experts/download/' + entity.id, {
      responseType: 'blob', // Ensure response is a blob
    })
    return res.data    
    
  } catch (e) {
    console.error("Error downloading file:", e)
  }
}

export { handleDownload }
