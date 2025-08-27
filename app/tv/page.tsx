const GITHUB_REPO_OWNER = "FlowFlix";
const GITHUB_REPO_NAME = "FlowFlix_Early_Alpha";

const FALLBACK_URL =
  "https://github.com/FlowFlix/FlowFlix_Early_Alpha/releases/download/2.0/app-release.apk";

export async function fetchLatestRelease() {
  const apiUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/releases/latest`;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(apiUrl, { headers, next: { revalidate: 600 } });

    if (res.ok) {
      return await res.json();
    }

    if (res.status === 404) {
      const allRes = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/releases`,
        { headers, next: { revalidate: 600 } }
      );

      if (allRes.ok) {
        const allReleases = await allRes.json();
        const stable = allReleases.find(
          (r: any) => !r.prerelease && !r.draft
        );
        return stable ?? allReleases[0] ?? null;
      }
    }
  } catch (err) {
    console.error("GitHub fetch error:", err);
  }

  // fallback
  return { assets: [{ browser_download_url: FALLBACK_URL }] };
}
