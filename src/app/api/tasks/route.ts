import { NextRequest, NextResponse } from "next/server";
import connectToDb from "@/lib/mongodb";
import Task from "@/models/task-model";
import { ObjectId } from "mongodb";
export async function POST(req: NextRequest) {
  const { task, userID, listName } = await req.json();
  const marked = false;
  await connectToDb();
  try {
    await Task.create({ task, userID, listName, marked });
    return NextResponse.json({ message: "Task Created", status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: "Task Cannot be added",
      status: 501,
    });
  }
}

export async function PUT(req: NextRequest) {
  const { id, marked } = await req.json();

  const newObjectID = new ObjectId(id);
  await connectToDb();
  try {
    await Task.updateOne(
      { _id: newObjectID },
      {
        $set: {
          marked: !marked,
        },
      }
    );
    return NextResponse.json({
      message: "Task Updated Successfully",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Task Cannot be updated",
      status: 500,
    });
  }
}
