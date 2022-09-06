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
        await fetch(`${process.env.NEXT_PUBLIC_SERVER!}/${url}`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
      ).json();
      if (!response) {
        setValue((prev) => ({
          ...prev,
          error: response.error || "mutation Error",
        }));
      }
      setValue((prev) => ({ ...prev, data: response }));
      console.log("mutation", response);
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
