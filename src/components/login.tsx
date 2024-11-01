"use client";

/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/gUYydBPKjcr
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { Inter } from 'next/font/google'
import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  AuthError,
} from "firebase/auth"; // Import AuthError
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChromeIcon } from "@/components/icons";
import { upsertUser } from '@/lib/firestore';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // Redirect to home after login
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError("User does not exist. Please sign up.");
      } else if (err.code === 'auth/wrong-password') {
        setError("Incorrect password. Please try again.");
      } else {
        setError("Failed to log in. Please try again.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider(); // Create a Google provider
    try {
      await signInWithPopup(auth, provider); // Sign in with popup
      router.push("/"); // Redirect to home after login
    } catch (err: any) {
      setError("Failed to log in with Google");
    }
  };

  return (
    <div className={`flex flex-col h-screen w-full bg-background text-foreground p-6 ${inter.className}`}>
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
              Sign in to your account
            </h2>
          </div>
          
          {/* Alert for user not found */}
          {error === "User does not exist. Please sign up." && (
            <div className="alert alert-warning shadow-lg">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
              <Link href="/signup" className="btn btn-sm btn-outline">
                Sign Up
              </Link>
            </div>
          )}

          {/* General error alert */}
          {error && error !== "User does not exist. Please sign up." && (
            <div className="alert alert-error shadow-lg">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
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
                  autoComplete="current-password"
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
                  href="#"
                  className="font-medium text-primary hover:text-primary/90"
                  prefetch={false}
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Sign in
              </Button>
            </div>
          </form>
          <div className="flex items-center justify-center">
            <Separator className="w-full mx-1" />
          </div>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleGoogleLogin}
            >
              <ChromeIcon className="h-5 w-5" />
              Google
            </Button>
          </div>
          <div className="text-sm text-center">
            <Link
              href="/signup"
              className="font-medium text-primary hover:text-primary/90"
              prefetch={false}
            >
              {"Don't have an account? Sign up"}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}