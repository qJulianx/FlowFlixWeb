import { redirect } from "next/navigation";

const GITHUB_REPO_OWNER = "FlowFlix";
const GITHUB_REPO_NAME = "FlowFlix_Early_Alpha";
const FALLBACK_APK_URL = "https://github.com/FlowFlix/FlowFlix_Early_Alpha/releases/download/2.0/app-release.apk";

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

    // jeśli nie ma żadnych wydań, zwróć null żeby użyć fallback URL
    return null;
  }

  const errorText = await res.text();
  throw new Error(`GitHub API error: ${res.status} - ${errorText}`);
}

export default async function DownloadPage() {
  try {
    const release = await fetchLatestRelease();
    
    if (!release) {
      // jeśli nie znaleziono żadnego wydania, przekieruj na fallback URL
      redirect(FALLBACK_APK_URL);
      return;
    }

    // znajdź plik APK w assets
    const apkAsset = release.assets?.find((asset: any) => 
      asset.name.toLowerCase().endsWith('.apk')
    );

    if (apkAsset?.browser_download_url) {
      redirect(apkAsset.browser_download_url);
    } else {
      // jeśli nie znaleziono APK w wydaniu, użyj fallback URL
      redirect(FALLBACK_APK_URL);
    }
  } catch (error) {
    console.error('Error fetching release:', error);
    // w przypadku błędu, przekieruj na fallback URL
    redirect(FALLBACK_APK_URL);
  }
}
