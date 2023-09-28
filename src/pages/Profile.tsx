import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { useUser } from "./DashboardLayout";
import { UpdatedUser, updateUserSchema } from "src/models/User";
import { Wrapper } from "src/assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "src/components";
import customFetch from "src/utils/customFetch";

const Profile = () => {
  const { user } = useUser();
  const qc = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (user: UpdatedUser) =>
      customFetch.patch("/users/update-user", user),
    onSuccess: () => {
      qc.invalidateQueries(["user"]);
      toast.success("User updated!");
    },
    onError: () => {
      toast.error("Could not update user");
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdatedUser>({
    defaultValues: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    resolver: zodResolver(updateUserSchema),
  });

  const onFormSubmit = (user: UpdatedUser) => {
    mutate(user);
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <h4 className="form-title">update user</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="image" className="form-label">
              Select image (max 0.5 MB)
            </label>
            <input
              type="file"
              id="image"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>

          <FormRow
            type="text"
            name="name"
            labelText="name"
            register={register("name")}
            error={errors.name}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            register={register("lastName")}
            error={errors.lastName}
          />
          <FormRow
            type="email"
            name="email"
            labelText="email"
            register={register("email")}
            error={errors.email}
          />
          <FormRow
            type="text"
            name="location"
            labelText="location"
            register={register("location")}
            error={errors.location}
          />

          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-block form-btn"
          >
            {isLoading ? "Submitting" : "Submit"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Profile;
