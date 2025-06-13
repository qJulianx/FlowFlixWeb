import FlowflixDownloadPageClient from "./FlowflixDownloadPageClient"
import type { Metadata } from "next"

// Ustawienie tytułu strony
export const metadata: Metadata = {
  title: "FlowFlix",
}

export default function FlowflixDownloadPage() {
  return <FlowflixDownloadPageClient />
}
