
import connect from "@/lib/dbconfig/dbconfig";
import { Timeline } from "@/lib/models/timelineForm";
import { NextResponse } from "next/server";

connect()

export const GET = async () => {
  try {
    const timeline = await Timeline.find().sort({year:1});
    //console.log(timeline);
    return NextResponse.json(timeline, { status: 200 });
  } catch (error: any) {
    console.error("Failed fetching timelines");
    return NextResponse.json(
      { error: "Failed fetching timelines" },
      { status: 500 }
    );
  }
};
