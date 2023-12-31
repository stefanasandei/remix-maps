import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import polyUtil from "polyline-encoded";

type LocationQuery = { lat: number; lon: number };

export const action = async ({ request }: LoaderArgs) => {
  if (request.method != "POST") return json({}, 500);

  const body = (await request.json()) as {
    position: LocationQuery;
    destination: LocationQuery;
  };

  const res = await fetch(
    `https://router.project-osrm.org/route/v1/driving/${body.position.lon},${body.position.lat};${body.destination.lon},${body.destination.lat}`
  );

  const data = await res.json();
  if (data.code != "Ok") return json(data, 500);

  const encodedGeometry = data.routes[0].geometry;
  const route = polyUtil.decode(encodedGeometry);

  return json(
    {
      route: route,
      duration: data.routes[0].duration,
      distance: data.routes[0].distance,
    },
    200
  );
};
