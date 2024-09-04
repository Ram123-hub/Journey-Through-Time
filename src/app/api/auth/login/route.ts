
import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/validators/authSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/lib/validators/errorReporter";
import bcrypt from "bcryptjs";
import { User } from "@/lib/models/user";
import connect from "@/lib/dbconfig/dbconfig";

connect();

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const validator = vine.compile(loginSchema);
    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(body);
    
    const user = await User.findOne({ email: output.email });
    
    if (user) {
      const isPasswordValid = bcrypt.compareSync(output.password!, user.password);
      if (isPasswordValid) {
        return NextResponse.json(
          { message: "User logged in" },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { errors: "Invalid email or password" },
        { status: 401 } // Unauthorized
      );
    }
    
    return NextResponse.json(
      { errors: "No account found with email" },
      { status: 404 } // Not Found
    );
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { errors: error.messages },
        { status: 400 } // Bad Request
      );
    }
    console.error(error); // Log the error for debugging
    return NextResponse.json(
      { errors: "An unexpected error occurred" },
      { status: 500 } // Internal Server Error
    );
  }
};
