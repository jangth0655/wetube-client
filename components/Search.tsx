import { motion, Variants } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { HiSearch } from "react-icons/hi";
import { User, Video } from "../libs/interface";
import BASE_URL from "../server";

interface SearchForm {
  keyword: string;
  error?: string;
}

export interface VideoWithUser extends Video {
  user: User;
}

interface SearchMutation {
  ok: boolean;
  error?: string;
  videos: VideoWithUser[];
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
  const [searchResponse, setSearchResponse] = useState<SearchMutation>({
    ok: false,
    videos: [],
    error: undefined,
  });
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

  const fetchKeyword = async (keyword: string) => {
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
  };

  const onValid = async ({ keyword }: SearchForm) => {
    const { data, error, loading } = await fetchKeyword(keyword);
    if (loading) return;
    if (data) {
      setKeyword(keyword);
      setSearchResponse({
        ok: true,
        error,
        videos: data,
      });
    }
    setError("error", { message: error });
    return;
  };

  useEffect(() => {
    if (searchResponse.ok) {
      router.push({
        pathname: "/search",
        query: {
          videos: JSON.stringify(searchResponse.videos),
          keyword,
        },
      });
    }
  }, [keyword, router, searchResponse.ok, searchResponse.videos]);

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
