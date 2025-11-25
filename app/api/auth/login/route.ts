import { z } from "zod/v4";
import { NextResponse } from "next/server";
import { loginFormSchema } from "@/domain/auth";
import { AuthService } from "@/backend/services/auth-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedBody = loginFormSchema.parse(body);
    const response = await AuthService.loginUser(validatedBody);

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: z.treeifyError(error) },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
