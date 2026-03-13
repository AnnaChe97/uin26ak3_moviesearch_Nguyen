import { useEffect, useState } from "react"
import History from "../components/History"
import MovieList from "../components/MovieList"


export default function Home(){

    const [search, setSearch] = useState("")
    const storedHistory = localStorage.getItem("search")
    const [focused, setFocused] = useState(false)
    const[history, setHistory] = useState (storedHistory ? JSON.parse(storedHistory) : [])

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    console.log ("Denne kommer fra storage", storedHistory)

    const apiKey = import.meta.env.VITE_APP_API_KEY

    useEffect(()=>{
            localStorage.setItem("search", JSON.stringify(history))
    }, [history])


    useEffect( ()=> {
        const getBondMovies = async () => {
            try {
                setLoading(true)
                setError (null)

            const response = await fetch (`https://www.omdbapi.com/?s=james%20bond&type=movie&apikey=${apiKey}`)
            const data = await response.json()

            if (data.Response == "True") {
                setMovies(data.Search)
            } else {
                setError("Kunne ikke finne James Bond filmer")}
            } catch (err) {
                setError("Noe gikk galt med API-kallet")
            } finally {
                setLoading(false)
            }
        }
        getBondMovies()
    }, [apiKey])

        const getMovies = async()=>{
        try
        {
            const response = await fetch(`${baseUrl}${apiKey}`)
            const data = await response.json()
            
            console.log(data)

        }
        catch(err){
            console.error(err);
        }
    }


    useEffect(() => {
        if (search.length < 3) return

        const searchMovies = async () => {
            try {
                setLoading(true)
                setError(null)

            const response = await fetch (
                `https://www.omdbapi.com/?s=${search}&apikey=${apiKey}` )
            const data = await response.json()

                if (data.Response === "True") {
                    setMovies(data.Search)
                } else {
                    setMovies([])
                    setError("Ingen filmer funnet")
                }
            } catch (err) {
                setError("Noe gikk galt med søket")
            } finally {
                setLoading(false)
            }
        }
        searchMovies()
    }, [search, apiKey])


    const handleChange = (e)=>{
        setSearch(e.target.value)
}
    const handleSubmit = (e)=>{
        e.preventDefault()
        if (!search) return
        e.target.reset()
        setHistory((prev) => [...prev, search])

    }   

return (
    <main>
        <header>
            <h1>Forside</h1>
        </header>
        <section>
            <form onSubmit={handleSubmit}>
                <label>
                    Søk etter film:
                    <input 
                    type="search"
                    placeholder="James Bond"
                    value={search}
                    onChange={handleChange}
                    onFocus={() => setFocused(true)}
                    />
                </label>

                {focused && <History history={history} setSearch={setSearch} onChange={handleChange}/>}
            </form>
                <button onClick={getMovies}>Søk</button>
        </section>
        <section>
            {loading && <p>Laster inn filmer...</p>}
            {error && <p> {error} </p>}
            {!loading && !error && movies.length > 0 && (
                <MovieList movies={movies} />
            )}
        </section>
    </main>
    )
} 

