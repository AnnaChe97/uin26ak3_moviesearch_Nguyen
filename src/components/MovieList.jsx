import MovieListItem from './MovieListItem'

export default function MovieList({movies}){

    return(
        <section>
            <h2>Filmer</h2>
            <ul>
                {movies?.map(movie => (
                    <MovieListItem key={movie.imdbID} movie={movie} />
                ))}
            </ul>
        </section>
    )
} 
