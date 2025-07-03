import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"; // wymusza SSR przy każdym żądaniu

export default async function TVPage() {
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

  redirect(apkUrl);
}