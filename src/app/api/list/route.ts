import { NextRequest, NextResponse } from "next/server";
import connectToDb from "@/lib/mongodb";
import List from "@/models/list-model";
import Task from "@/models/task-model";
export async function POST(req: NextRequest) {
  const listType = await req.json();
  await connectToDb();
  try {
    const myList = await List.find({
      userID: "kaustavkakoty4@gmail.com",
      listType: listType,
    });
    return NextResponse.json({
      message: "List retrieved",
      status: 201,
      data: myList,
    });
  } catch (error) {
    return NextResponse.json({
      message: "List Cannot be retrieved",
      status: 501,
    });
  }
}

export async function DELETE(req: NextRequest) {
  const { listType, listName } = await req.json();

  const filter = {
    listType: listType,
    title: listName,
  };

  const filter2 = {
    userID: "kaustavkakoty4@gmail.com",
    listName: listName,
  };

  await connectToDb();
  try {
    await List.deleteOne(filter);
    await Task.deleteMany();
    return NextResponse.json({
      message: "List Deleted Successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Unexpected Error Ocuured. List Cannot be Deleted",
      status: 500,
    });
  }
}
