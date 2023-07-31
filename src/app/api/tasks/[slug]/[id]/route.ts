import { NextResponse, NextRequest } from "next/server";
import connectToDb from "@/lib/mongodb";
import Task from "@/models/task-model";

export async function GET(request: Request, res: NextResponse) {
  await connectToDb();
  const url = request.url;
  console.log("URL IS :", url);

  const splittedURLArray = url.split("/");
  const listName = splittedURLArray[splittedURLArray.length - 1];
  console.log("listname is ", listName);

  try {
    const data = await Task.find({
      listName: listName,
      userID: "kaustavkakoty4@gmail.com",
    });
    console.log(data);
    return NextResponse.json({ data: data });
  } catch (error) {
    return NextResponse.json({
      message: "Tasks Cannot be retrieved",
      status: 501,
    });
  }
}

export async function POST(req: NextRequest) {
  const { task, userID, listName } = await req.json();
  await connectToDb();
  try {
    await Task.create({ task, userID, listName });
    return NextResponse.json({ message: "Task Created", status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: "Task Cannot be added",
      status: 501,
    });
  }
}
