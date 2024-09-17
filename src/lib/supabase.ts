import { createClient } from "@supabase/supabase-js";
import { MoviesByCategoryType, MovieType } from "@/lib/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getMoviesByCategory(): Promise<MoviesByCategoryType> {
  const { data, error } = await supabase
    .from('movies')
    .select('*');

    console.log(data);

  if (error) {
    throw new Error(error.message);
  }

  const moviesByCategory: MoviesByCategoryType = data.reduce((acc, movie) => {
    const category = movie.genre;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(movie);
    return acc;
  }, {} as MoviesByCategoryType);

  return moviesByCategory;
}
