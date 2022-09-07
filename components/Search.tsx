import { motion, Variants } from "framer-motion";
import { useState } from "react";

import { HiSearch } from "react-icons/hi";

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
  const [active, setActive] = useState(false);
  const onSearch = () => {
    setActive((prev) => !prev);
  };
  return (
    <form className="flex items-center relative md:w-80">
      <motion.input
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
