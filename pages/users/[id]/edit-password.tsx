import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import PageNav from "../../../components/PageNav";
import ErrorMessage from "../../../components/shared/ErrorMessage";
import Input from "../../../components/shared/Input";
import ShareButton from "../../../components/shared/shareButton";
import useMutation from "../../../libs/mutation";

interface EditPasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  error?: any;
}

interface EditPasswordMutation {
  ok: boolean;
}

const EditPassword = () => {
  const router = useRouter();
  const userId = router.query.id && router.query.id;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<EditPasswordForm>();

  const [editPassword, { data, error, loading }] =
    useMutation<EditPasswordMutation>(`users/${userId}/change-password`);

  const onValid = (data: EditPasswordForm) => {
    if (loading) return;
    if (error) {
      setError("error", { message: error });
    }
    editPassword(data);
  };

  const errorMessage =
    errors.confirmNewPassword?.message ||
    errors.currentPassword?.message ||
    errors.newPassword?.message ||
    errors.error?.message;

  useEffect(() => {
    if (data && data.ok) {
      router.push("/");
    }
    if (error) {
      setError("error", { message: error });
    }
  }, [data, router, error, setError]);

  return (
    <PageNav title="Change Password">
      <form
        onSubmit={handleSubmit(onValid)}
        className="space-y-8 w-[70%] m-auto mt-24"
      >
        {errorMessage && <ErrorMessage error={errorMessage} />}
        <div>
          <Input
            type="password"
            id="currentPassword"
            label="Current password"
            placeholder="current password"
            register={register("currentPassword", {
              required: "Current password is required.",
            })}
          />
        </div>
        <div>
          <Input
            type="password"
            id="newPassword"
            label="new Password"
            placeholder="new password"
            register={register("newPassword", {
              required: "New password is required.",
            })}
          />
        </div>
        <div>
          <Input
            type="password"
            id="confirmNewPassword"
            label="Confirm password"
            placeholder="confirm password"
            register={register("confirmNewPassword", {
              required: "Confirm password is required.",
            })}
          />
        </div>
        <div className="mt-14 flex justify-center items-center rounded-md p-1 bg-orange-400 hover:bg-orange-500 transition-all cursor-pointer">
          <ShareButton text="Change" loading={loading} />
        </div>
      </form>
    </PageNav>
  );
};

export default EditPassword;
