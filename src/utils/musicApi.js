import { downloadTrackFromSearch } from './spotifyApi'

const fixedSongList = [
  { name: 'Shape of You', artist: 'Ed Sheeran' },
  { name: 'Blinding Lights', artist: 'The Weeknd' },
  { name: 'Levitating', artist: 'Dua Lipa' },
  { name: 'Bad Guy', artist: 'Billie Eilish' },
  { name: 'Stay', artist: 'Justin Bieber' },
  { name: 'As It Was', artist: 'Harry Styles' },
  { name: 'Flowers', artist: 'Miley Cyrus' },
  { name: 'Peaches', artist: 'Justin Bieber' },
  { name: 'Unholy', artist: 'Sam Smith' },
  { name: 'Industry Baby', artist: 'Lil Nas X' },
  { name: 'Good 4 U', artist: 'Olivia Rodrigo' },
  { name: 'drivers license', artist: 'Olivia Rodrigo' },
  { name: 'Dance Monkey', artist: 'Tones and I' },
  { name: 'Sunflower', artist: 'Post Malone' },
  { name: 'Señorita', artist: 'Shawn Mendes' }
]

// Shuffle array
const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Generate wrong answers
const generateWrongAnswers = (correct, pool) => {
  const others = pool.filter(t => t.name !== correct.name)
  return shuffleArray(others).slice(0, 3).map(t => ({
    name: t.name,
    artist: t.artist
  }))
}

// Build question
const createQuestion = (track, allTracks) => {
  const correctAnswer = { name: track.name, artist: track.artist }
  const wrongAnswers = generateWrongAnswers(track, allTracks)
  const options = shuffleArray([correctAnswer, ...wrongAnswers])
  const correctAnswerIndex = options.findIndex(
    opt => opt.name === correctAnswer.name && opt.artist === correctAnswer.artist
  )

  return {
    id: track.id,
    name: track.name,
    artist: track.artist,
    url: track.url,
    options,
    correctAnswer: correctAnswerIndex
  }
}

// Final fetchSongs function
export const fetchSongs = async () => {
  const collectedTracks = []

  for (let i = 0; i < fixedSongList.length; i++) {
    const track = fixedSongList[i]
    const query = `${track.name} ${track.artist}`
    console.log(`Downloading: ${query}`)

    const url = await downloadTrackFromSearch(query)

    if (url) {
      collectedTracks.push({
        id: `real-${i}`,
        name: track.name,
        artist: track.artist,
        url
      })
    }

    // for rate limiting
    await new Promise(res => setTimeout(res, 800))
  }

  if (collectedTracks.length < 5) {
    throw new Error('Not enough downloadable tracks found.')
  }

  const selected = shuffleArray(collectedTracks).slice(0, 5)
  return selected.map(track => createQuestion(track, collectedTracks))
}
