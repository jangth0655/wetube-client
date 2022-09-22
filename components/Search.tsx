import { motion, Variants } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { HiSearch } from "react-icons/hi";

interface SearchForm {
  keyword: string;
  error?: string;
}

const searchVar: Variants = {
  initial: {
    scaleX: 0,
  },
  animate: (active: boolean) => ({
    scaleX: active ? 1 : 0,
    transition: {
      type: "linear",
    },
  }),
};

const Search: React.FC = () => {
  const router = useRouter();
  const [active, setActive] = useState(false);

  const [keyword, setKeyword] = useState("");

  const onSearch = () => {
    setActive((prev) => !prev);
  };
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SearchForm>();

  /*   const fetchKeyword = async (keyword: string) => {
    const result = await (
      await fetch(`${BASE_URL}/videos/search/${keyword}`, {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
    ).json();

    return {
      data: result.videos,
      loading: !result && !result.error,
      error: result.error,
    };
  }; */

  const onValid = (data: SearchForm) => {
    setKeyword(data.keyword);
  };

  useEffect(() => {
    if (keyword) {
      router.push({
        pathname: "/search",
        query: {
          keyword,
        },
      });
    }
  }, [keyword, router]);

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex items-center relative md:w-80"
    >
      <motion.input
        {...register("keyword", { required: true })}
        variants={searchVar}
        initial="initial"
        animate="animate"
        custom={active}
        type="text"
        className="rounded-md origin-top-right px-2 bg-transparent border-2 w-full placeholder:text-zinc-500 border-zinc-300"
        placeholder="Search"
      />
      <motion.div
        onClick={onSearch}
        className="flex justify-center items-center cursor-pointer absolute right-2"
      >
        <HiSearch size="1.2rem" />
      </motion.div>
    </form>
  );
};

export default Search;
