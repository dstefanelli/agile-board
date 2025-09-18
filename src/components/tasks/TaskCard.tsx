import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "@/api/tasks";
import { type Task } from "@/models/task";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pencil, CircleX } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [draft, setDraft] = useState(task.title);
  const [editing, setEditing] = useState(false);

  const updateMutation = useMutation({
    mutationFn: (newTitle: string) => updateTask({ id: task.id, updates: { title: newTitle } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      // Revert changes on error
      setDraft(task.title);
      console.error("Failed to update task:", error);
    }
  });

  function handleSave() {
    if (draft !== task.title) {
      updateMutation.mutate(draft);
    }
    setEditing(false);
  }

  function handleCancel() {
    setDraft(task.title);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  }

  return (
    <Card className="w-full h-auto mb-4">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row gap-2 justify-between mb-2">
              <div>{task.id}</div>
              <div>{task.status}</div>
            </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Input
            id="title"
            type="text"
            defaultValue={editing ? draft : task.title}
            disabled={!editing || updateMutation.isPending}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            onClick={() => setEditing(true)}
             className={`pr-16 ${!editing ? 'cursor-pointer hover:bg-slate-50' : ''} 
              ${updateMutation.isPending ? 'opacity-50' : ''}`}
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
          )}
        </div>

        {task.description ? (
          <p className="mt-2 text-sm text-gray-600">{task.description}</p>
        ) : null}
  
        {task.assignee ? (
          <p className="mt-2 text-sm text-gray-600 flex justify-end"><em>{t('task_card.assignee', { name: task.assignee })}</em></p>
        ) : null}

        {updateMutation.isError && (
          <p className="text-sm text-red-500 mt-1">
            {t('task_card.update_failed')}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
