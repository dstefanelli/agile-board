import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Task } from "@/models/task";

interface Props {
  task: Task;
}

export function TaskCard({ task }: Props) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="title"
                  value="Create Dashboard"
                  placeholder="Title"
                />
              </div>
            </div>
          </form>
        </CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Input id="status" type="status" value="TO DO" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
