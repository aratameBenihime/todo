"use client";
import { useRouter } from "next/navigation";

export default function TaskItem(props: any) {
  const router = useRouter();
  console.log(props);

  const handleUpdate = async () => {
    const url = process.env.NEXT_PUBLIC_APP_URL + `/api/tasks`;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        id: props.data._id,
        marked: props.data.marked,
      }),
    });
    if (response.ok) {
      router.refresh();
    }
  };

  return (
    <div className="flex p-4 rounded-md shadow-sm mt-[1rem]" key={props.data._id}>
      <p className={`flex-1 ${props.data.marked === true ? "line-through" : ""}`}>
        {props.data.task}
      </p>
      <input
        checked={props.data.marked}
        type="checkbox"
        name=""
        id={props.data._id}
        onChange={handleUpdate}
      />
    </div>
  );
}
