import {
  DonationTypeOptions,
  economicDonationSchema,
  materialDonationSchema,
} from "@/domain/donation";
import { z } from "zod/v4";
import { NextResponse } from "next/server";
import { DonationService } from "@/backend/services/donation-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const isEconomicDonation =
      body?.donatioType === DonationTypeOptions.ECONOMICA;

    const validatedBody = isEconomicDonation
      ? economicDonationSchema.parse(body)
      : materialDonationSchema.parse(body);

    await DonationService.createDonation(validatedBody);

    return NextResponse.json({
      success: true,
      message: "Donation created successfully",
    });
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
