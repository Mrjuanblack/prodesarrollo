import "server-only";
import nodemailer, { Transporter } from "nodemailer";

interface SmtpEnv {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
  fromName: string;
  fromAddress: string;
}

let cachedTransporter: Transporter | null = null;

const readSmtpEnv = (): SmtpEnv => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const secure = process.env.SMTP_SECURE;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const fromName = process.env.MAIL_FROM_NAME;
  const fromAddress = process.env.MAIL_FROM_ADDRESS;

  if (!host || !port || !user || !password || !fromAddress) {
    throw new Error(
      "SMTP no configurado: revisa SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD y MAIL_FROM_ADDRESS en el .env"
    );
  }

  return {
    host,
    port: Number(port),
    secure: secure === "true",
    user,
    password,
    fromName: fromName ?? "ProDesarrollo",
    fromAddress,
  };
};

const getTransporter = (): Transporter => {
  if (cachedTransporter) return cachedTransporter;
  const env = readSmtpEnv();
  cachedTransporter = nodemailer.createTransport({
    host: env.host,
    port: env.port,
    secure: env.secure,
    auth: { user: env.user, pass: env.password },
  });
  return cachedTransporter;
};

export interface MailAttachment {
  filename: string;
  content: Buffer;
  contentType: string;
}

export interface SendMailArgs {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: MailAttachment[];
}

export const sendMail = async (args: SendMailArgs): Promise<void> => {
  const env = readSmtpEnv();
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"${env.fromName}" <${env.fromAddress}>`,
    to: args.to,
    subject: args.subject,
    html: args.html,
    replyTo: args.replyTo,
    attachments: args.attachments,
  });
};
