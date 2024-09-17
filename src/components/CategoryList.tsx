import { MovieCard } from "@/components/MovieCard";
import { MovieType } from "@/lib/types";

interface CategoryListProps {
  title: string;
  movies: MovieType[];
  onMovieClick?: (movie: MovieType) => void;
}

export function CategoryList({ title, movies, onMovieClick }: CategoryListProps) {
  return (
    <>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
    </>
  );
}
