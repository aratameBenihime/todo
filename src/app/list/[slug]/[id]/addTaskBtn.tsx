"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  listName: string;
  listType: string;
  listData: [];
};

export default function AddTaskButton(props: Props) {
  const router = useRouter();

  const [taskText, setTaskText] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setTaskText(value);
    setIsValid(value.trim().length > 0);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isValid) {
      const url = process.env.NEXT_PUBLIC_APP_URL + `/api/tasks`;

      const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: taskText,
          userID: "kaustavkakoty4@gmail.com",
          listName: props.listName,
          listType: props.listType,
        }),
      });

      //New Task Added Successfully

      if (response.ok) {
        router.refresh();
      }
    }

    setTaskText(""); // Clear the input after submission
  };

  return (
    <>
      <div className="fixed left-0 bottom-0 w-full p-3 bg-white">
        <form onSubmit={handleSubmit}>
          <div
            className={`flex p-3 rounded-md bg-[#e4e4e4] ${
              isValid ? "" : "border-red-500"
            }`}
          >
            <input
              type="text"
              className="h-[36px] flex-1 focus:outline-none placeholder-font-sm bg-transparent placeholder-gray-500 text-gray-900 font-medium text-lg"
              placeholder="Add Your Task"
              value={taskText}
              onChange={handleInputChange}
            />
            <button type="submit" className="ml-[24px]">
              <img
                src="/assets/svg/send.svg"
                alt="Add Task"
                className="h-[21px]"
              />
            </button>
          </div>
          {!isValid && (
            <p className="text-red-500 mt-2 text-sm">
              Please enter at least one non-whitespace character.
            </p>
          )}
        </form>
      </div>
    </>
  );
}
