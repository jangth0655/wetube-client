import Image from "next/image";
import logo from "../public/image/logo/wetube-logo.png";
import { motion, useAnimation, useScroll, Variants } from "framer-motion";

import { FaUser } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { useRouter } from "next/router";

import { useEffect, useRef, useState } from "react";
import Search from "./Search";

interface LayoutProps {
  children: React.ReactNode;
}

const scrollVar: Variants = {
  top: {
    opacity: 0,
  },
  scroll: {
    opacity: 0.8,
  },
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const navRef = useRef<HTMLDivElement>(null);

  const scrollAnimate = useAnimation();
  const { scrollY } = useScroll();

  const onTop = () => {
    navRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    scrollY.onChange(() => {
      console.log(window.innerHeight);
      if (scrollY.get() < window.innerHeight / 2) {
        scrollAnimate.start("top");
      } else {
        scrollAnimate.start("scroll");
      }
    });
  }, [scrollAnimate, scrollY]);

  const onHome = () => {
    router.push("/");
  };

  return (
    <section className="">
      <nav
        ref={navRef}
        className="p-3 text-zinc-50 bg-zinc-900 flex justify-between items-center"
      >
        <div className="flex items-center space-x-2">
          <div onClick={onHome} className="relative w-8 h-8 cursor-pointer">
            <Image
              src={logo}
              layout="fill"
              objectFit="cover"
              alt=""
              placeholder="blur"
            />
          </div>
          <div className="uppercase font-bold">
            <span className="text-rose-500">we</span>
            <span>tube</span>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <Search />
          <div className="bg-zinc-200 rounded-full w-8 h-8 flex justify-center items-center text-zinc-600">
            <FaUser />
          </div>
        </div>
      </nav>

      <main className="max-w-4xl m-auto px-2 mt-24">{children}</main>
      <div className="flex justify-center items-center fixed bottom-4 right-4 flex-col space-y-4">
        <div className="flex justify-center items-center bg-rose-500 rounded-full text-zinc-50  transition-all hover:bg-rose-700 cursor-pointer p-[0.4rem] ">
          <FaVideo size="1rem" />
        </div>

        <motion.div
          onClick={onTop}
          variants={scrollVar}
          initial="top"
          animate={scrollAnimate}
          className="flex justify-center items-center bg-rose-500 rounded-full text-zinc-50  transition-all hover:bg-rose-700 cursor-pointer  p-[0.4rem]"
        >
          <FaArrowUp size="1rem" />
        </motion.div>
      </div>
    </section>
  );
};
export default Layout;
