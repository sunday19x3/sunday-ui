"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function DialogBasicExample() {
  return (
    <Dialog>
      <DialogTrigger className={cn(buttonVariants())}>
        Open Dialog
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className={cn(buttonVariants({ variant: "outline" }))}>
            Cancel
          </DialogClose>
          <DialogClose className={cn(buttonVariants({ variant: "destructive" }))}>
            Delete Account
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DialogConfirmExample() {
  return (
    <Dialog>
      <DialogTrigger className={cn(buttonVariants({ variant: "destructive" }))}>
        Delete Item
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Item</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this item? This action is
            irreversible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className={cn(buttonVariants({ variant: "outline" }))}>
            Cancel
          </DialogClose>
          <DialogClose className={cn(buttonVariants({ variant: "destructive" }))}>
            Delete
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DialogFormExample() {
  return (
    <Dialog>
      <DialogTrigger className={cn(buttonVariants())}>
        Edit Profile
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">Name</label>
            <input
              className="h-11 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              defaultValue="John Doe"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input
              className="h-11 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              defaultValue="john@example.com"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose className={cn(buttonVariants({ variant: "outline" }))}>
            Cancel
          </DialogClose>
          <DialogClose className={cn(buttonVariants())}>
            Save Changes
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
