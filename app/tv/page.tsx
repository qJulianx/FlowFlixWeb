import { redirect } from "next/navigation";

const GITHUB_REPO_OWNER = "FlowFlix";
const GITHUB_REPO_NAME = "FlowFlix_Early_Alpha";

// fallback URL, jeśli nic nie znajdzie
const FALLBACK_URL =
  "https://github.com/FlowFlix/FlowFlix_Early_Alpha/releases/download/2.0/app-release.apk";

export const dynamic = "force-dynamic";

async function fetchLatestRelease() {
  const apiUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/releases/latest`;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(apiUrl, {
    headers,
    next: { revalidate: 600 },
  });

  if (res.ok) {
    return await res.json();
  } else if (res.status === 404) {
    // fallback na pobranie wszystkich wydań
    const allReleasesUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/releases`;
    const allReleasesRes = await fetch(allReleasesUrl, {
      headers,
      next: { revalidate: 600 },
    });

    if (!allReleasesRes.ok) {
      console.error(
        `GitHub API error when fetching all releases: ${allReleasesRes.status}`
      );
      return { fallback: true, assets: [{ browser_download_url: FALLBACK_URL }] };
    }

    const allReleases = await allReleasesRes.json();

    // znajdź stabilne wydanie (nie draft, nie prerelease)
    const stableRelease = allReleases.find(
      (r: any) => !r.prerelease && !r.draft
    );

    if (stableRelease) {
      return stableRelease;
    }

    // jeśli nie ma stabilnych, zwróć pierwsze z listy
    if (allReleases.length > 0) {
      return allReleases[0];
    }
  }

  // jeśli wszystko zawiedzie – fallback
  return { fallback: true, assets: [{ browser_download_url: FALLBACK_URL }] };
}
