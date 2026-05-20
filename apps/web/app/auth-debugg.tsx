"use client"

import { useAuth } from "@clerk/nextjs"
import { Button } from "@workspace/ui/components/button"

export function DebugAuth() {
  const { getToken } = useAuth()
  async function debug() {
    const token = await getToken({
      template: "convex"
    })

    console.log("TOKEN = ", token)

    if (!token) {
      console.error("NO TOKEN")
      return
    }

    const payload = JSON.parse(atob(token.split(".")[1]))

    console.log("PAYLOAD = ", payload)

  }

  return (
    <div className="flex items-center justify-center min-h-svh">
      <Button onClick={debug}>
        Debug
      </Button>
    </div>
  )
}