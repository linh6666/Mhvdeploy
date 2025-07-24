// "use client";
// import React from "react";
// import { useSearchParams } from "next/navigation";
// import Managent from "../../../components/Managent/Managent";

// export default function Interactive() {
//   const searchParams = useSearchParams();
//   const projectId = searchParams.get("pageId"); // đổi đúng theo URL

//   if (!projectId) {
//     return <div>❌ Thiếu projectId (pageId) trên URL.</div>;
//   }

//   return <Managent projectId={projectId} />;
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
