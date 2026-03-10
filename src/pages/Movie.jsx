import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function Movie(){
    const {movie} = useParams()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    
    const apiKey = import.meta.env.VITE_APP_API_KEY
    const decodedTitle = decodeURIComponent (movie)


useEffect(() => {
    const fetchMovie = async () => {
        try {
            setLoading(true)
            setError(null)

            const response = await fetch (`https://www.omdbapi.com/?t=${decodedTitle}&apikey=${apiKey}`)
            const data = await response.json()

            if(data.Response === "False"){
                setError("Fant ikke filmen")
            } else {
                setData(data)
            }
        } catch(err) {
            setError("Noe gikk galt med API-kallet")
        } finally {
            setLoading(false)
        }
    }
    fetchMovie()
}, [decodedTitle, apiKey])
    
    if(loading) return <p>Laster inn...</p>
    if (error) return <p> {error} </p>

    return (
        <main>
            <article>
                <header>
                    <h1>{data.Title}</h1>
                    <p>{data.Year}</p>
                </header>
                <section>
                    {data.Poster !== "N/A" && (
                        <img src={data.Poster} alt={data.Title} />
                    )}
                </section>
                <section>
                    <h2>Handling</h2>
                    <p>{data.Plot}</p>
                </section>
            </article>
        </main>
    
)
}