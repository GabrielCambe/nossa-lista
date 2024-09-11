import { createClient } from "@supabase/supabase-js";
import { MoviesByCategoryType } from "@/lib/types";

if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_KEY
) {
  throw new Error("Supabase URL or key is not set");
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export const moviesByCategory: MoviesByCategoryType = {
  Horror: [
    {
      id: 1,
      title: "The Exorcist",
      genre: "Horror",
      year: "1973",
      imageUrl: "/placeholder.svg",
      link: "#",
    },
  ],
  "Sci-Fi": [
    {
      id: 2,
      title: "Inception",
      genre: "Sci-Fi",
      year: "2010",
      imageUrl: "/placeholder.svg",
      link: "#",
    },
  ],
  Action: [
    {
      id: 3,
      title: "The Shawshank Redemption",
      genre: "Drama",
      year: "1994",
      imageUrl: "/placeholder.svg",
      link: "#",
    },
    {
      id: 4,
      title: "Inception",
      genre: "Sci-Fi",
      year: "2010",
      imageUrl: "/placeholder.svg",
      link: "#",
    },
  ],
  Comedy: [
    {
      id: 5,
      title: "The Dark Knight",
      genre: "Action",
      year: "2008",
      imageUrl: "/placeholder.svg",
      link: "#",
    },
    {
      id: 6,
      title: "The Lord of the Rings: The Fellowship of the Ring",
      genre: "Fantasy",
      year: "2001",
      imageUrl: "/placeholder.svg",
      link: "#",
    },
  ],
  Drama: [
    {
      id: 7,
      title: "The Shawshank Redemption",
      genre: "Drama",
      year: "1994",
      imageUrl: "/placeholder.svg",
      link: "#",
    },
  ],
};
