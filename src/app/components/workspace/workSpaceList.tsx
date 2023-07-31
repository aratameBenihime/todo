import Workspace from "./workspace";

type workspaceListType = {
  title: string;
  route: string;
};

export default async function WorkSpaceList(props: workspaceListType) {
  const url = process.env.NEXT_PUBLIC_APP_URL + "/api/list";
  
  async function retrievedList() {
    try {
      const res = await fetch(url, {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props.route),
      });
      if (!res.ok) {
        throw new Error("Failed to Fetch Lists");
      }
      return res.json();
    } catch (error) {
      console.log(
        "The following error occured while fetching your list\n",
        error
      );
    }
  }
  
  const response = await retrievedList();
  const data = response?.data;
  return (
    <div>
      <Workspace title={props.title} route={props.route} list={data} />
    </div>
  );
}
