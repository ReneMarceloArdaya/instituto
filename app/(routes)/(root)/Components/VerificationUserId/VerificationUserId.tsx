'use client';

import { useEffect } from "react";
import { useUserStore } from "@/lib/store/UserStore";
import { ExploreCourse } from "..";

type Props = {
  userId: string | null;
};

export function VerificationUserId({ userId }: Props) {
  const setUserId = useUserStore((state) => state.setUserId);

  useEffect(() => {
    setUserId(userId);
  }, [userId, setUserId]);

  return <ExploreCourse />;
}
