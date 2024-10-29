"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { env } from "@/env";
import { useIsAuthed } from "@/hooks/global";
import { useAppStore } from "@/stores";

const AppAuth = () => {
  const pathname = usePathname();
  const updateConfig = useAppStore((state) => state.updateConfig);
  const isAuthed = useIsAuthed();

  useEffect(() => {
    if (isAuthed) return;

    if (env.NEXT_PUBLIC_API_KEY) {
      updateConfig({ apiKey: env.NEXT_PUBLIC_API_KEY });
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return null;
};

export default AppAuth;
