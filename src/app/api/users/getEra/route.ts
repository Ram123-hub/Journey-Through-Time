
import connect from "@/lib/dbconfig/dbconfig";
import { EraExploration } from "@/lib/models/eraExplorationForm";
import { NextResponse } from "next/server";

connect();

export const GET = async () => {
  try {
    const eras = await EraExploration.find().lean(); // Use .lean() to get plain JavaScript objects
    return NextResponse.json(eras, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching Era", error);
    return NextResponse.json(
      { error: "Failed Fetching Era" },
      { status: 500 }
    );
  }
};
