import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const TopBar = () => {
  return (
    <div className="w-full bg-background h-14 flex flex-row items-center p-2 justify-between">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Button variant={"ghost"} size={"icon"}>
          <AlignJustify />
        </Button>
        <Input
          type="text"
          placeholder="Search a destination"
          className="w-64"
        />
        <Button type="submit">Search</Button>
      </div>
      <div>
        <p className="font-bold text-xl">Remix Maps</p>
      </div>
    </div>
  );
};
