import { CreateDonationType } from "@/domain/donation";
import { DonationRepository } from "../db/repositories/donation-repository";

export class DonationService {
  public static async createDonation(
    donation: CreateDonationType
  ): Promise<void> {
    return DonationRepository.createDonation(donation);
  }
}
