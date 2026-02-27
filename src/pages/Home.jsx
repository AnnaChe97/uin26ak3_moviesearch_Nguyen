import { useState } from "react"

export default function Home(){

    const [search, setSearch] = useState()

    const baseUrl = `https://www.omdbapi.com/?s=${search}&apikey=`
    const apiKey = 'c59ff595'

    const getMovies = async()=>{
        try {
            const response = await fetch(`${baseUrl}${apiKey}`)
            const data = response.json()
            console.log(data)
        } catch (err) {
            console.error(err)
        }
    }

    const handleChange = (e)=>{
        setSearch(e.target.value)
}
    return (
    <main>
        <h1>Forside</h1>
        <form>
            <label>
                Søk etter film
                <input type="search" placeholder="The Forbidden Kingdom" onChange={handleChange}></input>
            </label>
        </form>
        <button onClick={getMovies}>Søk</button>
    </main>
    )
}