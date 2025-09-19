import { useState, useRef, useEffect, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "@/api/tasks";
import { type Task, type TaskStatus } from "@/models/task";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, CircleX } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  task: Task;
}

const TASK_STATUS = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
} as const;

export default function TaskCard({ task }: Props) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [draftTitle, setDraftTitle] = useState(task.title);
  const [titleEditing, setTitleEditing] = useState(false);
  const [showError, setShowError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateMutation = useMutation({
    mutationFn: (updates: { title?: string; status?: TaskStatus }) =>
      updateTask({
        id: task.id,
        updates,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      setDraftTitle(task.title);
      setShowError(true);
      console.error("Failed to update task:", error);
    },
  });

  function handleSave() {
    if (draftTitle !== task.title) {
      updateMutation.mutate({ title: draftTitle });
    }
    setTitleEditing(false);
  }

  function handleStatusChange(newStatus: string) {
    if (newStatus !== task.status) {
      updateMutation.mutate({ status: newStatus as TaskStatus });
    }
  }

  const handleCancel = useCallback(() => {
    setDraftTitle(task.title);
    setTitleEditing(false);
  }, [task.title]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  }

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
  }, [titleEditing, handleCancel]);

  useEffect(() => {
    let timeoutId: number;
    if (showError) {
      timeoutId = window.setTimeout(() => {
        setShowError(false);
      }, 2000);
    }
    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [showError]);

  useEffect(() => {
    if (titleEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [titleEditing]);

  return (
    <Card className="w-full h-auto mb-4 gap-2" ref={cardRef}>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row gap-2 justify-between mb-2 items-center">
            <div>{task.id}</div>
            <Select value={task.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder={t("task_card.select_status")} />
              </SelectTrigger>
              <SelectContent>
                {Object.values(TASK_STATUS).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

        {showError && (
          <p className="text-sm text-red-500 mt-1 animate-fade-in">
            {t("task_card.update_failed")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
