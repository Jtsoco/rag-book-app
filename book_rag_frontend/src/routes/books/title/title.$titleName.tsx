import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/books/title/title/$titleName')({
  component: RouteComponent,
})

function RouteComponent() {
  const { titleName } = Route.useParams()
  return (<div>Hello "/books/title/title/$titleName"!</div>)
}
