import { mutation, query } from "./_generated/server"
export const getMany = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect()

    return users
  },
})

export const add = mutation({
  args: {},
  handler: async (ctx) => {
    const person = { firstname: "Mirado" }
    console.log("PERSONE : ", person)
    person.firstname = "Mirado Andréas"
    const identity = await ctx.auth.getUserIdentity()
    console.log("This function is called")
    if (identity === null) {
      throw new Error("Not authenticated")
    }
    console.log("The identity is there : ", identity)

    const orgId = identity?.orgId as string
    console.log("Organization ID :", orgId)
    if (!orgId) {
      console.log("Error here")
      throw new Error("Missing organization")
    }

    const userId = await ctx.db.insert("users", {
      name: "Mirado",
    })

    console.log("Tu as réussi à débugger cette fonction")

    return userId
  },
})
