'use client';

import Link from 'next/link';
import style from '../style/header.module.css';
import { usePathname } from 'next/navigation';
import { NAVIGATION_LIST } from '../const';

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className={style.navigation}>
      {NAVIGATION_LIST.map((nav) => {
        const isActive = pathname === nav.url;

        return (
          <Link
            key={nav.label}
            href={nav.url}
            style={{ textDecoration: 'none' }}
          >
            <div className={isActive ? style.active : style.inactive}>
              {nav.label}
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
