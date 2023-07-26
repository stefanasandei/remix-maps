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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import { Form, useActionData } from "@remix-run/react";
import { type action } from "~/routes/_index";

export const Sidebar = () => {
  const searchQuery = useAppSelector((state) => state.searchQuery);
  const searchResult = useActionData<typeof action>();
  const dispatchSearchQuery = useAppDispatch();

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
            <div>{JSON.stringify(searchResult)}</div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
