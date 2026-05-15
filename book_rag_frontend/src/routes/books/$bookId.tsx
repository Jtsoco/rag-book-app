import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/books/$bookId")(
{ component: Book })

function Book() {
  const { bookId } = Route.useParams()

  return (
    <div>
      <h1>Book ID: {bookId}</h1>
      {/* You can add more details about the book here */}
    </div>
  )

}
