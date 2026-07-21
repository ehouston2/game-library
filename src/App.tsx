import { useEffect, useState } from 'react'

export interface Game {
  id: number;
  name: string;
  background_image: string | null;
  rating: number;
  released: string;
}

export interface RAWGResponse {
  count: number;
  results: Game[];
}


const API_KEY = import.meta.env.VITE_API_KEY

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [games, setGames] = useState<Game[]>([])

  const [library, setLibrary] = useState<Game[]>(() => {
    const savedGames = localStorage.getItem('user-game-library')
    if (savedGames) {
      return JSON.parse(savedGames) as Game[]
    }
    return []
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchGamesData = async () => {

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: RAWGResponse = await response.json();
      setGames(data.results);

    } catch (err) {
      // 2. Catch any network or server failures safely
      setError("Failed to fetch games. Please try again later.");
    } finally {
      // 3. Turn off the loading spinner no matter what (success or failure)
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGamesData();
  }, []);

  useEffect(() => {
    localStorage.setItem('user-game-library', JSON.stringify(library))
  }, [library]);

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

  const addToLibrary = (game: Game) => {
    if (library.find(g => g.id === game.id)) {
      alert('Game already in your library!')
      return
    }

    setLibrary([...library, game])
    console.log('Added to library:', game.name)
  }

  const removeFromLibrary = (gameIdToRemove: number) => {
    const updatedLibrary = library.filter((game) => game.id !== gameIdToRemove);
    setLibrary(updatedLibrary);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>GameLibrary</h1>

      {error && (
        <div style={{ padding: '10px', backgroundColor: '#fee', color: '#c00', border: '1px solid #c00', borderRadius: '5px', marginBottom: '20px' }}>
          {error}
        </div>
      )}

      {isLoading && (
        <div style={{ fontSize: '18px', fontStyle: 'italic', marginBottom: '20px' }}>
          Loading games...
        </div>
      )}

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

                <button
                  onClick={() => addToLibrary(game)}
                  style={{
                    marginTop: '10px',
                    padding: '8px 16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Add to Library
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: '50px', borderTop: '2px solid #ddd', paddingTop: '30px' }}>
        <h2>Your Library ({library.length} games) </h2>

        {library.length === 0 ? (
          <p>No games in your library yet. Search and add some!</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {library.map(game => (
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

                <button
                  onClick={() => removeFromLibrary(game.id)}
                  style={{
                    marginTop: '10px',
                    padding: '8px 16px',
                    backgroundColor: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
export default App