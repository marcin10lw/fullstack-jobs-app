import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { AiOutlinePlus } from "react-icons/ai";

import { useUser } from "./DashboardLayout";
import { UpdatedUser, updateUserSchema } from "src/models/User";
import { Wrapper } from "src/assets/wrappers/DashboardFormPage";
import { FormRow, SubmitButton } from "src/components";
import customFetch from "src/utils/customFetch";
import { CustomAxiosError } from "src/types";
import errorMessage from "src/utils/errorMessage";

const Profile = () => {
  const { user } = useUser();
  const qc = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (user: FormData) =>
      customFetch.patch("/users/update-user", user),
    onSuccess: () => {
      qc.invalidateQueries(["user"]);
      toast.success("User updated!");
    },
    onError: (error: CustomAxiosError) => {
      errorMessage(error, "Could not update user");
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
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
    const formData = new FormData();
    const userEntries = Object.entries(user);

    userEntries.forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (!user.avatar) {
      formData.delete("avatar");
    }

    mutate(formData);
  };

  return (
    <Wrapper>
      <form
        className="form"
        onSubmit={handleSubmit(onFormSubmit)}
        noValidate
        encType="multipart/form-data"
      >
        <h4 className="form-title">profile</h4>

        <div className="user-info">
          <Controller
            control={control}
            name={"avatar"}
            render={({ field }) => {
              return (
                <div className="avatar-container">
                  <label htmlFor="avatar" className="avatar-label">
                    <img
                      src={
                        field.value && field.value.type.includes("image/")
                          ? URL.createObjectURL(field.value)
                          : user.avatar
                      }
                      alt="user avatar"
                    />

                    <div className="avatar-overlay">
                      <AiOutlinePlus />
                    </div>
                  </label>

                  <input
                    onChange={({ target }) => {
                      if (target.files) {
                        field.onChange(target.files[0]);
                      }
                    }}
                    type="file"
                    id="avatar"
                    className="avatar-input"
                    accept="image/*"
                  />
                  {errors.avatar && (
                    <p className="form-error avatar-info">
                      {errors.avatar.message}
                    </p>
                  )}
                </div>
              );
            }}
          />

          <div className="user-name">Hello, {user.name}!</div>
        </div>

        <div className="form-center">
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

          <SubmitButton isLoading={isLoading} isFormBtn />
        </div>
      </form>
    </Wrapper>
  );
};
export default Profile;
