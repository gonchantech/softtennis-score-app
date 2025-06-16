"use client";

import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Loading } from "@/components/loading";
import { useUser } from "../../api";

export type ProtectedProps = {
  children: ReactNode;
};

export const Protected = ({ children }: ProtectedProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useUser();

  useEffect(() => {
    if (!user.data && !user.isLoading) {
      router.replace(`/auth/login?redirect=${pathname}`);
    }
  }, [user.data, user.isLoading, pathname, router]);

  if (user.isLoading) {
    return <Loading />;
  }

  if (!user.data) {
    return null;
  }

  return <>{children}</>;
};
