"use client"

import { useAtomValue } from "jotai"
import { WidgetAuthScreen } from "../screens/widget-auth-screen"
import { screenAtom } from "../../atoms/widget-atoms"


interface Props {
  organizationId: string | null
}

export const Widgetview = ({ organizationId }: Props) => {

  const screen = useAtomValue(screenAtom)

  const screenComponent = {
    error: <p>TODO: Error</p>,
    loading: <p>TODO: Loading</p>,
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