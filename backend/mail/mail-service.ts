import "server-only";
import { sendMail, type MailAttachment } from "./mailer";
import {
  renderContactEmail,
  renderPqrsEmail,
  renderParticipateEmail,
} from "./templates";
import type { SendRequestFormType } from "@/domain/contact";
import type { SubmitPqrsFormType } from "@/domain/pqrs";
import type { SubmitParticipateFormType } from "@/domain/participate";

const requireRecipient = (envKey: string): string => {
  const value = process.env[envKey];
  if (!value) {
    throw new Error(
      `Destinatario no configurado: define ${envKey} en el .env`
    );
  }
  return value;
};

export class MailService {
  public static async sendContactRequest(
    data: SendRequestFormType
  ): Promise<void> {
    await sendMail({
      to: requireRecipient("MAIL_TO_CONTACT"),
      subject: `[Contacto] ${data.fullName}`,
      html: renderContactEmail(data),
      replyTo: data.email,
    });
  }

  public static async sendPqrsRequest(
    data: SubmitPqrsFormType,
    attachments: MailAttachment[] = []
  ): Promise<void> {
    await sendMail({
      to: requireRecipient("MAIL_TO_PQRS"),
      subject: `[PQRS] ${data.requestType} — ${data.fullName}`,
      html: renderPqrsEmail(data),
      replyTo: data.email,
      attachments,
    });
  }

  public static async sendParticipateRequest(
    data: SubmitParticipateFormType,
    attachments: MailAttachment[] = []
  ): Promise<void> {
    await sendMail({
      to: requireRecipient("MAIL_TO_PARTICIPATE"),
      subject: `[Participa] ${data.profileType} — ${data.fullName}`,
      html: renderParticipateEmail(data),
      replyTo: data.email,
      attachments,
    });
  }
}
