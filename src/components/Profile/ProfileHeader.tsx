import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUserById } from "@/services/services"   // ✅ use services layer
import type { User } from "@/services/services"

const ProfileHeader: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUser() {
      setLoading(true)
      setError(null)

      const loggedInUserId = localStorage.getItem("userId")
      const userIdToLoad = id ?? loggedInUserId

      if (!userIdToLoad) {
        setError("No user ID found. Please log in again.")
        setLoading(false)
        return
      }

      try {
        // ✅ NEW: use getUserById instead of api.get
        const userData = await getUserById(userIdToLoad)
        setUser(userData)
      } catch (err) {
        console.error("Failed to load user profile:", err)
        setError("Failed to load profile. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  if (loading) {
    return (
      <div className="bg-background p-6 shadow-xl rounded-t-xl sm:p-8 border border-border">
        <h1 className="text-2xl font-semibold text-center text-muted-foreground">
          Loading profile...
        </h1>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="bg-background p-6 shadow-xl rounded-t-xl sm:p-8 border border-border">
        <h1 className="text-2xl font-semibold text-center text-red-500">
          {error ?? "Could not load profile."}
        </h1>
      </div>
    )
  }

  return (
    <div className="bg-background p-6 shadow-xl rounded-t-xl sm:p-8 border border-border">
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <img
          className="h-24 w-24 rounded-full object-cover border-4 border-yellow-500 shadow-md"
          src="/images/user-svgrepo-com.png"
          alt="User avatar"
        />

        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-foreground">
            {user.name}
          </h1>
          <p className="text-lg text-muted-foreground">{user.email}</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
