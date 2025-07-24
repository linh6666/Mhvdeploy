// // app/chi-tiet-du-an/page.tsx
// import Interactive from "./Interactive";

// interface PageProps {
//   searchParams: {
//     pageId?: string;
//   };
// }

// export default function Page({ searchParams }: PageProps) {
//   const projectId = typeof searchParams.pageId === "string" ? searchParams.pageId : "";

//   return <Interactive projectId={projectId} />;
// }
import React, { Suspense } from "react";
import Interactive from "./Interactive"; // client component riêng

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Interactive />
    </Suspense>
  );
}
