import { redirect } from "next/navigation";

export default async function TVPage() {
  // Pobierz najnowszy release z GitHub API
  const res = await fetch(
    "https://api.github.com/repos/FlowFlix/FlowFlix_Early_Alpha/releases/latest",
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Nie udało się pobrać najnowszego release z GitHub.");
  }

  const data = await res.json();

  const versionTag = data.tag_name; // np. "1.9"
  const apkUrl = `https://github.com/FlowFlix/FlowFlix_Early_Alpha/releases/download/${versionTag}/app-release.apk`;

  // Przekierowanie do najnowszego APK
  redirect(apkUrl);
}