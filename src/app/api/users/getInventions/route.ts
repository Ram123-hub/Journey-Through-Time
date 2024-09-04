
import connect from "@/lib/dbconfig/dbconfig";
import { Invention } from "@/lib/models/inventionForm";
import { NextResponse } from "next/server";

connect();

export const GET = async () => {
  try {
    const inventions = await Invention.find();
    //console.log(inventions);
    return NextResponse.json(inventions, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching inventions");
    return NextResponse.json(
      {
        error: "Failed Fetching inventions",
      },
      {
        status: 500,
      }
    );
  }
};
