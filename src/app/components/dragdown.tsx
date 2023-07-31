import { useState } from "react";

export default function DropDown({ test }: any) {
  const [myState, setMyState] = useState<string>("");
  const handler = (event: any) => {
    test.selectedOption = "Hello";

    setMyState(event.target.value);
  };
  return (
    <div>
      <p>{myState}</p>
      <input
        type="text"
        className="focus:outline-none border-b"
        onChange={handler}
      />
    </div>
  );
}
