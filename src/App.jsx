import { useState } from 'react'

const API_KEY = import.meta.env.VITE_API_KEY

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [games, setGames] = useState([])

  const handleSearch = async () => {
    if (!searchQuery) return

    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${searchQuery}&page_size=10`
      )
      const data = await response.json()
      setGames(data.results)
      console.log('Games:', data.results)
    } catch (error) {
      console.log('Error fetching games:', error)
    }

  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>GameLibrary</h1>

      <div style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Search for games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '300px',
            padding: '10px',
            fontSize: '16px',
            marginRight: '10px'
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Search
        </button>
      </div>

      <div>
        <h2>Search Results ({games.length})</h2>

        {games.length === 0 ? (
          <p>No games found. Try searching!</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {games.map(game => (
              <div key={game.id} style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                backgroundColor: '#f9f9f9',
                color: '#333'
              }}>
                {game.background_image && (
                  <img
                    src={game.background_image}
                    alt={game.name}
                    style={{
                      width: '100%',
                      height: '200px',
                      borderRadius: '5px',
                      objectFit: 'cover'
                    }}
                  />
                )}
                <h3>{game.name}</h3>
                <p>Rating: {game.rating} / 5</p>
                <p>Released: {game.released}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App