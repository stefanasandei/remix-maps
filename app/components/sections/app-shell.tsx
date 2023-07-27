import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import { Button } from "../ui/button";
import { Link, useMatches } from "@remix-run/react";
import { set as setPosition } from "~/lib/slices/position";

export const AppShell = ({
  children,
  topBar,
}: {
  children: JSX.Element;
  topBar: JSX.Element;
}) => {
  const matches = useMatches();
  const dispatch = useAppDispatch();
  const position = useAppSelector((state) => state.position);
  const { pathname } = matches[matches.length - 1];

  return (
    <div className="h-screen overflow-y-hidden">
      <div className="w-full bg-background h-14 flex flex-row items-center p-2 justify-between">
        {topBar}
        <div className="hidden md:inline">
          {/* <p className="font-bold text-xl">Remix Maps</p> */}
          {pathname !== "/bucharest" ? (
            <Link to="/bucharest">
              <Button variant={"outline"}>Bucharest</Button>
            </Link>
          ) : (
            <div className="flex flex-row gap-2">
              <Button
                className="hidden md:inline"
                variant={"outline"}
                onClick={() => {
                  const current = localStorage.getItem("mapStyle");
                  localStorage.setItem("mapStyle", current == "0" ? "1" : "0");
                  dispatch(
                    setPosition({
                      lat: position.lat + 0.00001,
                      lon: position.lon,
                    })
                  );
                }}
              >
                Toggle style
              </Button>
              <Link to="/">
                <Button variant={"outline"}>World</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
