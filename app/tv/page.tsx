import { redirect } from "next/navigation";

interface GitHubReleaseAsset {
  name: string;
  size: number;
  browser_download_url: string;
}

interface GitHubReleaseResponse {
  tag_name: string;
  name: string | null;
  body: string | null;
  assets: GitHubReleaseAsset[];
  published_at: string;
  prerelease?: boolean;
  draft?: boolean;
  message?: string;
  documentation_url?: string;
}

const GITHUB_REPO_OWNER = "qJulianx";
const GITHUB_REPO_NAME = "FlowFlixWeb";
const FALLBACK_APK_URL = "https://github.com/qJulianx/FlowFlixWeb/releases/download/v2.510/app-release.v2.510.apk";

export const dynamic = "force-dynamic";

async function fetchLatestRelease(): Promise<GitHubReleaseResponse | null> {
  try {
    const apiUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/releases/latest`;
    console.log('📡 Pobieranie najnowszego wydania z:', apiUrl);
    
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

    console.log('📊 Status odpowiedzi API:', res.status, res.statusText);

    if (res.ok) {
      const data = await res.json();
      console.log('✅ Pobrano dane najnowszego wydania:', data.tag_name);
      return data;
    } else if (res.status === 404) {
      console.log('⚠️ Najnowsze wydanie nie znalezione (404), próba pobrania wszystkich wydań...');
      // fallback na pobranie wszystkich wydań
      try {
        const allReleasesUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/releases`;
        console.log('📡 Pobieranie wszystkich wydań z:', allReleasesUrl);
        
        const allReleasesRes = await fetch(allReleasesUrl, {
          headers,
          next: { revalidate: 600 },
        });

        if (!allReleasesRes.ok) {
          console.error(`GitHub API error when fetching all releases: ${allReleasesRes.status}`);
          return null;
        }

        const allReleases = await allReleasesRes.json();
        console.log('📋 Znaleziono wydań:', allReleases.length);
        
        if (!Array.isArray(allReleases)) {
          console.error('GitHub API returned invalid releases data');
          return null;
        }
        
        // znajdź stabilne wydanie (nie draft, nie prerelease)
        const stableRelease = allReleases.find(
          (r: GitHubReleaseResponse) => r && !r.prerelease && !r.draft
        );

        if (stableRelease) {
          console.log('✅ Znaleziono stabilne wydanie:', stableRelease.tag_name);
          return stableRelease;
        }

        // jeśli nie ma stabilnych, zwróć pierwsze z listy
        if (allReleases.length > 0) {
          console.log('⚠️ Brak stabilnych wydań, używam najnowszego:', allReleases[0].tag_name);
          return allReleases[0];
        }
        return null;
      } catch (fallbackError) {
        console.error('❌ Error fetching all releases:', fallbackError);
        return null;
      }
    }
    
    console.error(`❌ GitHub API error: ${res.status}`);
    return null;
  } catch (error) {
    console.error('❌ Error in fetchLatestRelease:', error);
    return null;
  }
}

function findApkAsset(release: GitHubReleaseResponse): GitHubReleaseAsset | null {
  console.log('🔍 Szukanie pliku APK w wydaniu:', release.tag_name);
  
  // sprawdź czy release ma assets
  if (!release.assets || !Array.isArray(release.assets)) {
    console.error('Release has no assets array');
    return null;
  }

  console.log('📦 Dostępne pliki:', release.assets.map((a: GitHubReleaseAsset) => a.name));

  // znajdź plik APK w assets
  const apkAsset = release.assets.find((asset: GitHubReleaseAsset) => 
    asset && asset.name && asset.name.toLowerCase().endsWith('.apk')
  );

  if (apkAsset?.browser_download_url) {
    console.log('✅ Znaleziono plik APK:', apkAsset.name);
    console.log('🔗 URL do pobrania:', apkAsset.browser_download_url);
    return apkAsset;
  } else {
    // jeśli nie znaleziono APK w wydaniu
    console.error('❌ No APK file found in release assets');
    return null;
  }
}

// Next.js Page Component - MUSI być default export
export default async function TVPage() {
  try {
    console.log('🎯 Rozpoczynanie procesu przekierowania na stronie TV...');
    
    const release = await fetchLatestRelease();
    
    if (!release) {
      // jeśli nie znaleziono żadnego wydania, przekieruj na fallback URL
      console.log('⚠️ Brak wydania - przekierowanie na fallback URL');
      console.log('🔗 Przekierowanie na fallback:', FALLBACK_APK_URL);
      redirect(FALLBACK_APK_URL);
      return;
    }

    const apkAsset = findApkAsset(release);
    
    if (apkAsset?.browser_download_url) {
      console.log('🚀 Przekierowanie na:', apkAsset.browser_download_url);
      redirect(apkAsset.browser_download_url);
      return;
    } else {
      // jeśli nie znaleziono APK w wydaniu, użyj fallback URL
      console.log('⚠️ Nie znaleziono APK - przekierowanie na fallback URL');
      console.log('🔗 Przekierowanie na fallback:', FALLBACK_APK_URL);
      redirect(FALLBACK_APK_URL);
      return;
    }
  } catch (error) {
    console.error('❌ Error in TVPage:', error);
    // w przypadku błędu, przekieruj na fallback URL
    console.log('🔗 Przekierowanie na fallback URL:', FALLBACK_APK_URL);
    redirect(FALLBACK_APK_URL);
  }
}
