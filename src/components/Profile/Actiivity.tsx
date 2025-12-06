import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import SectionCard from "./SectionCard"
import { getBorrowedBooksByUser, type Book } from "@/services/services"

type ActivityItem = {
  id: string
  description: string
  time: string
}

const formatDate = (iso?: string | null): string => {
  if (!iso) return "Unknown date"
  const date = new Date(iso)
  return isNaN(date.getTime()) ? iso : date.toLocaleDateString()
}

const GeneralInfo: React.FC = () => {
  const { id: routeUserId } = useParams<{ id: string }>() // /users/:id -> that id, /profile -> undefined

  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 1) If admin is on /users/:id → use that id
    // 2) Else fallback to logged-in user id from localStorage (/profile)
    const stored = localStorage.getItem("userId")
    const targetUserId = routeUserId ?? stored

    if (!targetUserId) {
      setError("No user selected. Please log in again.")
      setLoading(false)
      return
    }

    async function loadActivity(userId: string) {
      setLoading(true)
      setError(null)

      try {
        const currentBooks: Book[] = await getBorrowedBooksByUser(userId)

        const currentItems: ActivityItem[] = currentBooks.map((book) => ({
          id: `current-${book.id}`,
          description: `Borrowed "${book.title}" (currently borrowed)`,
          time: formatDate(book.returnDate),
        }))

        const sorted = [...currentItems].sort(
          (a, b) =>
            new Date(b.time).getTime() - new Date(a.time).getTime()
        )

        setActivities(sorted)
      } catch (err) {
        console.error("Error loading activity:", err)
        setError("Failed to load activity. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadActivity(targetUserId)
  }, [routeUserId])

  return (
    <div className="space-y-6">
      <SectionCard title="Activity">
        {loading && (
          <p className="text-sm text-muted-foreground">Loading activity…</p>
        )}

        {!loading && error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {!loading && !error && activities.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No recent activity yet.
          </p>
        )}

        {!loading && !error && activities.length > 0 && (
          <ul className="space-y-4">
            {activities.map((item) => (
              <li key={item.id} className="flex items-start space-x-3">
                <svg
                  className="h-5 w-5 text-yellow-600 mt-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <circle cx="10" cy="10" r="8" />
                </svg>

                <div className="text-sm">
                  <p className="font-semibold text-foreground">
                    {item.description}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {item.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </div>
  )
}

export default GeneralInfo
