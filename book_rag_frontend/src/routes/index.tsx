import { createFileRoute } from '@tanstack/react-router'

import { useQuery, useQueryClient, QueryClientProvider, QueryClient, Query } from "@tanstack/react-query";
export const Route = createFileRoute('/')({ component: App })

function App() {
  const queryClient = useQueryClient();

  return (
    <main>
      <QueryClientProvider client={queryClient}>


      </ QueryClientProvider >




    </main>

  )
}
