"use client"


import { WidgetAuthScreen } from "../screens/widget-auth-screen"


interface Props {
  organizationId: string | null
}

export const Widgetview = ({ organizationId }: Props) => {

  return (
    // TODO: Confirm wether or not min-h-screen and min-w-screen is needed
    <main className="min-h-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      <WidgetAuthScreen />
      {/* <WidgetFooter /> */}
    </main>
  )
}