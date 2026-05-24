"use client"

import { WidgetFooter } from "../components/widget-footer"
import { WidgetHeader } from "../components/widget-header"

interface Props {
  organizationId: string | null
}

export const Widgetview = ({ organizationId }: Props) => {

  return (
    // TODO: Confirm wether or not min-h-screen and min-w-screen is needed
    <main className="min-h-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">

          <p className="text-3xl">
            Hi there!👋
          </p>
          <p className="text-lg">How can we help you to</p>

        </div>
      </WidgetHeader>
      <div className="flex flex-1">
        Widget View with organizationId: {organizationId}
      </div>
      <WidgetFooter />
    </main>
  )
}