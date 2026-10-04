import { createFileRoute } from "@tanstack/react-router";
import { LabApp } from "@/lab/shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <LabApp />;
}
