"use client"

import { useAtomValue } from "jotai"
import { WidgetAuthScreen } from "@/modules/widget/ui/screens/widget-auth-screen"
import { screenAtom } from "@/modules/widget/atoms/widget-atoms"
import { WidgetErrorScreen } from "../screens/widget-error-screen"
import { WidgetLoadingScreen } from "../screens/widget-loading-screen"


interface Props {
  organizationId: string | null
}

export const Widgetview = ({ organizationId }: Props) => {

  const screen = useAtomValue(screenAtom)

  const screenComponent = {
    loading: <WidgetLoadingScreen organizationId={organizationId} />,
    error: <WidgetErrorScreen />,
    selection: <p>TODO: Selection</p>,
    voice: <p>TODO: Voice</p>,
    auth: <WidgetAuthScreen />,
    inbox: <p>TODO: Inbox</p>,
    chat: <p>TODO: Chat</p>,
    contact: <p>TODO: Contact</p>,
  }



  return (
    // TODO: Confirm wether or not min-h-screen and min-w-screen is needed
    <main className="min-h-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      {screenComponent[screen]}
    </main>
  )
}