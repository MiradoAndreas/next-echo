"use client"
import { useAtomValue, useSetAtom } from "jotai"


import { WidgetHeader } from "../components/widget-header"
import { Button } from "@workspace/ui/components/button"
import { ArrowLeftIcon, MenuIcon } from "lucide-react"
import { contactSessionIdAtomFamily, conversationIdAtom, organizationIdAtom, screenAtom } from "../../atoms/widget-atoms"
import { useQuery } from "convex/react"
import { api } from "@workspace/backend/_generated/api"

export const WidgetChatScreen = () => {
  const setScreen = useSetAtom(screenAtom)
  const setConversationId = useSetAtom(conversationIdAtom)

  const conversationId = useAtomValue(conversationIdAtom)
  const organizationId = useAtomValue(organizationIdAtom)
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  )

  // if it "skip" it not run
  const conversation = useQuery(
    api.public.conversation.getOne,
    conversationId && contactSessionId ? {
      conversationId,
      contactSessionId
    } : "skip"
  )

  const onBack = () => {
    setConversationId(null)
    setScreen("selection")
  }


  return (
    <>
      <WidgetHeader className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Button size="icon" variant="transparent" onClick={onBack}>
            <ArrowLeftIcon />
          </Button>
          <p>
            Chat
          </p>
        </div>
      </WidgetHeader>
      <Button size="icon" variant="transparent">
        <MenuIcon />
      </Button>
      <div className="flex flex-1 flex-col  gap-y-4 p-4">
        {JSON.stringify(conversation, null, 2)}
      </div>
    </>
  )
}