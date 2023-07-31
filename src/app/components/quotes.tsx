"use client";
type quote = {
  author: string;
  quote: string;
};
import { useEffect, useState } from "react";
import { motivationalQuotes } from "./constants";

export default function Quotes() {
  const [quoteSelected, setQuoteSelected] = useState<quote>();

  useEffect(() => {
    const index = Math.floor(Math.random() * 30);
    setQuoteSelected(motivationalQuotes[index]);
  }, []);

  return (
    <div className="padding_horizontal w-full flex justify-center items-center">
      {quoteSelected && (
        <p className="inline-block px-3 py-1 align-middle text-[#f8f8ff] text-lg">
          {quoteSelected.quote} <span> {"-" + quoteSelected.author}</span>
        </p>
      )}
    </div>
  );
}
