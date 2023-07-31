import { Navbar } from "@/app/components";
import TaskList from "./tasksList";
export default function Page({
  params,
}: {
  params: {
    id: string; // Gives the name of the list
    slug: string; // Gives the type of list specified
  };
}) {
  console.log("List name is: ", params.id);

  return (
    <main className="">
      <Navbar listName={params.id} listType={params.slug} />
      <TaskList listName={params.id} listType={params.slug} />
    </main>
  );
}
