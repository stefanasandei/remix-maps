import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import { set as setSearchQuery, toggle } from "~/lib/slices/search-query";
import { set as setDestination } from "~/lib/slices/destination";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import { Form, useActionData } from "@remix-run/react";
import { type action } from "~/routes/_index";

export type SearchLocation = { display_name: string; lat: number; lon: number };

export const Sidebar = () => {
  const searchQuery = useAppSelector((state) => state.searchQuery);
  const searchResult = useActionData<typeof action>();

  const dispatchSearchQuery = useAppDispatch();
  const dispatchDestination = useAppDispatch();

  return (
    <Sheet open={searchQuery.open}>
      <SheetTrigger>
        <Button
          variant={"ghost"}
          size={"icon"}
          type="submit"
          onClick={() => dispatchSearchQuery(toggle())}
        >
          <AlignJustify />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Search for a destination</SheetTitle>
          <SheetDescription>
            <Form
              method="post"
              className="flex w-full max-w-sm items-center space-x-2 py-2"
            >
              <Input
                type="text"
                name="destination"
                value={searchQuery.destination}
                onChange={(e) => {
                  dispatchSearchQuery(setSearchQuery(e.target.value));
                }}
                placeholder="Search a destination"
                className="w-64"
              />
              <Button type="submit">Search</Button>
            </Form>
            <div className="py-2 space-y-2 flex flex-col overflow-y-auto">
              {searchResult != undefined &&
                searchResult.map((result: SearchLocation) => (
                  <button
                    key={result.display_name}
                    className="rounded-lg text-left hover:bg-secondary p-1 transition-colors cursor-pointer"
                    onClick={async () => {
                      dispatchDestination(
                        setDestination({ lat: result.lat, lon: result.lon })
                      );
                      dispatchSearchQuery(toggle());
                    }}
                  >
                    <p className="text-lg font-bold">{result.display_name}</p>
                    <p>lat: {result.lat}</p>
                    <p>lon: {result.lon}</p>
                  </button>
                ))}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
