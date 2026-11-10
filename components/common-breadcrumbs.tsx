
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface BreadcrumbsProps {
  labels?: Record<string, string>;
}

const Breadcrumbs = ({ labels = {} }: BreadcrumbsProps) => {
  const pathname = usePathname();

  const segments = pathname
    .split('/')
    .filter(Boolean);

  const formatLabel = (segment: string) => {
    if (labels[segment]) {
      return labels[segment];
    }

    return decodeURIComponent(segment)
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  if(pathname === "/"){
    return null
  }
  return (
    <div className="mx-auto container px-10 bg-amber-100 py-2 mb-2 flex items-center gap-2 text-sm text-muted-foreground">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const href = '/' + segments
            .slice(0, index + 1)
            .join('/');

          const isLast = index === segments.length - 1;

          return (
            <span key={href} className="flex items-center gap-2">
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>
                    {formatLabel(segment)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink>
                    <Link href={href}>
                      {formatLabel(segment)}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
