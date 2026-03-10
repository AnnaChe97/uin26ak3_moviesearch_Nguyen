import { Link } from "react-router-dom"


export default function MovieListItem({movie}){
    
    const slug = encodeURIComponent(movie.Title)

    return (
        <li>
            <article>
                <header>
                    <h3><Link to={`/${slug}`}>
                        {movie.Title}
                        </Link>
                    </h3>
                    <p>{movie.Year}</p>
                    </header>
                    <section>
                        {movie.Poster && movie.Poster !== "N/A"
                        ? <img src={movie.Poster} alt={`Poster for ${movie.Title}`} />
                        : null}
                    </section>
            </article>
        </li>
    )
}