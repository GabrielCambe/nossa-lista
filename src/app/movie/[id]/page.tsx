import { Movie } from '@/components/movie';
import { getMoviesByCategory } from '@/lib/supabase';
import { MovieType, MoviesByCategoryType } from '@/lib/types';

export async function generateStaticParams() {
  const moviesByCategory: MoviesByCategoryType = await getMoviesByCategory();
  const movieIds = Object.values(moviesByCategory).flat().map((movie: MovieType) => movie.id);
  return movieIds.map(id => ({ id: id.toString() }));
}

export default function MoviePage() {
  // const router = useRouter();
  // const { id } = router.query;

  // In a real application, you would fetch the movie details based on the title
  // For now, we'll use placeholder data
  // const movie = movieById(id);

  return (
    // <Movie movie={movie}/>
    <Movie />
 );
}