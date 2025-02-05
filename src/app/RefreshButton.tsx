"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function RefreshButton() {
  const { timezone } = useParams();
  const [data, setData] = useState<any>(null);
  const refresh = async () => {
    const request = await fetch(`/timezone?key=${(timezone as string[]).join("/")}`);
    setData(await request.json());
  };

  return (
    <>
      <button onClick={refresh} style={{ padding: "1rem", borderRadius: "1rem", fontSize: "2rem" }}>
        invalidate cache
      </button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {data && <h2>refresh again to verify cache is invalidated</h2>}
    </>
  );
}
