"use client"

import { useMutation, useQuery } from "convex/react"
import { api } from "@workspace/backend/_generated/api"
import { Button } from "@workspace/ui/components/button"

import { OrganizationSwitcher, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs"

export default function Page() {
  const users = useQuery(api.users.getMany)

  const addUser = useMutation(
    api.users.add
  )
  return (
    <>



      <div className="flex flex-col items-center justify-center min-h-svh p-6 space-y-3">

        <p>apps/web</p>
        <UserButton />
        <OrganizationSwitcher hidePersonal={true} />
        <Button onClick={() => addUser()}>Add User Mirado</Button>

        <SignOutButton />
      </div>
      <SignInButton />
      <SignOutButton />
    </>
  )
}
