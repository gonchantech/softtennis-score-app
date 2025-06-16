"use client";

import { ReactNode } from "react";
import { queryClient } from "@/lib/reactQuery";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Notifications } from "@/components/notifications";

import { MatchMetaProvider } from "@/context/match-meta";
import { MatchStateProvider } from "@/context/match-state";
import { NotificationProvider } from "@/context/notifications/notification-provider";

import { IS_DEVELOPMENT } from "@/config/constants";

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <NotificationProvider>
      <MatchMetaProvider>
        <MatchStateProvider>
          <QueryClientProvider client={queryClient}>
            {IS_DEVELOPMENT && <ReactQueryDevtools initialIsOpen={false} />}
            <Notifications />
            {children}
          </QueryClientProvider>
        </MatchStateProvider>
      </MatchMetaProvider>
    </NotificationProvider>
  );
};
