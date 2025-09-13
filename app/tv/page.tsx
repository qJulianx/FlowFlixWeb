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

const GITHUB_REPO_OWNER = "FlowFlix";
const GITHUB_REPO_NAME = "FlowFlix_Early_Alpha";
const FALLBACK_APK_URL = "https://github.com/FlowFlix/FlowFlix_Early_Alpha/releases/download/2.4/FlowFlix.apk";

async function fetchLatestRelease(): Promise<GitHubReleaseResponse | null> {
  try {
    const apiUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/releases/latest`;
    console.log('📡 Pobieranie najnowszego wydania z:', apiUrl);
    
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    };

    const res = await fetch(apiUrl, {
      headers,
      cache: 'no-store', // Browser equivalent of Next.js revalidate
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
          cache: 'no-store',
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

async function performRedirect(): Promise<void> {
  try {
    console.log('🎯 Rozpoczynanie procesu przekierowania...');
    
    const release = await fetchLatestRelease();
    
    if (!release) {
      // jeśli nie znaleziono żadnego wydania, przekieruj na fallback URL
      console.log('⚠️ Brak wydania - przekierowanie na fallback URL');
      console.log('🔗 Przekierowanie na fallback:', FALLBACK_APK_URL);
      window.location.href = FALLBACK_APK_URL;
      return;
    }

    const apkAsset = findApkAsset(release);
    
    if (apkAsset?.browser_download_url) {
      console.log('🚀 Przekierowanie na:', apkAsset.browser_download_url);
      window.location.href = apkAsset.browser_download_url;
      return;
    } else {
      // jeśli nie znaleziono APK w wydaniu, użyj fallback URL
      console.log('⚠️ Nie znaleziono APK - przekierowanie na fallback URL');
      console.log('🔗 Przekierowanie na fallback:', FALLBACK_APK_URL);
      window.location.href = FALLBACK_APK_URL;
      return;
    }
  } catch (error) {
    console.error('❌ Error in performRedirect:', error);
    // w przypadku błędu, przekieruj na fallback URL
    console.log('🔗 Przekierowanie na fallback URL:', FALLBACK_APK_URL);
    window.location.href = FALLBACK_APK_URL;
  }
}

// Initialize redirect process
function initializeRedirect(): void {
  console.log('🚀 Android.html załadowany - rozpoczynanie przekierowania...');
  
  // Dodaj opóźnienie żeby DOM się załadował i logi były widoczne
  console.log('⏳ Oczekiwanie na załadowanie DOM...');
  
  document.addEventListener('DOMContentLoaded', (): void => {
    console.log('✅ DOM załadowany, rozpoczynanie przekierowania za 500ms...');
    setTimeout(performRedirect, 500);
  });

  // Fallback - jeśli DOM już załadowany
  if (document.readyState === 'loading') {
    console.log('📄 DOM jeszcze się ładuje...');
  } else {
    console.log('📄 DOM już załadowany, rozpoczynanie przekierowania za 500ms...');
    setTimeout(performRedirect, 500);
  }
}

// Start the redirect process
initializeRedirect();

// Export functions for potential reuse
export { fetchLatestRelease, findApkAsset, performRedirect, initializeRedirect };
