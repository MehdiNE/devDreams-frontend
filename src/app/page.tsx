"use client";

import { getHello } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { error, isError, data } = useQuery({
    queryKey: ["todos"],
    queryFn: getHello,
  });
  console.log("🚀 ~ Home ~ error:", error);

  return <div>Hello</div>;
}
