import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import {
  set as setSearchQuery,
  toggle as toggleSearchQuery,
} from "~/lib/slices/search-query";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import { Sidebar } from "./sidebar";

export const AppShell = ({ children }: { children: JSX.Element }) => {
  const searchQuery = useAppSelector((state) => state.searchQuery);
  const destinationQuery = useAppSelector((state) => state.destination);
  const dispatchSearchQuery = useAppDispatch();

  const [destination, setDestination] = useState(searchQuery.destination);

  return (
    <div className="h-screen overflow-y-hidden">
      <div className="w-full bg-background h-14 flex flex-row items-center p-2 justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Sidebar />
          <Input
            type="text"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
            }}
            placeholder="Search a destination"
            className="w-64"
            required
          />
          <Button
            type="submit"
            disabled={destination == ""}
            onClick={() => {
              dispatchSearchQuery(setSearchQuery(destination));
              dispatchSearchQuery(toggleSearchQuery());
            }}
          >
            Search
          </Button>
        </div>
        <div>
          <p className="font-bold text-xl">
            Remix Maps {JSON.stringify(destinationQuery)}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};
