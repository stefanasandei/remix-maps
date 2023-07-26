import type { V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { MapView } from "~/components/sections/mapview";
import { TopBar } from "~/components/sections/topbar";
import { Button } from "~/components/ui/button";
import { getDB } from "~/lib/db.server";

export const meta: V2_MetaFunction = () => {
  return [{ title: "OpenMaps" }, { name: "description", content: "TODO" }];
};

export const loader = async () => {
  const db = await getDB();
  return {};
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="h-screen">
      <TopBar />
      <MapView />
    </div>
  );
}
