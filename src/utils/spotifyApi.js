const API_BASE_URL = 'https://spotify81.p.rapidapi.com'

const getHeaders = () => ({
  'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
  'X-RapidAPI-Host': 'spotify81.p.rapidapi.com', 
  'Content-Type': 'application/json'
})

// download_track using YouTube
export const downloadTrackFromSearch = async (query) => {
  try {
    const url = `https://spotify81.p.rapidapi.com/download_track?q=${encodeURIComponent(query)}&onlyLinks=true`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
      }
    })

    if (!response.ok) {
      throw new Error(`Download failed: ${response.status}`)
    }

    const data = await response.json()
    return data?.[0]?.url || null
  } catch (error) {
    console.error(`Error downloading "${query}":`, error)
    return null
  }
}
