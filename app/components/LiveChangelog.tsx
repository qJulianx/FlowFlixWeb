import ChangelogUI from "./ChangelogUI";

type GitHubRelease = {
  tag_name: string;
  published_at: string;
  body: string;
  html_url: string;
};

async function getLatestRelease(): Promise<GitHubRelease | null> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/qJulianx/FlowFlixWeb/releases/latest",
      { next: { revalidate: 600 } }
    );
    
    if (!res.ok) return null;
    
    return res.json();
  } catch (e) {
    return null;
  }
}

export default async function LiveChangelog() {
  const release = await getLatestRelease();

  if (!release) return null;

  const date = new Date(release.published_at).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return <ChangelogUI release={release} date={date} />;
}
