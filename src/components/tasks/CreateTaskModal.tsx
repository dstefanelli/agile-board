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
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

export default function TaskCard() {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-white/5"
        >
          New Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('task_modal.title_create')}</DialogTitle>
          <DialogDescription>{t('task_modal.subtitle')}</DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-6 mb-6">
            <div className="grid gap-2 relative">
              <Label htmlFor="title">{t('task_modal.task_name')}</Label>
              <Input id="title" placeholder={t('task_modal.task_name_placeholder')} />
            </div>
          </div>
          <div className="flex flex-col gap-6 mb-6">
            <div className="grid gap-2 relative">
              <Label htmlFor="description">{t('task_modal.description')}</Label>
              <Input id="description" placeholder={t('task_modal.description_placeholder')} />
            </div>
          </div>
        </form>
        <DialogFooter>
          <DialogClose>
            <Button
              variant="outline"
              className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-white/5"
            >{t('task_modal.cancel_button')}</Button>
          </DialogClose>
          <DialogClose>
            <Button type="submit">{t('task_modal.submit_button_create')}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
