import { z } from "zod/v4";
import { NextResponse } from "next/server";
import { updateUserFormSchema } from "@/domain/user";
import { UserService } from "@/backend/services/user-service";
import { validateUser } from "@/backend/utilities/auth/validateUser";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const result = await validateUser();

    if (result instanceof NextResponse) {
      return result;
    }

    const { id } = await context.params;
    const user = await UserService.getUserById(id);
    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const result = await validateUser();

    if (result instanceof NextResponse) {
      return result;
    }

    const { id } = await context.params;
    const body = await request.json();
    const validatedBody = updateUserFormSchema.parse(body);
    const user = await UserService.updateUser(id, validatedBody);
    return NextResponse.json(user);
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
