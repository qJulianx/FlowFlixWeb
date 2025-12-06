"use client";

import { useEffect, useState } from "react";
import { Loader2, Download, AlertCircle } from "lucide-react";
import Link from "next/link";

const GITHUB_REPO_OWNER = "qJulianx";
const GITHUB_REPO_NAME = "FlowFlixWeb";
const FALLBACK_MSI_URL = "https://github.com/qJulianx/FlowFlixWeb/releases";

export default function WindowsDownloadPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const startDownloadProcess = async () => {
      try {
        // 1. Fetch Latest Release
        let releaseData;
        try {
          const res = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/releases/latest`
          );
          if (!res.ok) throw new Error(`Status: ${res.status}`);
          releaseData = await res.json();
        } catch (e) {
          // Fallback: Fetch all releases if latest is 404 (e.g., only pre-releases exist)
          console.warn("Latest release not found, fetching all releases...");
          const resAll = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/releases`
          );
          if (!resAll.ok) throw new Error("Failed to fetch releases");
          const allReleases = await resAll.json();
          
          if (!Array.isArray(allReleases) || allReleases.length === 0) {
            throw new Error("No releases found");
          }
          // Try to find stable, else take first
          releaseData = allReleases.find((r: any) => !r.prerelease && !r.draft) || allReleases[0];
        }

        // 2. Find MSI asset
        if (!releaseData?.assets) throw new Error("Release has no assets");
        
        const msiAsset = releaseData.assets.find((asset: any) => 
          asset.name && asset.name.toLowerCase().endsWith('.msi')
        );

        if (!msiAsset || !msiAsset.browser_download_url) {
          throw new Error("No MSI file found in the latest release");
        }

        // 3. Set URL and Redirect
        const url = msiAsset.browser_download_url;
        setDownloadUrl(url);
        setStatus("success");
        
        // Slight delay for UX before redirecting
        setTimeout(() => {
           window.location.href = url;
        }, 1500);

      } catch (err) {
        console.error("Download logic failed:", err);
        setStatus("error");
        setDownloadUrl(FALLBACK_MSI_URL);
        setErrorMsg(err instanceof Error ? err.message : "Unknown error");
        // Redirect to fallback after a moment if error occurs (optional, but safe)
        setTimeout(() => {
            window.location.href = FALLBACK_MSI_URL;
        }, 3000);
      }
    };

    startDownloadProcess();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 blur-[100px] rounded-full -z-10" />

      <div className="bg-zinc-900/50 border border-white/10 p-8 rounded-3xl max-w-md w-full shadow-2xl backdrop-blur-md">
        
        {status === "loading" && (
          <div className="flex flex-col items-center animate-in fade-in duration-500">
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full animate-pulse" />
                <Loader2 size={48} className="text-blue-500 animate-spin relative z-10" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Szukam najnowszej wersji...</h1>
            <p className="text-zinc-400 text-sm">
              Proszę czekać, łączymy się z serwerem GitHub.
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center animate-in zoom-in duration-300">
            <div className="p-4 bg-green-500/10 rounded-full text-green-400 mb-6 border border-green-500/20">
                <Download size={32} />
            </div>
            <h1 className="text-2xl font-bold mb-2">Pobieranie rozpoczęte!</h1>
            <p className="text-zinc-400 text-sm mb-6">
              Jeśli pobieranie nie ruszyło automatycznie, kliknij przycisk poniżej.
            </p>
            <a 
              href={downloadUrl!}
              className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
            >
              Pobierz ręcznie
            </a>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center animate-in zoom-in duration-300">
            <div className="p-4 bg-red-500/10 rounded-full text-red-400 mb-6 border border-red-500/20">
                <AlertCircle size={32} />
            </div>
            <h1 className="text-xl font-bold mb-2">Nie udało się pobrać pliku</h1>
            <p className="text-zinc-400 text-xs mb-6">
              {errorMsg || "Wystąpił nieoczekiwany błąd."}
            </p>
             <a 
              href={FALLBACK_MSI_URL}
              className="w-full py-3 bg-zinc-800 text-white font-medium rounded-xl hover:bg-zinc-700 transition-colors border border-white/10"
            >
              Przejdź do GitHub Releases
            </a>
          </div>
        )}
      </div>

      <Link href="/" className="mt-12 text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
        ← Wróć na stronę główną
      </Link>
    </div>
  );
}
