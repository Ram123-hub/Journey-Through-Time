
import connect from "@/lib/dbconfig/dbconfig";
import { EraExploration } from "@/lib/models/eraExplorationForm";
import { uploadImage } from "@/lib/uploadImage/uploadimage";
import { NextRequest, NextResponse } from "next/server";



connect();
export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;
    const image = formData.get("image") as File | null;

    
    if (!name || !description) {
      return NextResponse.json({ msg: "name  and description are required" }, { status: 400 });
    }

    if (!image) {
      console.error("No image file found in form data");
      return NextResponse.json({ msg: "Image is required" }, { status: 400 });
    }

    // Upload image
    const data: any = await uploadImage(image, "EraExplorationImage");
    if (!data || !data.secure_url || !data.public_id) {
      return NextResponse.json({ msg: "Failed to upload image" }, { status: 500 });
    }

    // Create and save new timeline entry
    const newEra = new EraExploration({
      name,
      description,
      link,
      image_url: data.secure_url,
      public_id: data.public_id,
    });

    await newEra.save();

    // Log new timeline
    console.log("New Timeline", newEra);

    return NextResponse.json(
      { msg: "New Era created successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error during creating Era:", error.message);
    return NextResponse.json(
      { msg: "Error in creating an Era", error: error.message },
      { status: 500 }
    );
  }
};
