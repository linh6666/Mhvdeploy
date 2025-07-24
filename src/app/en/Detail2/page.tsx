import React, { Suspense } from "react";
import InteractiveClient from "./interactive-client"; // client component riêng

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InteractiveClient />
    </Suspense>
  );
}
