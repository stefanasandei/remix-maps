import { json, type ActionArgs, type V2_MetaFunction } from "@remix-run/node";
import { AppShell } from "~/components/sections/app-shell";
import MapView, { type Camera } from "~/components/sections/map-view.client";
import { ClientOnly } from "~/components/functional/client-only";
import { CityTopBar } from "~/components/sections/city-top-bar copy";
import { type SearchLocation } from "~/components/sections/sidebar";
import { useLoaderData } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "InfoEducatie_Maps" },
    { name: "description", content: "InfoEducatie Open 2023" },
    {
      tagName: "link",
      rel: "stylesheet",
      href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
    },
  ];
};

export const loader = async () => {
  const API_ENDPOINT = "http://0.0.0.0:8000/cameras";

  const res = await fetch(API_ENDPOINT);
  const data = await res.json();
  return json(data.cameras, 200);
};

export async function action({ request }: ActionArgs) {
  const API_ENDPOINT = (location: string) =>
    `https://nominatim.openstreetmap.org/search.php?q=${location}&format=jsonv2`;

  const body = await request.formData();
  const destination = body.get("destination");

  if (destination == undefined) return json({}, 500);

  const res = await fetch(API_ENDPOINT(destination.toString()));
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
  const BUCHAREST_COORDS = [44.439663, 26.096306];

  const data = useLoaderData<typeof loader>();

  return (
    <AppShell topBar={<CityTopBar />}>
      <ClientOnly fallback={<div>loading</div>}>
        {() => (
          <MapView
            zoom={"low"}
            center={BUCHAREST_COORDS}
            cameras={data as Camera[]}
          />
        )}
      </ClientOnly>
    </AppShell>
  );
}
