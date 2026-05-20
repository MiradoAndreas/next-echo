"use client"

import { useMutation, useQuery } from "convex/react"
import { api } from "@workspace/backend/_generated/api"
import { Button } from "@workspace/ui/components/button"
import { Authenticated, Unauthenticated } from "convex/react"
import { SignInButton, SignOutButton, SignUpButton, UserButton } from "@clerk/nextjs"
export default function Page() {
  const users = useQuery(api.users.getMany)
  console.log("USERS = ", users)
  const addUser = useMutation(
    api.users.add
  )
  return (
    <>

      <Authenticated>

        <div className="flex flex-col items-center justify-center min-h-svh p-6">

          <p>apps/web</p>
          <UserButton />
          <Button onClick={() => addUser()}>Add User Mirado</Button>
          <div className="max-w-sm w-full mx-auto">
            {JSON.stringify(users, null, 2)}
          </div>
          <SignOutButton />
        </div>
      </Authenticated>

      <Unauthenticated>
        <p>Must be signed in!</p>
        <SignInButton />
        <SignUpButton />
        <Button onClick={() => addUser()}>Add User Mirado</Button>
      </Unauthenticated>
    </>
  )
}
