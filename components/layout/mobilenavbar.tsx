"use client";

import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import Sidebar from "./sidebar";

export default function MobileNavbar() {
  return (
    <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <h1 className="text-2xl font-bold text-white">
        Vyra
      </h1>

      <Sheet>
        <SheetTrigger className="text-white">
          <Menu size={28} />
        </SheetTrigger>

        <SheetContent
          side="left"
          className="p-0 bg-black border-white/10 w-72"
        >
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
}