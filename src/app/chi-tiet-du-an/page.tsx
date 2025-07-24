import React, { Suspense } from "react";
import Interactive from "./Interactive"; // client component riêng

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Interactive />
    </Suspense>
  );
}
