import Image from "next/image";
import type { VinylRecord } from "@/lib/discogs";

export function VinylGrid({ records }: { records: VinylRecord[] | null }) {
  if (records === null) {
    return (
      <p className="mt-10 text-[15px] text-muted">Couldn&apos;t load the collection right now.</p>
    );
  }

  if (records.length === 0) {
    return (
      <p className="mt-10 text-[15px] text-muted">No records yet.</p>
    );
  }

  return (
    <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
      {records.map((record) => (
        <li key={record.id}>
          <a
            href={record.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            {record.cover ? (
              <Image
                src={record.cover}
                alt={record.title}
                width={160}
                height={160}
                className="aspect-square w-full rounded-sm object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                unoptimized
              />
            ) : (
              <div className="aspect-square w-full rounded-sm bg-muted/10" />
            )}
            <p className="mt-2 truncate text-[13px] transition-colors group-hover:text-foreground">
              {record.artist}
            </p>
            <p className="truncate text-[13px] text-muted">{record.title}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}
