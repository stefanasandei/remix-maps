import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { set as setSearchQuery } from "~/lib/slices/search-query";
import { useAppDispatch } from "~/lib/hooks";

export const TopBar = () => {
  const [destination, setDestination] = useState("");
  const dispatchSearchQuery = useAppDispatch();

  return (
    <div className="w-full bg-background h-14 flex flex-row items-center p-2 justify-between">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => {
            alert("open sidebar");
          }}
        >
          <AlignJustify />
        </Button>
        <Input
          type="text"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
          }}
          placeholder="Search a destination"
          className="w-64"
        />
        <Button
          type="submit"
          onClick={() => {
            dispatchSearchQuery(setSearchQuery(destination));
          }}
        >
          Search
        </Button>
      </div>
      <div>
        <p className="font-bold text-xl">Remix Maps</p>
      </div>
    </div>
  );
};
