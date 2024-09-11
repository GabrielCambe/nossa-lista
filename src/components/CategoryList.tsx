import { MovieCard } from "@/components/MovieCard";
import { MovieType } from "@/lib/types";

interface CategoryListProps {
  title: string;
  movies: MovieType[];
  onMovieClick?: (movie: MovieType) => void;
}

export function CategoryList({ title, movies, onMovieClick }: CategoryListProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </div>
  );
}
