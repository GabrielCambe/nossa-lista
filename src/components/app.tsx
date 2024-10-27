"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dice5Icon, ListIcon, PlusIcon } from "@/components/icons";
import { CategoryList } from "@/components/CategoryList";
import { FilterDropdown } from "@/components/FilterDropdown";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { useAuth } from "@/context/AuthContext";
import { getMoviesByCategory } from "@/lib/firestore";
import { MoviesByCategoryType } from "@/lib/types";

export function App() {
  const { user, loading } = useAuth();
  
  const [selectedCategory, setSelectedCategory] = useState<string>("Filter");
  const [moviesByCategory, setMoviesByCategory] = useState<MoviesByCategoryType>({});

  const handleFilterSelect = (category: string) => {
    setSelectedCategory(category);
    console.log(`Selected category: ${category}`);
    // Implement filtering logic here
    
  };


  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await getMoviesByCategory();
        setMoviesByCategory(data);
      } catch (err: any) {
        console.error(err.message);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : user ? (
        <>
          <header className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-3">
              <Link href="#" className="flex items-center" prefetch={false}>
                <ListIcon className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <FilterDropdown
                value={selectedCategory}
                onSelect={handleFilterSelect}
                categories={Object.keys(moviesByCategory)}
              />
            </div>

            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <ProfileDropdown />
            </div>
          </header>
          <main className="flex-1 overflow-y-auto">
            <div className="px-4 py-10 relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Object.keys(moviesByCategory).map((category: string) => (
                    <CategoryList
                      key={category}
                      title={category}
                      movies={moviesByCategory[category]}
                    />
                ))}
              </div>
              <div className="fixed bottom-4 right-4">
                <Button>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Movie
                </Button>
              </div>
              <div className="fixed bottom-4 left-4">
                <Button>
                  <Dice5Icon className="h-4 w-4 mr-2" />
                  Random Movie
                </Button>
              </div>
            </div>
          </main>
        </>
      ) : null}
    </div>
  );
}
