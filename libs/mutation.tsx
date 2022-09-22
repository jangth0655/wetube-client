import axios from "axios";
import { useState } from "react";

type MutationState<T> = {
  data?: T;
  loading?: boolean;
  error?: any;
};

type MutationResponse<T> = [(data: any) => void, MutationState<T>];

const useMutation = <T = any,>(url: string): MutationResponse<T> => {
  const [value, setValue] = useState<MutationState<T>>({
    data: undefined,
    loading: false,
    error: undefined,
  });

  const mutation = async (data: any) => {
    try {
      setValue((prev) => ({ ...prev, loading: true }));
      const response = await (
        await axios(
          `${
            process.env.NODE_ENV === "production"
              ? process.env.NEXT_PUBLIC_SERVER!
              : process.env.NEXT_PUBLIC_LOCAL_SERVER
          }/${url}`,
          {
            method: "POST",
            data: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
      ).data;
      if (response.error) {
        setValue((prev) => ({
          ...prev,
          error: response.error || "mutation Error",
        }));
      }

      setValue((prev) => ({ ...prev, data: response }));
    } catch (error) {
      setValue((prev) => ({
        ...prev,
        error: `Mutation Error ${error}`,
      }));
      return;
    } finally {
      setValue((prev) => ({ ...prev, loading: false }));
    }
  };

  return [mutation, { ...value }];
};
export default useMutation;
