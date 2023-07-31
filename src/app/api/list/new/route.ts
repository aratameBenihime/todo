import { NextRequest, NextResponse } from "next/server";
import connectToDb from "@/lib/mongodb";
import List from "@/models/list-model";

export async function POST(req: NextRequest) {
  const { title, userID, description, listType } = await req.json();
  await connectToDb();
  try {
    const newList = await List.create({
      title: title,
      userID: userID,
      description: description,
      listType: listType,
    });
    return NextResponse.json({
      message: "List retrieved",
      status: 201,
      data: newList,
    });
  } catch (error) {
    return NextResponse.json({
      message: "List Cannot be retrieved",
      status: 501,
    });
  }
}
