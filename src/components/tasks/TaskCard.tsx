import { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "@/api/tasks";
import { type Task } from "@/models/task";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pencil, CircleX } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [draftTitle, setDraftTitle] = useState(task.title);
  const [titleEditing, setTitleEditing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log("titleEditing", titleEditing);
      if (
        titleEditing &&
        cardRef.current &&
        !cardRef.current.contains(event.target as Node)
      ) {
        handleCancel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [titleEditing]);

  useEffect(() => {
    // Focus input when entering edit mode
    if (titleEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [titleEditing]);

  const updateMutation = useMutation({
    mutationFn: (newTitle: string) =>
      updateTask({
        id: task.id,
        updates: {
          title: newTitle,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      setDraftTitle(task.title);
      console.error("Failed to update task:", error);
    },
  });

  function handleSave() {
    if (draftTitle !== task.title) {
      updateMutation.mutate(draftTitle);
    }
    setTitleEditing(false);
  }

  function handleCancel() {
    setDraftTitle(task.title);
    setTitleEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  }

  return (
    <Card className="w-full h-auto mb-4 gap-2" ref={cardRef}>
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
            ref={inputRef}
            id={`title-${task.id}`}
            type="text"
            value={titleEditing ? draftTitle : task.title}
            onChange={(e) => setDraftTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onClick={() => !titleEditing && setTitleEditing(true)}
            title={t("task_card.click_to_edit")}
            className={`pl-0 pr-16 border-1 border-transparent shadow-none hover:outline-2 font-bold text-3xl ${
              !titleEditing
                ? "cursor-pointer hover:border-slate-50"
                : "border-blue-400"
            }`}
          />
          {titleEditing && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <Pencil
                size={16}
                className="cursor-pointer text-green-700"
                onClick={handleSave}
              />
              <CircleX
                size={16}
                className="cursor-pointer text-red-400"
                onClick={handleCancel}
              />
            </div>
          )}
        </div>

        {task.description ? (
          <p className="mt-2 text-sm text-gray-600">{task.description}</p>
        ) : null}

        {task.assignee ? (
          <p className="mt-2 text-sm text-gray-600 flex justify-end">
            <em>{t("task_card.assignee", { name: task.assignee })}</em>
          </p>
        ) : null}

        {/* {updateMutation.isError && (
          <p className="text-sm text-red-500 mt-1">
            {t("task_card.update_failed")}
          </p>
        )} */}
      </CardContent>
    </Card>
  );
}
