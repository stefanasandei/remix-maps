import { Input } from "../ui/input";
import { useState } from "react";
import {
  set as setSearchQuery,
  toggle as toggleSearchQuery,
} from "~/lib/slices/search-query";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import { Sidebar } from "./sidebar";
import { InfoDialog } from "./info-dialog";
import { Button } from "../ui/button";

export const CityTopBar = () => {
  const searchQuery = useAppSelector((state) => state.searchQuery);
  const dispatchSearchQuery = useAppDispatch();

  const [destination, setDestination] = useState(searchQuery.destination);

  return (
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
      <InfoDialog />
    </div>
  );
};
