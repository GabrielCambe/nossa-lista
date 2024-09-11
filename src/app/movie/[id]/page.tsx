import { Movie } from '@/components/movie';
import { MovieType } from '@/lib/types';
import { moviesByCategory
  // , movieById
} from '@/lib/supabase';

export async function generateStaticParams() {
  const movieIds = Object.values(moviesByCategory).flat().map(movie => movie.id);
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