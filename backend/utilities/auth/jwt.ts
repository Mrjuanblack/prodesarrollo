import { User } from "@/domain/user";
import { JWTPayload, SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

interface AuthTokenPayload extends User, JWTPayload {}

type VerificationResult = {
  valid: boolean;
  error?: unknown;
  payload?: AuthTokenPayload;
};

export async function generateToken(
  payload: AuthTokenPayload,
  expiresIn = "15m"
) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .setIssuedAt()
    .sign(secret);
}

export async function verifyToken(token: string): Promise<VerificationResult> {
  try {
    const { payload } = await jwtVerify<AuthTokenPayload>(token, secret);

    const validatedPayload: AuthTokenPayload = {
      id: payload.id,
      email: payload.email,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
      username: payload.username,
    };

    return {
      valid: true,
      payload: validatedPayload,
    };
  } catch (error) {
    return {
      valid: false,
      error,
    };
  }
}
