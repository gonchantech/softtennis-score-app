"use client";

import { useQuery } from "@tanstack/react-query";

import { createClient } from "@/lib/supabase/client";

import { AuthUser } from "../types";

export const getAuthUser = async (): Promise<AuthUser | null> => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return {
    id: user.id,
    email: user.email || "",
  };
};

export const useUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["auth-user"],
    queryFn: () => getAuthUser(),
  });

  return { data, isLoading };
};
