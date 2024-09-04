
import connect from "@/lib/dbconfig/dbconfig";
import { FamousFigures } from "@/lib/models/figureForm";
import { NextResponse } from "next/server";


connect()
export const GET = async () => {
  try {
    const famousFigures = await FamousFigures.find();
    //console.log(famousFigures);
    return NextResponse.json( famousFigures , { status: 200 });
  } catch (error: any) {
    console.error('Failed fetching famous figures')
    return NextResponse.json(
      { error: "Failed fetching famous figures" },
      { status: 500 }
    );
  }
};
