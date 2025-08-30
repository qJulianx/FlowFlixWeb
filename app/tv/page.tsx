import { redirect } from "next/navigation";

const GITHUB_REPO_OWNER = "FlowFlix";
const GITHUB_REPO_NAME = "FlowFlix_Early_Alpha";
const FALLBACK_APK_URL = "https://github.com/FlowFlix/FlowFlix_Early_Alpha/releases/download/2.1/app-release.apk";

export const dynamic = "force-dynamic";

async function fetchLatestRelease() {
  try {
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
      try {
        const allReleasesUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/releases`;
        const allReleasesRes = await fetch(allReleasesUrl, {
          headers,
          next: { revalidate: 600 },
        });

        if (!allReleasesRes.ok) {
          console.error(`GitHub API error when fetching all releases: ${allReleasesRes.status}`);
          return null;
        }

        const allReleases = await allReleasesRes.json();
        
        if (!Array.isArray(allReleases)) {
          console.error('GitHub API returned invalid releases data');
          return null;
        }
        
        // znajdź stabilne wydanie (nie draft, nie prerelease)
        const stableRelease = allReleases.find(
          (r: any) => r && !r.prerelease && !r.draft
        );

        if (stableRelease) {
          return stableRelease;
        }

        // jeśli nie ma stabilnych, zwróć pierwsze z listy
        if (allReleases.length > 0) {
          return allReleases[0];
        }

        return null;
      } catch (fallbackError) {
        console.error('Error fetching all releases:', fallbackError);
        return null;
      }
    }

    console.error(`GitHub API error: ${res.status}`);
    return null;
  } catch (error) {
    console.error('Error in fetchLatestRelease:', error);
    return null;
  }
}

export default async function DownloadPage() {
  try {
    const release = await fetchLatestRelease();
    
    if (!release) {
      // jeśli nie znaleziono żadnego wydania, przekieruj na fallback URL
      redirect(FALLBACK_APK_URL);
      return;
    }

    // sprawdź czy release ma assets
    if (!release.assets || !Array.isArray(release.assets)) {
      console.error('Release has no assets array');
      redirect(FALLBACK_APK_URL);
      return;
    }

    // znajdź plik APK w assets
    const apkAsset = release.assets.find((asset: any) => 
      asset && asset.name && asset.name.toLowerCase().endsWith('.apk')
    );

    if (apkAsset?.browser_download_url) {
      redirect(apkAsset.browser_download_url);
      return;
    } else {
      // jeśli nie znaleziono APK w wydaniu, użyj fallback URL
      console.error('No APK file found in release assets');
      redirect(FALLBACK_APK_URL);
      return;
    }
  } catch (error) {
    console.error('Error in DownloadPage:', error);
    // w przypadku błędu, przekieruj na fallback URL
    redirect(FALLBACK_APK_URL);
  }
}
