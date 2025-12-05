import React, { useEffect, useState } from "react"
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
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("userId")

    if (!stored) {
      setError("No user selected. Please log in again.")
      setLoading(false)
      return
    }

    const userId: string = stored

    async function loadActivity(id: string) {
      setLoading(true)
      setError(null)

      try {
        // 🔥 Fully typed Book[]
        const currentBooks: Book[] = await getBorrowedBooksByUser(id)

        const currentItems: ActivityItem[] = currentBooks.map((book) => ({
          id: `current-${book.id}`,
          description: `Borrowed "${book.title}" (currently borrowed)`,
          // ❗ You only have returnDate, so we use it
          time: formatDate(book.returnDate),
        }))

        // Sort newest → oldest
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

    loadActivity(userId)
  }, [])

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
