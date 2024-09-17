/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/8JBKvewem1o
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

import { Button } from "@/components/ui/button"
import { MovieType } from '@/lib/types';

// export function Movie( {movie}: {movie: MovieType}) {
export function Movie() {
  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground">
      <header className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex justify-between mb-8">
            <div className="fixed top-4 left-4">
              <Button>
                <ShareIcon className="ml-2 h-4 w-4" />
                Share
              </Button>
            </div>
            <div className="fixed top-4 right-4">
              <Button>
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Return
              </Button>
            </div>
        </div>
      </header>
      <main className={`flex-1 flex items-center justify-center ${inter.className}`}>
        <div className="max-w-4xl w-full space-y-10">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">Movie Details</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-xl font-bold">Where to Watch</h3>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-card rounded-lg p-4 flex items-center justify-center">
                    <NetworkIcon className="h-8 w-8 text-red-500" />
                  </div>
                  <div className="bg-card rounded-lg p-4 flex items-center justify-center">
                    <HdmiPortIcon className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="bg-card rounded-lg p-4 flex items-center justify-center">
                    <PlusIcon className="h-8 w-8 text-orange-500" />
                  </div>
                  <div className="bg-card rounded-lg p-4 flex items-center justify-center">
                    <PlusIcon className="h-8 w-8 text-blue-700" />
                  </div>
                </div>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-xl font-bold">Movie Summary</h3>
                <p className="mt-4 text-muted-foreground">
                  In a world where superheroes are commonplace, a young man named Peter Parker gains extraordinary
                  abilities after being bitten by a radioactive spider. Struggling to balance his newfound powers with
                  his personal life, Peter must confront a powerful villain and uncover a dark conspiracy that threatens
                  the city he loves.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-muted rounded-lg overflow-hidden">
                <iframe
                  className="w-full aspect-video"
                  src="https://www.youtube.com/embed/JfVOs4VSpmA"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-xl font-bold">Movie Info</h3>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-muted-foreground">Title:</p>
                    <p className="font-bold">Spider-Man: No Way Home</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Release Year:</p>
                    <p className="font-bold">2021</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Director:</p>
                    <p className="font-bold">Jon Watts</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Runtime:</p>
                    <p className="font-bold">148 minutes</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Genre:</p>
                    <p className="font-bold">Action, Adventure, Fantasy</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Rating:</p>
                    <p className="font-bold">PG-13</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function ArrowLeftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}


function HdmiPortIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 9a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1l2 2h12l2-2h1a1 1 0 0 0 1-1Z" />
      <path d="M7.5 12h9" />
    </svg>
  )
}


function NetworkIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      <path d="M12 12V8" />
    </svg>
  )
}


function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function ShareIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  )
}
