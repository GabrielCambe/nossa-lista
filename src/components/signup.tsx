"use client";

import { Inter } from 'next/font/google';
import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChromeIcon } from "@/components/icons";
import { upsertUser } from '@/lib/firestore';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        const userEmail = user.email || "";
        const userName = user.displayName || "Anonymous";
        const userPhotoUrl = user.photoURL || "";

        await upsertUser(userEmail, userName, userPhotoUrl);
      }

      router.push("/"); // Redirect to home after signup
    } catch (err: any) {
      // Customize error messages based on error codes
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("This email is already in use.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/weak-password":
          setError("Password is too weak.");
          break;
        default:
          setError("Failed to sign up. Please try again.");
      }
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      if (user) {
        const userEmail = user.email || "";
        const userName = user.displayName || "Anonymous";
        const userPhotoUrl = user.photoURL || "";

        await upsertUser(userEmail, userName, userPhotoUrl);
      }

      router.push("/"); // Redirect to home after signup
    } catch (err) {
      setError("Failed to sign up with Google");
    }
  };

  return (
    <div className={`flex flex-col h-screen w-full bg-background text-foreground p-6 ${inter.className}`}>
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
              Create your account
            </h2>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </div>
          <form onSubmit={handleSignup} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="space-y-2">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-semibold"
                >
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2 pt-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  href="/login"
                  className="font-medium text-primary hover:text-primary/90"
                  prefetch={false}
                >
                  Already have an account? Login
                </Link>
              </div>
            </div>
            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Sign up
              </Button>
            </div>
          </form>
          <div className="flex items-center justify-center mt-4">
            <Separator className="w-full mx-1" />
          </div>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleGoogleSignup}
            >
              <ChromeIcon className="h-5 w-5" />
              Sign up with Google
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}