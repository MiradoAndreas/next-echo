"use client"

import { useThreadMessages, toUIMessages, useUIMessages } from "@convex-dev/agent/react"
import { useAtomValue, useSetAtom } from "jotai"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { WidgetHeader } from "../components/widget-header"
import { Button } from "@workspace/ui/components/button"
import { ArrowLeftIcon, MenuIcon } from "lucide-react"
import { contactSessionIdAtomFamily, conversationIdAtom, organizationIdAtom, screenAtom } from "../../atoms/widget-atoms"
import { useAction, useQuery } from "convex/react"
import { api } from "@workspace/backend/_generated/api"
import { AIConversation, AIConversationContent, AIConversationScrollButton } from "@workspace/ui/components/ai/conversation"

import { AIInput, AIInputSubmit, AIInputTextarea, AIInputToolbar, AIInputTools } from "@workspace/ui/components/ai/input"

import { AIMessage, AIMessageContent } from "@workspace/ui/components/ai/message"
import { AIResponse } from "@workspace/ui/components/ai/response"
import { AISuggestion, AISuggestions } from "@workspace/ui/components/ai/suggestion"
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infiinite-scroll"
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger"
import { Field, FieldError, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { DicebearAvatar } from "@workspace/ui/components/dicebar-avatar"

const formSchema = z.object({
  message: z.string().min(1, "Message is required")
})

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

  const messages = useThreadMessages(
    api.public.messages.getMany,
    conversation?.threadId && contactSessionId ? {
      threadId: conversation.threadId,
      contactSessionId
    } : "skip",
    { initialNumItems: 10 }
  )

  const {
    topElementRef,
    handleLoadMore,
    canLoadMore,
    isLoadingMore,

  } = useInfiniteScroll({
    status: messages.status,
    loadMore: messages.loadMore,
    loadSize: 10,
    observerEnabled: true
  })


  // Formulaire
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: ""
    }
  })

  const createMessage = useAction(api.public.messages.create)
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!conversation || !contactSessionId) {
      return
    }
    form.reset()

    await createMessage({
      threadId: conversation.threadId,
      prompt: values.message,
      contactSessionId,
    })
  }

  const onBack = () => {
    setConversationId(null)
    setScreen("selection")
  }


  return (
    <>
      <WidgetHeader className="flex items-center justify-between">
        <div className="flex items-center gap-x-2 gap-y-2 py-6">

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
      <AIConversation>
        <AIConversationContent>
          <InfiniteScrollTrigger canLoadMore={canLoadMore} isLoadingMore={isLoadingMore} onLoadMore={handleLoadMore} ref={topElementRef} />
          {toUIMessages(messages.results ?? [])?.map((message) => {
            return (
              <AIMessage
                from={message.role === "user" ? "user" : "assistant"}
                key={message.id}
              >
                <AIMessageContent>
                  <AIResponse>{message.text}</AIResponse>
                </AIMessageContent>
                {message.role === "assistant" && (
                  <DicebearAvatar
                    imageUrl="/logo.svg"
                    seed="assistant"
                    size={32}
                  />
                )}
                {/** TODO: Add Avatar */}
              </AIMessage>
            )
          })}
        </AIConversationContent>
      </AIConversation>
      {/** FORM */}

      <AIInput className="rounded-none border-x-0 border-b-0" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller control={form.control} name="message" render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>

              <AIInputTextarea onChange={field.onChange} aria-invalid={fieldState.invalid} autoComplete="off" disabled={conversation?.status === "resolved"} onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  form.handleSubmit(onSubmit)
                }
              }}
                placeholder={conversation?.status === "resolved" ? "Conversation resolved" : "Ask me anything..."} value={field.value} />

            </Field>
          )} />
        </FieldGroup>
        <AIInputToolbar>
          <AIInputTools />
          <AIInputSubmit disabled={conversation?.status === "resolved" || !form.formState.isValid} status="ready" type="submit" />
        </AIInputToolbar>
      </AIInput>

      {/** TODO: Add Suggestions */}
      {/* {toUIMessages(messages.results ?? [])?.length === 1 && (
        <AISuggestions className="flex w-full flex-col items-end p-2">
          {suggestions.map((suggestion) => {
            if (!suggestion) {
              return null;
            }

            return (
              <AISuggestion
                key={suggestion}
                onClick={() => {
                  form.setValue("message", suggestion, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  form.handleSubmit(onSubmit)();
                }}
                suggestion={suggestion}
              />
            )
          })}
        </AISuggestions>
      )} */}
    </>
  )
}