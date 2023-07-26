import type { V2_MetaFunction } from "@remix-run/node";
import { TopBar } from "~/components/sections/topbar";
import MapView from "~/components/sections/mapview.client";
import { ClientOnly } from "~/components/functional/client-only";
import { useAppSelector } from "~/lib/hooks";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "OpenMaps" },
    { name: "description", content: "TODO" },
    {
      tagName: "link",
      rel: "stylesheet",
      href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
    },
  ];
};

export const loader = async () => {
  return {};
};

export default function Index() {
  const searchQuery = useAppSelector((state) => state.searchQuery);
  return (
    <div className="h-screen overflow-y-hidden">
      <TopBar />
      {/* <p>dest: {searchQuery.destination}</p> */}
      <ClientOnly fallback={<div>idk</div>}>{() => <MapView />}</ClientOnly>
    </div>
  );
}
