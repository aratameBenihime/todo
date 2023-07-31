export default function CurrentDate() {
  function getFormattedDate(): string {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
    };
    const formattedDate: string = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  const today: string = getFormattedDate();

  return (
    <div className=" fixed top-[-1px] left-0 w-full backdrop-blur-[16px] z-[100] ">
      <div className=" flex items-center p-[10px]">
        <div className="flex-1">
          <h1 className="font-medium text-[17px] text-white">{today}</h1>
          <p className="text-[19px] mt-[1px] text-white">Welcome Back</p>
        </div>
      </div>
    </div>
  );
}
