"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; // Import useEffect and useState
import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged

export function ProfileDropdown() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName); // Extract userName
        setUserEmail(user.email); // Extract userEmail
      } else {
        setUserName(null);
        setUserEmail(null);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8 border">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>
              {userName ? userName.charAt(0) : "?"}
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center gap-2 p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>
              {userName ? userName.charAt(0) : "?"}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5 leading-none">
            <div className="font-semibold">{userName || "Guest"}</div>
            <div className="text-sm text-muted-foreground">
              {userEmail || "No email"}
            </div>
          </div>
        </div>
        <DropdownMenuSeparator className="my-2 w-full md:w-3/4" />
        <DropdownMenuItem>
          <a href="#" className="flex items-center gap-2">
            <div className="h-4 w-4" />
            <span>Profile</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href="#" className="flex items-center gap-2">
            <div className="h-4 w-4" />
            <span>Settings</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-2 w-full md:w-3/4" />
        <DropdownMenuItem>
          <a
            href="#"
            className="flex items-center gap-2"
            onClick={handleSignOut}
          >
            <span>Sign out</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
