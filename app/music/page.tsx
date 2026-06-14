import type { Metadata } from "next";
import { getRecentlyPlayed, getTopTracks, getTopArtists } from "@/lib/spotify";
import { getCollection } from "@/lib/discogs";
import { MusicTabs } from "./music-tabs";

export const metadata: Metadata = {
  title: "Music - Joachim Demuth",
  description: "What I've been listening to.",
};

export const revalidate = 120;

export default async function Music() {
  const [recentlyPlayed, topTracks, topArtists, records] = await Promise.all([
    getRecentlyPlayed(15),
    getTopTracks("short_term", 10),
    getTopArtists("short_term", 8),
    getCollection(),
  ]);

  return (
    <main>
      <div className="animate-in">
        <h1 className="text-2xl font-medium tracking-tight">Music</h1>
        <p className="mt-3 text-[15px] text-muted">
          I spend a lot of time discovering music. Here&apos;s the result of that.
        </p>
      </div>

      <div className="mt-10">
        <MusicTabs
          recentlyPlayed={recentlyPlayed}
          topTracks={topTracks}
          topArtists={topArtists}
          records={records}
        />
      </div>
    </main>
  );
}
