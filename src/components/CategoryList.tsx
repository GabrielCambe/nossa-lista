import { MovieCard } from "@/components/MovieCard";

interface Movie {
  title: string;
  genre: string;
  year: string;
  imageUrl: string;
  link: string;
}

interface CategoryListProps {
  title: string;
  movies: Movie[];
}

export function CategoryList({ title, movies }: CategoryListProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="grid grid-cols-2 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.title} // Assuming title is unique
            title={movie.title}
            genre={movie.genre}
            year={movie.year}
            imageUrl={movie.imageUrl}
            link={movie.link}
          />
        ))}
      </div>
    </div>
  );
}
