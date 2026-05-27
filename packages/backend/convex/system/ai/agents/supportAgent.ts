import { openai } from "@ai-sdk/openai"
import { Agent } from "@convex-dev/agent"
import { components } from "../../../_generated/api"

export const supportAgent = new Agent(components.agent, {
  name: "supportAgent",
  languageModel: openai.chat("gpt-5-nano"),
  instructions: "You are a customer support agent",
})
