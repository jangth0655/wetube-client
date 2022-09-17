import React, { useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion, Variants } from "framer-motion";

import { FaAngleLeft } from "react-icons/fa";
import { FaThList } from "react-icons/fa";

interface PageNavProps {
  children: React.ReactNode;
  title?: string;
}

const pageNavItem = ["profile", "edit", "home"];

const pageNavVar: Variants = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 1,
    transition: {
      type: "linear",
    },
  },
  exit: {
    scaleY: 0,
  },
};

const PageNav: React.FC<PageNavProps> = ({ title, children }) => {
  const [showingNav, setShowingNav] = useState(false);
  const router = useRouter();
  const userId = router.query.id;
  const onBack = () => {
    router.back();
  };

  const onShowNav = () => {
    setShowingNav((prev) => !prev);
  };

  const onGoPage = (navItem: string) => {
    switch (navItem) {
      case "profile":
        router.push(`${userId ? `/users/${userId}` : null}`);
        break;
      case "edit":
        router.push(`${userId ? `/users/${userId}/edit` : null}`);
        break;
      case "home":
        router.push("/");
    }
  };

  return (
    <section className="dark:text-zinc-50 text-zinc-700  max-w-3xl m-auto">
      <nav className="relative flex items-center p-3 pt-10 justify-between ">
        <div
          onClick={onBack}
          className="text-xl flex justify-center items-center cursor-pointer hover:text-orange-400 w-[33%]"
        >
          <FaAngleLeft />
        </div>
        <div className="flex justify-center items-center w-[33%]">
          <span className="font-bold text-xl">{title}</span>
        </div>
        <div
          onClick={onShowNav}
          className="flex justify-center items-center cursor-pointer w-[33%] relative"
        >
          <FaThList className="hover:text-orange-400" />
          <AnimatePresence>
            {showingNav ? (
              <motion.div
                variants={pageNavVar}
                initial="initial"
                animate="animate"
                exit="exit"
                className="z-30 absolute bg-gray-700 w-36 h-40 rounded-xl right-0 left-0 m-auto top-6 space-y-2 flex flex-col justify-center items-center origin-top-right"
              >
                {pageNavItem.map((nav) => (
                  <div
                    key={nav}
                    className="w-full justify-center flex items-center py-2"
                  >
                    <span
                      onClick={() => onGoPage(nav)}
                      className="uppercase font-bold hover:text-teal-400 transition-all w-full flex justify-center items-center"
                    >
                      {nav}
                    </span>
                  </div>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </nav>

      <main
        onClick={() => setShowingNav(false)}
        className="pt-14 min-h-screen mb-6"
      >
        {children}
      </main>
    </section>
  );
};

export default PageNav;
