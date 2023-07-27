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
import { useAppSelector } from "~/lib/hooks";

export const InfoDialog = () => {
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
              <p>Select a starting point and a destination first!</p>
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
