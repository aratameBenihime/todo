import { Hero, FloatingActionButton } from "./components";
import WorkSpaceList from "./components/workspace/workSpaceList";
export default function Home() {
  return (
    <>
      <Hero />
      <div className="padding_horizontal mt-10 pb-[45px]">
        <WorkSpaceList title="WORKSPACE" route="workspace" />
        <hr className="mt-3" />
        <WorkSpaceList title="PRIVATE" route="private" />
        <hr className="mt-3" />
        <WorkSpaceList title="SHARED" route="shared" />
      </div>
      <FloatingActionButton />
      <div className="h-[70px]"></div>
    </>
  );
}