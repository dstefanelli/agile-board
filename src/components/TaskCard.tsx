//import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { type Task } from "@/models/task";
// import { Pencil } from "lucide-react";
// import { CircleX } from "lucide-react";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  // const initialTitle = task.title;
  // const [title, setTitle] = useState(initialTitle);
  // const [draft, setDraft] = useState(initialTitle);
  // const [editing, setEditing] = useState(false);
  // function handleSave() {
  //   setTitle(draft);
  //   setEditing(false);
  // }
  // function handleCancel() {
  //   setDraft(title);
  //   setEditing(false);
  // }

  // function handleKeyDown(e: React.KeyboardEvent) {
  //   if (e.key === 'Enter' && !e.shiftKey) {
  //     e.preventDefault();
  //     handleSave();
  //   } else if (e.key === 'Escape') {
  //     handleCancel();
  //   }
  // }

  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2 relative">
                {task.title}
                {/* <Input
                  id="title"
                  type="text"
                  value={editing ? draft : title}
                  disabled={!editing}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onClick={() => !editing && setEditing(true)}
                  className={`pr-16 ${!editing ? 'cursor-pointer hover:bg-slate-50' : ''}`}
                />
                {editing && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <Pencil
                      size={16}
                      className="cursor-pointer text-green-600"
                      onClick={handleSave}
                    />
                    <CircleX
                      size={16}
                      className="cursor-pointer text-red-600"
                      onClick={handleCancel}
                    />
                  </div>
                )} */}
              </div>
            </div>
          </form>
        </CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            {task.status}
            {/* <div className="grid gap-2">
              <Input id="status" type="status" value="TO DO" style={{ borderWidth: 0 }} />
              <div className=" flex justify-end gap-2 -mt-6">
                  <Pencil size={16} />
                  <CircleX size={16} />
                </div>
            </div> */}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
