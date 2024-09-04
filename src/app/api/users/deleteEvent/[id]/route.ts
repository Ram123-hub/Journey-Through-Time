// app/api/users/deleteEra/[id]/route.ts

import connect from "@/lib/dbconfig/dbconfig";
import { Timeline } from "@/lib/models/timelineForm";
import { NextResponse } from "next/server";

connect();

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    if (!id) throw new Error("ID is required");

    const result = await Timeline.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ error: "Era not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Era deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting era", error);
    return NextResponse.json({ error: "Failed to delete era" }, { status: 500 });
  }
}