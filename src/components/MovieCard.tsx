import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { MovieType } from "@/lib/types";

interface MovieCardProps {
  movie: MovieType;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="group overflow-hidden rounded-lg shadow-lg transition-all hover:scale-105 hover:shadow-xl">
      <Link href={`/movie/${movie.id}`} prefetch={false}>
        <CardContent className="p-0 relative aspect-square">
          <Image
            src={movie.imageUrl}
            alt="Movie Poster"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            style={{ aspectRatio: "300/300", objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-4">
            <div className="text-white text-xl font-bold line-clamp-1">
              {movie.title}
            </div>
            <div className="text-white text-sm font-medium line-clamp-1">
              {movie.genre}
            </div>
            <div className="text-white text-sm font-medium line-clamp-1">
              {movie.year}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
