import { redirect } from "next/navigation";

const GITHUB_REPO_OWNER = "FlowFlix";
const GITHUB_REPO_NAME = "FlowFlix_Early_Alpha";

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
    next: { revalidate: 900 }, // cache 15 min
  });

  if (res.ok) {
    return await res.json();
  } else if (res.status === 404) {
    // fallback na pobranie wszystkich wydań
    const allReleasesUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/releases`;
    const allReleasesRes = await fetch(allReleasesUrl, {
      headers,
      next: { revalidate: 900 },
    });

    if (!allReleasesRes.ok) {
      const errorText = await allReleasesRes.text();
      throw new Error(`GitHub API error when fetching all releases: ${allReleasesRes.status} - ${errorText}`);
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

    throw new Error("No releases found in the repository");
  } else {
    const errorText = await res.text();
    throw new Error(`GitHub API error: ${res.status} - ${errorText}`);
  }
}

export default async function TVPage() {
  try {
    const releaseData = await fetchLatestRelease();

    const versionTag = releaseData.tag_name;
    const apkUrl = `https://github.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/releases/download/${versionTag}/app-release.apk`;

    redirect(apkUrl);
  } catch (error) {
    console.error("Failed to fetch release info or redirect:", error);
    throw error;
  }
}
