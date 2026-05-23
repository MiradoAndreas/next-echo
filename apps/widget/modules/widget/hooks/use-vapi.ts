import { useEffect, useState } from "react"
import Vapi from "@vapi-ai/web"

interface TranscriptMessage {
  role: "user" | "assistant"
  text: string
}

export const useVapi = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([])

  useEffect(() => {
    // Only for testing the Vapi API, otherwise customers will provide their own API keys
    const vapiInstance = new Vapi("96b3c50e-e230-47f4-9056-2e41cee59f57")
    setVapi(vapiInstance)

    vapiInstance.on("call-start", () => {
      setIsConnected(true)
      setIsConnecting(false)
      setTranscript([])
    })

    vapiInstance.on("call-end", () => {
      setIsConnected(false)
      setIsConnecting(false)
      setIsSpeaking(false)
    })

    vapiInstance.on("speech-start", () => {
      setIsSpeaking(true)
    })

    vapiInstance.on("speech-end", () => {
      setIsSpeaking(false)
    })

    vapiInstance.on("error", (error) => {
      console.log(error, "VAPI_ERROR")
      setIsConnecting(false)
    })

    vapiInstance.on("message", (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setTranscript((prev) => [
          ...prev,
          {
            role: message.role === "user" ? "user" : "assistant",
            text: message.transcript,
          },
        ])
      }
    })

    return () => {
      vapiInstance?.stop()
    }
  }, [])

  const startCall = () => {
    setIsConnecting(true)
    if (vapi) {
      // Only for testing the Vapi API, otherwise customers will provide their own Assistant IDs
      vapi.start("97f12172-fcb6-494e-b7de-e711cd2ac048")
    }
  }

  const endCall = () => {
    if (vapi) {
      vapi.stop()
    }
  }

  return {
    isSpeaking,
    isConnected,
    isConnecting,
    transcript,
    startCall,
    endCall,
  }
}
