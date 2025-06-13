import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
// ... inne importy
import { getLatestReleaseChangelog, type ChangelogInfo } from "./actions"

const GITHUB_RELEASES_API = "https://api.github.com/repos/FlowFlix/FlowFlix_Early_Alpha/releases/latest"

export default function FlowflixDownloadPageClient() {
  const [apkUrl, setApkUrl] = useState<string | null>(null)
  const [isLoadingAPK, setIsLoadingAPK] = useState(false)
  // ... istniejące zmienne stanu

  useEffect(() => {
    // użyj getLatestReleaseChangelog...
    // oraz pobierz adres APK
    fetch(GITHUB_RELEASES_API)
      .then(res => res.json())
      .then(data => {
        const apk = data.assets.find((a: any) => a.name.endsWith(".apk"))
        if (apk) setApkUrl(apk.browser_download_url)
      })
      // błędy możesz obsłużyć dowolnie
  }, [])

  const downloadLatestApk = () => {
    if (!apkUrl) return
    setIsLoadingAPK(true)
    // przekierowanie do pliku .apk
    window.location.href = apkUrl
  }

  return (
    // ... Twoja struktura JSX
    <Button
      disabled={!apkUrl || isLoadingAPK}
      onClick={downloadLatestApk}
      className="w-full max-w-xs ..."
      size="lg"
    >
      {isLoadingAPK ? (
        <Loader2 className="animate-spin w-5 h-5 mr-2" />
      ) : (
        <Download className="mr-2 h-5 w-5" />
      )}
      {apkUrl ? "Pobierz APK" : "Sprawdzanie wersji..."}
    </Button>
    // ...
  )
}
