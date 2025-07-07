"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";


export default function Navbar() {
  const pathname = usePathname();





 

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="flex-1">
        <Link href="/dashboard" className="text-xl font-bold text-primary">
          Sistema de Ponto
        </Link>
      </div>

      <div className="flex gap-2">
        <Link
          href="/dashboard"
          className={clsx("btn btn-ghost text-sm", {
            "text-primary font-semibold": pathname === "/dashboard",
          })}
        >
          Dashboard
        </Link>

        <Link
          href="/espelho"
          className={clsx("btn btn-ghost text-sm", {
            "text-primary font-semibold": pathname === "/espelho",
          })}
        >
          Espelho
        </Link>

        <Link href="/login" className="btn btn-ghost text-error text-sm">
          Sair
        </Link>
      </div>
    </div>
  );
}
