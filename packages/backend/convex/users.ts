import { ConvexError } from "convex/values"
import { mutation, query } from "./_generated/server"
export const getMany = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect()

    return users
  },
})

type ClerkOrgs = {
  id: string
}

export const add = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()

    if (identity === null) {
      throw new Error("Not authenticated")
    }

    const orgId = identity.o as ClerkOrgs

    if (!orgId) {
      console.error("Organization not found")
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Organization not found",
      })
    }

    console.log("Organization ID = ", orgId)

    const userId = await ctx.db.insert("users", {
      name: "Mirado",
    })

    return userId
  },
})
