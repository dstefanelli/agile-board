import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TaskCard() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-white/5"
        >
          New Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Task</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new task to your dashboard.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-6 mb-6">
            <div className="grid gap-2 relative">
              <Label htmlFor="title">Enter a short and clear task name</Label>
              <Input id="title" />
            </div>
          </div>
          <div className="flex flex-col gap-6 mb-6">
            <div className="grid gap-2 relative">
              <Label htmlFor="description">
                Optional: Add more context or details
              </Label>
              <Input id="description" />
            </div>
          </div>
        </form>
        <DialogFooter>
          <DialogClose>
            <Button
              variant="outline"
              className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-white/5"
            >
              Close
            </Button>
          </DialogClose>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
