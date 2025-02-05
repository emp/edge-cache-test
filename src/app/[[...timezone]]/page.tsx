import { notFound } from "next/navigation";
import styles from "../page.module.css";
import RefreshButton from "../RefreshButton";

export const dynamic = "force-static";

const timezones = [
  {
    timezone: ["America", "Toronto"],
  },
  {
    timezone: ["America", "Montreal"],
  },
  {
    timezone: ["America", "Vancouver"],
  },
];

export default async function Home({ params }: { params: Record<string, string[]> }) {
  const timezone = params.timezone.join("/");

  if (!timezones.find((entry) => entry.timezone.join("/") === timezone)) {
    return notFound();
  }

  const request = await fetch(`http://worldtimeapi.org/api/timezone/${timezone}`, {
    next: { tags: ["timezones", `timezone-${timezone}`] },
  });
  const data = await request.json();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>{data.unixtime}</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <RefreshButton />
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return timezones;
}
