import { z } from "zod/v4";
import { NextResponse } from "next/server";
import { createUserSchema } from "@/domain/user";
import { PaginationRequest } from "@/domain/Pagination";
import { UserService } from "@/backend/services/user-service";
import { validateUser } from "@/backend/utilities/auth/validateUser";

export async function GET(request: Request) {
  try {
    const result = await validateUser();

    if (result instanceof NextResponse) {
      return result;
    }

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 0;
    const size = Number(searchParams.get("size")) || 10;

    const pRequest: PaginationRequest = {
      page,
      size,
    };

    const users = await UserService.getPaginatedUsers(pRequest);

    return NextResponse.json(users);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const result = await validateUser();

    if (result instanceof NextResponse) {
      return result;
    }

    const body = await request.json();
    const validatedBody = createUserSchema.parse(body);
    const user = await UserService.createUser(validatedBody);

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
