"use client";

import React from "react";
import { Slash } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export default function BreadCrumb() {
  const paths = usePathname();
  const pathNames = paths == "/" ? [""] : paths.split("/");

  if (pathNames.find((path) => path == "settings")) return null;

  const getPath = (index: number) => {
    let pathTmp = "/";
    for (let i = 1; i <= index; i++) {
      pathTmp += (pathTmp == "/" ? "" : "/") + pathNames[i];
    }
    return pathTmp;
  };

  const getPathName = (path: string) => {
    switch (path) {
      case "":
        return "Home";
      case "img":
        return "Image";
      default:
        return path;
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl overflow-hidden px-4 py-1 md:px-6 md:py-3">
      <Breadcrumb>
        <BreadcrumbList>
          {pathNames.map((path, index) => (
            <React.Fragment key={path}>
              <BreadcrumbItem>
                <BreadcrumbLink href={getPath(index)}>
                  {getPathName(path)}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index == pathNames.length - 1 ? null : (
                <BreadcrumbSeparator>
                  <Slash className="mx-1" />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
