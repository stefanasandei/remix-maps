import { Button } from "../ui/button";
import { Link, useMatches } from "@remix-run/react";

export const AppShell = ({
  children,
  topBar,
}: {
  children: JSX.Element;
  topBar: JSX.Element;
}) => {
  const matches = useMatches();
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
            <Link to="/">
              <Button variant={"outline"}>World</Button>
            </Link>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
