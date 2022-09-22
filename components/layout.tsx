import Image from "next/image";
import logo from "../public/image/logo/wetube-logo.png";
import {
  motion,
  useAnimation,
  useScroll,
  Variants,
  AnimatePresence,
} from "framer-motion";
import { useRouter } from "next/router";

import { FaUser } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

import { useEffect, useRef, useState } from "react";
import Search from "./Search";
import useUser from "../libs/useUser";
import useMutation from "../libs/mutation";
import ScrollValue from "../libs/ScrollValue";
import cls from "../libs/cls";

interface LayoutProps {
  children: React.ReactNode;
  uploadPage?: boolean;
}

const scrollVar: Variants = {
  top: {
    opacity: 0,
  },
  scroll: {
    opacity: 0.8,
  },
};

const profileNavVar: Variants = {
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

interface LogOutMutation {
  ok: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, uploadPage }) => {
  const router = useRouter();
  const navRef = useRef<HTMLDivElement>(null);
  const [profileNav, setProfileNav] = useState(false);
  const { user } = useUser({ isPrivate: false });

  const scrollAnimate = useAnimation();
  const { scrollY } = useScroll();
  const { getScrollY } = ScrollValue();

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() < window.innerHeight / 2) {
        scrollAnimate.start("top");
      } else {
        scrollAnimate.start("scroll");
      }
    });
  }, [scrollAnimate, scrollY]);

  const [logout, { loading }] = useMutation<LogOutMutation>("logout");

  const showProfileNav = () => {
    setProfileNav((prev) => !prev);
  };

  const onTop = () => {
    navRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onHome = () => {
    router.push("/");
  };

  const onUpload = () => {
    router.push("/videos/upload");
  };

  const onProfile = (id?: string) => {
    if (!id) return;
    router.push(`users/${id}`);
  };

  const userLogout = () => {
    if (loading) return;
    logout({});
    router.replace("/login");
  };

  type UserState = "login" | "logout";
  const onLoginPage = (state: UserState) => {
    switch (state) {
      case "login":
        router.push("/login");
        break;
      case "logout":
        userLogout();
        break;
    }
  };

  return (
    <section>
      <nav
        ref={navRef}
        className={cls(
          "fixed w-full p-3 py-4 text-zinc-50  flex justify-between items-center "
        )}
      >
        <div
          className={cls(
            getScrollY > 150
              ? " dark:bg-zinc-900 bg-white shadow-lg shadow-black"
              : "",
            "absolute w-full h-full left-0 right-0"
          )}
        />
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
          <div className="uppercase font-bold z-50">
            <span className="text-rose-500">we</span>
            <span className="dark:text-white text-zinc-900">tube</span>
          </div>
        </div>

        <div className="flex items-center space-x-5 relative">
          <Search />
          <div onClick={showProfileNav}>
            {user?.avatarId ? (
              <div className="rounded-full w-8 h-8 relative cursor-pointer">
                <Image
                  className="rounded-full "
                  src={user.avatarId}
                  layout="fill"
                  objectFit="cover"
                  alt=""
                />
              </div>
            ) : (
              <div className="bg-zinc-200 rounded-full w-8 h-8 flex justify-center items-center text-zinc-600 cursor-pointer">
                <FaUser />
              </div>
            )}
          </div>
          <AnimatePresence>
            {profileNav ? (
              <motion.div
                variants={profileNavVar}
                initial="initial"
                animate="animate"
                exit="exit"
                className="z-20 absolute top-8 w-20 h-20 right-6 rounded-3xl dark:bg-gray-700 rounded-tr-none origin-top bg-zinc-100 text-zinc-800 shadow-black shadow-sm dark:text-zinc-50"
              >
                <div className="py-4 px-2 w-full h-full space-y-2 flex justify-center flex-col text-center cursor-pointer">
                  <span
                    onClick={() => onProfile(user?._id)}
                    className="block hover:text-teal-600 dark:hover:text-teal-400 transition-all"
                  >
                    Profile
                  </span>
                  {user ? (
                    <span
                      onClick={() => onLoginPage("logout")}
                      className="block hover:text-teal-600 dark:hover:text-teal-400transition-all"
                    >
                      Log Out
                    </span>
                  ) : (
                    <span
                      onClick={() => onLoginPage("login")}
                      className="block hover:text-teal-400 transition-all"
                    >
                      Log In
                    </span>
                  )}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </nav>

      <main
        onClick={() => setProfileNav(false)}
        className="max-w-4xl m-auto px-2 pt-32 pb-4 min-h-screen"
      >
        {children}
      </main>
      <div className="flex justify-center items-center fixed bottom-4 right-4 flex-col space-y-4">
        {uploadPage || !user ? null : (
          <div
            onClick={onUpload}
            className="flex justify-center items-center bg-rose-500 rounded-full text-zinc-50  transition-all hover:bg-rose-700 cursor-pointer p-[0.4rem]"
          >
            <FaVideo size="1rem" />
          </div>
        )}

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
