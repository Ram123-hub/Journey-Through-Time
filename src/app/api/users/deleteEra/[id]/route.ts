
import connect from "@/lib/dbconfig/dbconfig";
import { EraExploration } from "@/lib/models/eraExplorationForm";
import { NextResponse } from "next/server";

connect();

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    if (!id) throw new Error("ID is required");

    const result = await EraExploration.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ error: "Era not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Era deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting era", error);
    return NextResponse.json({ error: "Failed to delete era" }, { status: 500 });
  }
}
