"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Managent from "../../../components/Managent/Managent";  // Dùng default import

export default function Interactive() {
    const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  return (
    <Managent projectId={projectId as string}/>
  );
}
