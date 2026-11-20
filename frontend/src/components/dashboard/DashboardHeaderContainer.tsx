"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import { useFieldOverview } from "@/hooks/useFieldOverview";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { userService } from "@/services/user.service";
import { User } from "@/types/user";


export default function DashboardHeaderContainer() {
  const { overview } = useFieldOverview();
  const { user } = useAuth();
  const { unreadCount } = useNotifications();
  const [users, setUsers] = useState<User[]>([]);

  
  const { fieldCounts, stageCounts, stages } = useMemo(() => {
    const planted = overview.filter((i) => i.crop).length;
    const counts: Record<string, number> = {};
    for (const item of overview) {
      const stage = item.crop?.actualGrowthStage;
      if (stage) counts[stage] = (counts[stage] ?? 0) + 1;
    }
    return {
      fieldCounts: { all: overview.length, planted, unplanted: overview.length - planted },
      stageCounts: counts,
      stages: Object.keys(counts),
    };
  }, [overview]);

   useEffect(() => {
    if (user?.role === 'ADMIN') {
      userService.getAll().then(setUsers).catch(() => setUsers([]));
    }
    }, []);

  return (
    <DashboardHeader
      stages={stages}
      fieldCounts={fieldCounts}
      stageCounts={stageCounts}
      alertCount={unreadCount}
      isAdmin={user?.role === "ADMIN"}
      userCount={users.length}
    />
  );
}