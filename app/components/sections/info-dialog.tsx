import { InfoIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import { set as setPosition } from "~/lib/slices/position";
import { set as setDestination } from "~/lib/slices/destination";

export const InfoDialog = () => {
  const dispatch = useAppDispatch();
  const destinationQuery = useAppSelector((state) => state.destination);

  return (
    <Dialog>
      <DialogTrigger>
        <Button type="submit" variant={"outline"} id="info-dialog">
          <InfoIcon />
        </Button>
      </DialogTrigger>
      <DialogContent id="info-content">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Route information
          </DialogTitle>
          <DialogDescription>
            {destinationQuery.distance == 0.0 ? (
              <div>
                <p>Select a starting point and a destination first!</p>
                <Button
                  onClick={() => {
                    dispatch(setPosition({ lat: 44.439663, lon: 26.096306 }));
                    dispatch(setDestination({ lat: 45.7, lon: 27.18333 }));
                  }}
                >
                  set example route
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 text-lg">
                <p>
                  Distance: {Math.round(destinationQuery.distance / 1000)}km
                </p>
                <p>
                  Duration:{" "}
                  {destinationQuery.duration >= 360
                    ? `${Math.round(destinationQuery.duration / 60 / 60)}h`
                    : `${Math.round(destinationQuery.duration / 60)}m`}
                </p>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
