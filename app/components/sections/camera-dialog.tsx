import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { type Camera } from "./map-view.client";

export const CameraDialog = ({ camera }: { camera: Camera }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <button type="submit">
          <p>{camera.name}</p>
          <img src={camera.link} alt={"preview"} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{camera.name} camera</DialogTitle>
          <DialogDescription>
            <img
              src={"http://127.0.0.1:8000" + camera.processedLink}
              alt={"camera"}
            />
            <p>{camera.cars} cars</p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
