import { useLayoutEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";

import customFetch from "src/utils/customFetch";
import { Wrapper } from "src/assets/wrappers/StatsContainer";
import { StatItem } from "src/components";

const Admin = () => {
  const navigate = useNavigate();

  const {
    data: appStats,
    status,
    isError,
  } = useQuery({
    queryKey: ["app-stats"],
    queryFn: async (): Promise<{ users: number; jobs: number }> => {
      const { data } = await customFetch.get("/users/admin/app-stats");
      return data;
    },
    retry: 0,
  });

  useLayoutEffect(() => {
    if (isError) {
      toast.error("You're not authorized to view this page", {
        position: "top-center",
      });
      navigate("/dashboard");
    }
  }, [isError]);

  if (status === "success") {
    const { jobs, users } = appStats;

    return (
      <Wrapper>
        <StatItem
          title="current users"
          count={users}
          color="#e9b949"
          bcg="#fcefc7"
          icon={<FaSuitcaseRolling />}
        />
        <StatItem
          title="current jobs"
          count={jobs}
          color="#647acb"
          bcg="#e0e8f9"
          icon={<FaCalendarCheck />}
        />
      </Wrapper>
    );
  }
  return <></>;
};
export default Admin;
