import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"

import { WidgetHeader } from "../components/widget-header"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { useMutation } from "convex/react"
import { api } from "@workspace/backend/_generated/api"
import { Doc } from "@workspace/backend/_generated/dataModel"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email adresss")
})
// ! Temporary test organizationId, before we add state managment
const organizationId = "123"

export const WidgetAuthScreen = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: ""
    }
  })


  // Create contact session
  const createContactSession = useMutation(
    api.public.contactSessions.create
  )
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!organizationId) {
      return;
    }
    const metadata: Doc<"contactSession">["metadata"] = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages?.join(","),
      platform: navigator.platform,
      vendor: navigator.vendor,
      screenResolution: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      cookieEnabled: navigator.cookieEnabled,
      referrer: document.referrer || "direct",
      currentUrl: window.location.href,
    }

    const contactSessionId = await createContactSession({
      ...values,
      organizationId,
      metadata
    })

    console.log({ contactSessionId })
  }


  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">

          <p className="text-3xl">
            Hi there!👋
          </p>
          <p className="text-lg">
            Let&apos;s get you started
          </p>
        </div>
      </WidgetHeader>
      <form id="form-widget-auth" className="flex-1" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="flex flex-col gap-y-4 p-4">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-widget-auth-name">
                  Name
                </FieldLabel>
                <Input {...field} placeholder="e.g John Doe" aria-invalid={fieldState.invalid} id="form-widget-auth-name" className="h-10 bg-background" type="text" autoComplete="off" />
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-widget-auth-email">
                  Email
                </FieldLabel>
                <Input {...field} placeholder="johndoe@gmail.com" aria-invalid={fieldState.invalid} id="form-widget-auth-email" autoComplete="off" />
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button disabled={form.formState.isSubmitting} size="lg" type="submit" form="form-widget-auth" className="w-full">
            Continue
          </Button>
        </FieldGroup>

      </form>
    </>
  )
}