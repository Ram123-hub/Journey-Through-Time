
import connect from "@/lib/dbconfig/dbconfig";
import { FamousFigures } from "@/lib/models/figureForm";
import { uploadImage } from "@/lib/uploadImage/uploadimage";
import { NextRequest, NextResponse } from "next/server";


connect()

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const year = formData.get("year") as string;
    const biography = formData.get("biography") as string;
    const image = formData.get("image") as File | null;

  

    if (!name || !year || !biography) {
      return NextResponse.json(
        {
          msg: "name, year,biography are required",
        },
        { status: 400 }
      );
    }
    if (!image) {
      console.error("No image file found in form data");
      return NextResponse.json({ msg: "Image is required." }, { status: 400 });
    }
    const data: any = await uploadImage(image, "FamousFiguresImages");

    if (!data || !data.secure_url || !data.public_id) {
      return NextResponse.json(
        { msg: "Failed to upload image." },
        { status: 500 }
      );
    }

    const newFamousFigures = new FamousFigures({
      name,
      year,
      biography,
      image_url: data?.secure_url,
      public_id: data?.public_id,
    });

    await newFamousFigures.save();
    //console.log(newFamousFigures);
    return NextResponse.json(
      {
        msg: "Famous figure created successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      {
        msg: "Famous figure are not created",
      },
      { status: 500 }
    );
  }
};
