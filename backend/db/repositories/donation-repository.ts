import { db } from "../config";
import { donations } from "../schema";
import { CreateDonationType } from "@/domain/donation";
import { ErrorHandler_Repository } from "./ErrorHanlder";
import { RepositoryErrorOrigin, RepositoryErrorType } from "@/domain/Errors";

const errorHandler = new ErrorHandler_Repository(
  RepositoryErrorOrigin.DONATIONS
);

export class DonationRepository {
  public static async createDonation(
    donation: CreateDonationType
  ): Promise<void> {
    try {
      await db
        .insert(donations)
        .values({
          email: donation.email,
          phone: donation.phone,
          idType: donation.idType,
          fullName: donation.fullName,
          idNumber: donation.idNumber,
          personType: donation.personType,
          description: donation.description,
          donateValue: donation.donateValue,
          donatioType: donation.donatioType,
          anonymousDonation: donation.anonymousDonation,
        })
        .returning();

      return;
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.CREATE, error);
    }
  }
}
