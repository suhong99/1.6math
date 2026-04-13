'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVIGATION_LIST } from '../const';

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1">
      {NAVIGATION_LIST.map((nav) => {
        const isActive = pathname === nav.url;

        return (
          <Link
            key={nav.label}
            href={nav.url}
            className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              isActive
                ? 'text-amber-600 bg-amber-50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {nav.label}
            {isActive && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-amber-500 rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
