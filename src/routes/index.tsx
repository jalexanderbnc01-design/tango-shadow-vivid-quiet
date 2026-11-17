import { createFileRoute } from "@tanstack/react-router";
import { PresetPanel } from "@/components/preset-panel";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <PresetPanel />;
}
