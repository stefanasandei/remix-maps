import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  // SheetTitle,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { set as setPosition } from "~/lib/slices/position";

export type SearchLocation = { display_name: string; lat: number; lon: number };

export const Sidebar = () => {
  const searchQuery = useAppSelector((state) => state.searchQuery);
  const searchResult = useActionData<typeof action>();

  const dispatch = useAppDispatch();

  return (
    <Sheet open={searchQuery.open}>
      <SheetTrigger>
        <Button
          variant={"ghost"}
          size={"icon"}
          type="submit"
          onClick={() => dispatch(toggle())}
        >
          <AlignJustify />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          {/* <SheetTitle>Options</SheetTitle> */}
          <SheetDescription>
            <Tabs defaultValue="destination">
              <TabsList>
                <TabsTrigger value="destination">Destination</TabsTrigger>
                <TabsTrigger value="position">Starting point</TabsTrigger>
              </TabsList>
              <TabsContent value="destination">
                <p>Search for a destination</p>
                <Form
                  method="post"
                  className="grid grid-cols-4 w-full max-w-sm items-center space-x-2 py-2"
                >
                  <Input
                    type="text"
                    name="destination"
                    value={searchQuery.destination}
                    onChange={(e) => {
                      dispatch(setSearchQuery(e.target.value));
                    }}
                    placeholder="Search a destination"
                    className="col-span-3"
                  />
                  <Button type="submit" className="w-full">
                    Search
                  </Button>
                </Form>
                <div className="py-2 space-y-2 flex flex-col overflow-y-auto">
                  {searchResult != undefined &&
                    searchResult.map((result: SearchLocation) => (
                      <button
                        key={result.display_name}
                        className="rounded-lg text-left hover:bg-secondary p-1 transition-colors cursor-pointer"
                        onClick={async () => {
                          dispatch(
                            setDestination({ lat: result.lat, lon: result.lon })
                          );
                          dispatch(toggle());
                        }}
                      >
                        <p className="text-lg font-bold">
                          {result.display_name}
                        </p>
                        <p>lat: {result.lat}</p>
                        <p>lon: {result.lon}</p>
                      </button>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="position">
                <p>Choose a start location</p>
                <Form
                  method="post"
                  className="grid grid-cols-4 w-full max-w-sm items-center space-x-2 py-2"
                >
                  <Input
                    type="text"
                    name="destination"
                    value={searchQuery.destination}
                    onChange={(e) => {
                      dispatch(setSearchQuery(e.target.value));
                    }}
                    placeholder="Search a starting point"
                    className="col-span-3"
                  />
                  <Button type="submit" className="w-full">
                    Search
                  </Button>
                </Form>
                <Button
                  type="submit"
                  variant={"outline"}
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    if ("geolocation" in navigator) {
                      navigator.geolocation.getCurrentPosition((position) => {
                        dispatch(
                          setPosition({
                            lat: position.coords.latitude,
                            lon: position.coords.longitude,
                          })
                        );
                      });
                    } else alert("Location is not available!");
                  }}
                >
                  Your location
                </Button>
                <div className="py-2 space-y-2 flex flex-col overflow-y-auto">
                  {searchResult != undefined &&
                    searchResult.map((result: SearchLocation) => (
                      <button
                        key={result.display_name}
                        className="rounded-lg text-left hover:bg-secondary p-1 transition-colors cursor-pointer"
                        onClick={async () => {
                          dispatch(
                            setPosition({ lat: result.lat, lon: result.lon })
                          );
                          // dispatch(toggle());
                        }}
                      >
                        <p className="text-lg font-bold">
                          {result.display_name}
                        </p>
                        <p>lat: {result.lat}</p>
                        <p>lon: {result.lon}</p>
                      </button>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
