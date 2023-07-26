import { type ActionArgs, type V2_MetaFunction } from "@remix-run/node";
import { AppShell } from "~/components/sections/app-shell";
import MapView from "~/components/sections/map-view.client";
import { ClientOnly } from "~/components/functional/client-only";
import { type SearchLocation } from "~/components/sections/sidebar";

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

export async function action({ request }: ActionArgs) {
  const API_ENDPOINT = (location: string) =>
    `https://nominatim.openstreetmap.org/search.php?q=${location}&format=jsonv2`;
  const body = await request.formData();

  const res = await fetch(
    API_ENDPOINT(body.get("destination")?.toString() ?? "Bucuresti")
  );
  const data = await res.json();

  return data.map((location: SearchLocation) => {
    return {
      display_name: location.display_name,
      lat: location.lat,
      lon: location.lon,
    };
  });
}

export default function Index() {
  return (
    <AppShell>
      <ClientOnly fallback={<div>loading</div>}>{() => <MapView />}</ClientOnly>
    </AppShell>
  );
}
