"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./floatingActionButton.module.css";
import Link from "next/link";

export default function FloatingActionButton() {
  const floatingActionBtnRef = useRef<HTMLDivElement>(null);

  const [showItems, setShowItems] = useState<boolean>(false);

  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos > prevScrollPos) {
      if (floatingActionBtnRef.current) {
        floatingActionBtnRef.current.style.bottom = "-300px";
      }

      //  setDirection(false); // down
    } else if (prevScrollPos > currentScrollPos) {
      if (floatingActionBtnRef.current) {
        floatingActionBtnRef.current.style.bottom = "30px";
      }
    }
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const toggleAnimation = () => {
    setShowItems(!showItems);
  };

  return (
    <>
      <div
        ref={floatingActionBtnRef}
        className="fixed bottom-[30px] right-[30px] flex flex-col items-end z-[100] transition-all duration-500 ease-in-out"
      >
        <ul
          className={`hidden ${styles.item_list} ${showItems && styles.show}`}
        >
          <li>
            <Link href="/add/list" onClick={toggleAnimation}>
              New Task List
            </Link>
          </li>
          <li>View All</li>
          <li>Settings</li>
        </ul>
        <button
          className={`
            ${showItems ? styles.rotateAddButton : styles.revertRotateAddButton}
            h-[50px] w-[50px] flex flex-row justify-center items-center bg-[#48116d] rounded-full shadow-md
            transition-all duration-300 ease-in-out
          `}
          onClick={toggleAnimation}
        >
          <Image
            className="z-[1000] relative"
            alt="Add Task Button"
            height={20}
            priority
            src="/assets/svg/add.svg"
            width={20}
          />
        </button>
      </div>
      <div
        className={`h-screen w-full fixed inset-0 z-[-100] 
        ${showItems ? styles.displayCurtain : ""}`}
      ></div>
    </>
  );
}
