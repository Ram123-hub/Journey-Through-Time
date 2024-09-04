
import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "@/lib/validators/authSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/lib/validators/errorReporter";
import bcrypt from "bcryptjs";
import { User } from "@/lib/models/user";
import connect from "@/lib/dbconfig/dbconfig";

// Ensure the database connection is established
connect();

interface UserPayload {
  name:string,
  email:string,
  password:string,
  avatar?:string,

}

export const POST = async (request: NextRequest) => {
  try {
    // Parse the request body
    const body :UserPayload = await request.json();

    // Compile and validate the input using Vine.js schema
    const validator = vine.compile(signupSchema);
    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(body);

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email: output.email });
    if (existingUser) {
      return NextResponse.json(
        {
          status: 400,
          errors: {
            email: "check your credentials",
          },
        },
        { status: 400 }  // Fix the status code to 400 for bad request
      );
    }

    // Hash the password and create a new user
    const salt = bcrypt.genSaltSync(10);
    output.password = bcrypt.hashSync(output.password, salt);
    await User.create(output);

    // Respond with success message
    return NextResponse.json(
      { status: 200, message: "Account created successfully. Please login to your account" },
      { status: 200 }
    );
  } catch (error) {
    // Handle validation errors specifically
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors: error.messages },
        { status: 400 }
      );
    }

    // Handle any other errors
    console.error("Error during signup:", error);
    return NextResponse.json(
      { status: 500, error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
