"use client";
import { useState } from "react"; // Import useState
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Dice5Icon, ListIcon, PlusIcon } from "@/components/icons";
import { CategoryList } from "@/components/CategoryList"; // Updated import
import { FilterDropdown } from "@/components/FilterDropdown"; // Updated import
import { ProfileDropdown } from "@/components/ProfileDropdown"; // Updated import
import { useAuth } from "@/context/AuthContext"; // Import the Auth context
import { Separator } from "@/components/ui/separator";

export function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Filter"); // State for selected category

  const handleFilterSelect = (category: string) => {
    setSelectedCategory(category);
    console.log(`Selected category: ${category}`);
    // Implement filtering logic here
  };

  interface Movie {
    title: string;
    genre: string;
    year: string;
    imageUrl: string;
    link: string;
  }

  type MoviesByCategory = {
    [key: string]: Movie[];
  };

  const moviesByCategory: MoviesByCategory = {
    Horror: [
      {
        title: "The Exorcist",
        genre: "Horror",
        year: "1973",
        imageUrl: "/placeholder.svg",
        link: "#",
      },
    ],
    "Sci-Fi": [
      {
        title: "Inception",
        genre: "Sci-Fi",
        year: "2010",
        imageUrl: "/placeholder.svg",
        link: "#",
      },
    ],
    Action: [
      {
        title: "The Shawshank Redemption",
        genre: "Drama",
        year: "1994",
        imageUrl: "/placeholder.svg",
        link: "#",
      },
      {
        title: "Inception",
        genre: "Sci-Fi",
        year: "2010",
        imageUrl: "/placeholder.svg",
        link: "#",
      },
    ],
    Comedy: [
      {
        title: "The Dark Knight",
        genre: "Action",
        year: "2008",
        imageUrl: "/placeholder.svg",
        link: "#",
      },
      {
        title: "The Lord of the Rings: The Fellowship of the Ring",
        genre: "Fantasy",
        year: "2001",
        imageUrl: "/placeholder.svg",
        link: "#",
      },
    ],
    Drama: [
      {
        title: "The Shawshank Redemption",
        genre: "Drama",
        year: "1994",
        imageUrl: "/placeholder.svg",
        link: "#",
      },
    ],
  };

  const userName = "John Doe"; // Example user name
  const userEmail = "john@example.com"; // Example user email

  const { user, loading } = useAuth(); // Get user and loading state

  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground">
      {loading ? (
        <div>Loading...</div>
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
            <div className="px-4 pt-6 pb-8 relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.keys(moviesByCategory).map((category: string) => (
                  <>
                    <CategoryList
                      key={category}
                      title={category}
                      movies={moviesByCategory[category]}
                    />
                    <Separator className="w-full mt-4 mb-2" />
                  </>
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
