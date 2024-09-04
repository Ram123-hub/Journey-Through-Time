
import connect from "@/lib/dbconfig/dbconfig";
import { Invention } from "@/lib/models/inventionForm";
import { uploadImage } from "@/lib/uploadImage/uploadimage";
import { NextRequest, NextResponse } from "next/server";

connect();

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const invention = formData.get("invention") as string;
    const inventor = formData.get("inventor") as string;
    const yearString = formData.get("year") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File | null;

    // Convert year to integer
    const year = parseInt(yearString, 10);

    // Validate form fields
    if (!invention || !inventor || !year || !description) {
      return NextResponse.json(
        {
          msg: "Invention, inventor, year, and description are required.",
        },
        { status: 400 }
      );
    }

    if (!image) {
      console.error("No image file found in form data");
      return NextResponse.json({ msg: "Image is required." }, { status: 400 });
    }

    // Upload image
    const data: any = await uploadImage(image, "inventionImages");

    if (!data || !data.secure_url || !data.public_id) {
      return NextResponse.json({ msg: "Failed to upload image." }, { status: 500 });
    }

    // Create a new invention document
    const newInvention = new Invention({
      invention,
      inventor,
      year,
      description,
      imageUrl: data?.secure_url,
      public_id: data?.public_id,
    });

    await newInvention.save();

    console.log(newInvention)

    return NextResponse.json(
      { msg: "New invention created successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { msg: "Error creating the invention." },
      { status: 500 }
    );
  }
};
