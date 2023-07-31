"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
type workspace = {
  route: string;
  title: string;
  list: any[];
};
export default function Workspace(props: workspace) {
  const caretRef = useRef<HTMLImageElement>(null);
  const [hiddenItems, setHiddenItems] = useState<boolean>(false);
  const rotateCaretImage = () => {
    caretRef.current?.classList.toggle("rotate-90");
    setHiddenItems((prevValue) => !prevValue);
  };

  return (
    <div>
      <div className="mt-3 flex flex-row items-center">
        <Image
          className="hover:cursor-pointer"
          src="/assets/svg/caret-right.svg"
          alt={`Display ${props.title} list`}
          height={10}
          width={10}
          ref={caretRef}
          priority
          onClick={rotateCaretImage}
        />
        <h1 className="font-bold text-[#4c4c4c] ml-3 text-[17px]">
          {props.title}
        </h1>
      </div>
      {hiddenItems && (
        <div className="mt-[1rem]">
          {props.list.map((listName: any, key: number) => {
            return (
              <div
                className="flex flex-row items-center px-[18px] ml-[24px] rounded-sm h-[31px] mt-[17px]"
                key={key}
              >
                <Link
                  href={`/list/${props.route}/${listName.title}`}
                  key={key}
                  className="flex-1"
                >
                  <p
                    key={key}
                    className="text-[16px] text-[#434343] font-medium "
                  >
                    {listName.title}
                  </p>
                </Link>
                <Image
                  src="/assets/svg/angle-right.svg"
                  alt="list options"
                  height={10}
                  width={10}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
