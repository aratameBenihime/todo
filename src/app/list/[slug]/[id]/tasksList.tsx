import AddTaskButton from "./addTaskBtn";
import TaskItem from "./taskItem";
type Props = {
  listName: string;
  listType: string;
};

export default async function TaskList(props: Props) {
  const getData = async () => {
    const url =
      process.env.NEXT_PUBLIC_APP_URL +
      `/api/tasks/${props.listType}/${props.listName}`;
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to Fetch Lists");
    }
    return res.json();
  };

  const response = await getData();
  const data = response?.data;

  return (
    <div className="mt-[60px] p-4">
      {data.map((data: any, index: number) => {
        return <TaskItem data={data}/>
      })}
      <AddTaskButton
        listName={props.listName}
        listType={props.listType}
        listData={data}
      />
    </div>
  );
}
