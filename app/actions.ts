"use server"

interface GitHubReleaseAsset {
  name: string
  size: number
  browser_download_url: string
}

interface GitHubReleaseResponse {
  tag_name: string
  name: string | null // Release title
  body: string | null // Changelog in Markdown
  assets: GitHubReleaseAsset[]
  published_at: string
  prerelease?: boolean // Dodaj to pole
  draft?: boolean // Dodaj to pole
  message?: string // For API error messages
  documentation_url?: string
}

export interface ChangelogInfo {
  version: string
  title: string | null
  description: string | null // Changelog
  publishedDate: string
  error?: string
}

// Używamy poprawnej wielkości liter ze zrzutu ekranu
const GITHUB_REPO_OWNER = "FlowFlix"
const GITHUB_REPO_NAME = "FlowFlix_Early_Alpha"

export async function getLatestReleaseChangelog(): Promise<ChangelogInfo> {
  const apiUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/releases/latest`

  try {
    console.log(`Fetching latest release changelog from: ${apiUrl}`)
    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: {
        revalidate: 3600, // Cache na 1 godzinę
      },
    })

    if (!response.ok) {
      // Jeśli nie ma najnowszego wydania, spróbuj pobrać wszystkie wydania
      if (response.status === 404) {
        console.log("No latest release found, trying to fetch all releases...")
        const allReleasesUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/releases`

        try {
          const allReleasesResponse = await fetch(allReleasesUrl, {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
            next: {
              revalidate: 3600,
            },
          })

          if (allReleasesResponse.ok) {
            const allReleases: GitHubReleaseResponse[] = await allReleasesResponse.json()

            if (allReleases.length > 0) {
              // Znajdź pierwsze wydanie, które nie jest pre-release ani draft
              const stableRelease = allReleases.find((release) => !release.prerelease && !release.draft)

              if (stableRelease) {
                return {
                  version: stableRelease.tag_name,
                  title: stableRelease.name,
                  description: stableRelease.body,
                  publishedDate: stableRelease.published_at,
                }
              }

              // Jeśli nie ma stabilnych wydań, weź najnowsze (pierwsze z listy)
              const latestRelease = allReleases[0]
              return {
                version: latestRelease.tag_name,
                title: latestRelease.name,
                description: latestRelease.body,
                publishedDate: latestRelease.published_at,
              }
            }
          }
        } catch (fallbackError) {
          console.error("Error fetching all releases:", fallbackError)
        }
      }

      // Jeśli wszystko inne zawiedzie, zwróć informację o braku wydań
      return {
        version: "Brak informacji",
        title: "Wydania niedostępne",
        description:
          "Nie udało się pobrać informacji o najnowszym wydaniu. Sprawdź stronę GitHub dla najnowszych aktualizacji.",
        publishedDate: "",
        error: "Brak dostępnych wydań w repozytorium",
      }
    }

    const data: GitHubReleaseResponse = await response.json()

    return {
      version: data.tag_name,
      title: data.name,
      description: data.body,
      publishedDate: data.published_at,
    }
  } catch (error) {
    console.error(`Błąd w getLatestReleaseChangelog podczas komunikacji z ${apiUrl}:`, error)
    return {
      version: "Brak informacji",
      title: "Błąd połączenia",
      description: "Wystąpił problem z połączeniem do GitHub. Spróbuj ponownie później.",
      publishedDate: "",
      error: error instanceof Error ? error.message : "Nieznany błąd",
    }
  }
}
