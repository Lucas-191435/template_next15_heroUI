"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, Suspense } from 'react'

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
    <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow ">
      <section className="h-full flex flex-col items-center justify-center gap-4 py-8  md:py-10 border-1 border-red-600">
        {children}
      </section>
    </main>
    </QueryClientProvider>
  );
}
