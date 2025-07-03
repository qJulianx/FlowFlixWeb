import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function TVPage() {
  const res = await fetch(
    "https://api.github.com/repos/FlowFlix/FlowFlix_Early_Alpha/releases/latest",
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: process.env.GITHUB_TOKEN
          ? `Bearer ${process.env.GITHUB_TOKEN}`
          : undefined,
      },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error("GitHub API error:", res.status, errorText);
    throw new Error(`GitHub API returned ${res.status}: ${errorText}`);
  }

  const data = await res.json();
  const versionTag = data.tag_name;
  const apkUrl = `https://github.com/FlowFlix/FlowFlix_Early_Alpha/releases/download/${versionTag}/app-release.apk`;

  redirect(apkUrl);
}
