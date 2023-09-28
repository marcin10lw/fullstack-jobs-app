import { useLayoutEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import customFetch from "src/utils/customFetch";

const Admin = () => {
  const navigate = useNavigate();

  const {
    data: appStats,
    status,
    isError,
  } = useQuery({
    queryKey: ["app-stats"],
    queryFn: () => customFetch.get("/users/admin/app-stats"),
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

  if (status === "success")
    return (
      <div>
        <h1>admin page</h1>
      </div>
    );
};
export default Admin;
