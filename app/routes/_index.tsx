import { json, type ActionArgs, type V2_MetaFunction } from "@remix-run/node";
import { AppShell } from "~/components/sections/app-shell";
import MapView from "~/components/sections/map-view.client";
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

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  return json({ destination: body.get("destination") });
}

export default function Index() {
  return (
    <AppShell>
      <ClientOnly fallback={<div>loading</div>}>{() => <MapView />}</ClientOnly>
    </AppShell>
  );
}
