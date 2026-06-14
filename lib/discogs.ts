import { checkRateLimit } from "./rate-limit";

const DISCOGS_USER_AGENT = "joachimdemuth-portfolio/1.0 +https://joachimdemuth.com";
const USERNAME = process.env.DISCOGS_USERNAME ?? "demuth11";
const BASE = "https://api.discogs.com";

export type VinylRecord = {
  id: number;
  title: string;
  artist: string;
  year?: number;
  cover: string | null;
  url: string;
};

interface DiscogsCollectionRelease {
  id: number;
  basic_information: {
    id: number;
    title: string;
    year?: number;
    artists: Array<{ name: string }>;
    cover_image?: string;
    thumb?: string;
  };
}

interface DiscogsCollectionResponse {
  releases: DiscogsCollectionRelease[];
}

export async function getCollection(): Promise<VinylRecord[] | null> {
  const rate = checkRateLimit("discogs-collection");
  if (!rate.ok) {
    console.warn(`Discogs rate limit hit, retry after ${rate.retryAfter}s`);
    return null;
  }

  try {
    const res = await fetch(
      `${BASE}/users/${USERNAME}/collection/folders/0/releases?page=1&per_page=500&sort=artist&sort_order=asc`,
      {
        headers: { "User-Agent": DISCOGS_USER_AGENT },
        next: { revalidate: 604800 }, // 1 week
      },
    );

    if (!res.ok) {
      console.error(`Discogs collection: ${res.status} ${res.statusText}`);
      return null;
    }

    const data = (await res.json()) as DiscogsCollectionResponse;

    return (data.releases ?? []).map((item) => ({
      id: item.id,
      title: item.basic_information.title,
      artist: item.basic_information.artists.map((a) => a.name).join(", "),
      year: item.basic_information.year,
      cover: item.basic_information.cover_image ?? item.basic_information.thumb ?? null,
      url: `https://www.discogs.com/release/${item.basic_information.id}`,
    }));
  } catch {
    return null;
  }
}
