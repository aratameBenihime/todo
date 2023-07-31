import Image from "next/image";
import { CurrentDate, Quotes } from "../components";
export default function Hero() {
  return (
    <div className="relative">
      <Image
        priority
        height={350}
        width={350}
        src="https://source.unsplash.com/random?nature&orientation=landscape&fit=crop&crop=entropy&fm=jpg&dpr=2"
        alt="Cover Image"
        className=" h-[50vh] min-h-[354px] w-full object-cover
                            rounded-bl-[1.5rem] rounded-br-[1.5rem] "
      />
      <div>
        <CurrentDate />
      </div>
      <div
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full backdrop-brightness-[0.4] h-[calc(100%)] flex 
                            rounded-bl-[1.5rem] rounded-br-[1.5rem] 
            "
      >
        <Quotes />
      </div>
    </div>
  );
}
