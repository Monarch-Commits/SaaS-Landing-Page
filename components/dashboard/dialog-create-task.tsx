'use client';

import { useState, useTransition } from 'react';
import { createTask } from '@/app/actions/task';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CreateTaskDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* TRIGGER */}
      <DialogTrigger asChild>
        <button className="bg-primary text-primary-foreground flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium hover:opacity-90">
          <Plus className="h-4 w-4" />
          Create Task
        </button>
      </DialogTrigger>

      {/* MODAL */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Add a new task to your workspace
          </DialogDescription>
        </DialogHeader>

        {/* FORM */}
        <form
          action={(formData) => {
            startTransition(async () => {
              await createTask(formData);
              setOpen(false);
            });
          }}
          className="space-y-3"
        >
          {/* TITLE */}
          <input
            name="title"
            placeholder="Task title"
            className="border-border bg-background focus:ring-primary/20 w-full rounded-lg border p-2 text-sm outline-none focus:ring-2"
            required
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Description (optional)"
            className="border-border bg-background focus:ring-primary/20 w-full rounded-lg border p-2 text-sm outline-none focus:ring-2"
            rows={3}
          />

          {/* ASSIGN (IMPROVED UX) */}
          <Select name="assignedToId">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Assign to user" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Team Members</SelectLabel>

                <SelectItem value="unassigned">Unassigned</SelectItem>
                <SelectItem value="user_1">John Doe</SelectItem>
                <SelectItem value="user_2">Jane Smith</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* SUBMIT */}
          <Button
            type="submit"
            variant={'outline'}
            disabled={isPending}
            className="mt-2 flex w-full items-center justify-center rounded-xl bg-black py-2.5 text-sm font-medium text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? 'Creating task...' : 'Create task'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
