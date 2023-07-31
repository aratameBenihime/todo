"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
export default function Navbar(props: any) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const deleteList = async () => {
    const url = process.env.NEXT_PUBLIC_APP_URL + `/api/list`;
    try {
      await fetch(url, {
        method: "DELETE",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listName: props.listName,
          listType: props.listType,
        }),
      });
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const showMenuHandler = () => {
    console.log("working");

    ref.current?.classList.toggle("displayMenu");
  };
  return (
    <div className="px-[10px] py-[10px] bg-white z-[500] flex flex-row justify-between items-center shadow-sm fixed top-[-1px] left-0 w-full">
      <Link href="/">
        <Image
          priority
          src="/assets/svg/arrow-back.svg"
          alt="Back To Home"
          width={20}
          height={20}
        ></Image>
      </Link>

      <div>
        <h1 className="text-[21px] font-medium">{props.listName}</h1>
      </div>
      <button onClick={showMenuHandler}>
        <Image
          src="/assets/svg/more_options.svg"
          alt="More Options"
          height={25}
          width={25}
        />
      </button>
      <div className="hiddenMenu" ref={ref}>
        <h1
          className="font-bold"
          onClick={() => {
            deleteList();
          }}
        >
          Delete List
        </h1>
      </div>
    </div>
  );
}
