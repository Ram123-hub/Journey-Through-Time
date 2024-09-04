// app/api/users/deleteEra/[id]/route.ts

import connect from "@/lib/dbconfig/dbconfig";
import { Timeline } from "@/lib/models/timelineForm";
import { NextResponse } from "next/server";

connect();

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) {
      console.error("ID is required but not provided");
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    console.log(`Attempting to delete era with ID: ${id}`);

    const result = await Timeline.findByIdAndDelete(id);
    if (!result) {
      console.error(`Era with ID ${id} not found`);
      return NextResponse.json({ error: "Era not found" }, { status: 404 });
    }

    console.log(`Era with ID ${id} deleted successfully`);
    return NextResponse.json({ message: "Era deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting era", error.message || error);
    return NextResponse.json({ error: "Failed to delete era" }, { status: 500 });
  }
}
