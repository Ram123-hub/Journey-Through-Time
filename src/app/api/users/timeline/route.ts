
import connect from "@/lib/dbconfig/dbconfig";
import { Timeline } from "@/lib/models/timelineForm";
import { uploadImage } from "@/lib/uploadImage/uploadimage";
import { NextRequest, NextResponse } from "next/server";



connect();
export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const yearString = formData.get("year") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;
    const image = formData.get("image") as File | null;
   
    const year = parseInt(yearString, 10);
   

    if (!year || !link || !title || !description) {
      return NextResponse.json({ msg: "Title and description are required" }, { status: 400 });
    }

    if (!image) {
      console.error("No image file found in form data");
      return NextResponse.json({ msg: "Image is required" }, { status: 400 });
    }

    // Upload image
    const data: any = await uploadImage(image, "timelineImage");
    if (!data || !data.secure_url || !data.public_id) {
      return NextResponse.json({ msg: "Failed to upload image" }, { status: 500 });
    }

    // Create and save new timeline entry
    const newTimeline = new Timeline({
      year,
      title,
      description,
      link,
      image_url: data?.secure_url,
      public_id: data?.public_id,
    });

    await newTimeline.save();
    console.log(newTimeline)

    // Log new timeline
    // console.log("New Timeline", newTimeline);

    return NextResponse.json(
      { msg: "New Timeline created successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error creating timeline:", error.message);
    return NextResponse.json(
      { msg: "Error in creating a timeline", error: error.message },
      { status: 500 }
    );
  }
};
