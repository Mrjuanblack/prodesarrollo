import { getProdOrDevSuffix } from "@/utils/utils";

function stripTrailingSlash(value: string): string {
    return value.replace(/\/+$/, "");
}

export function buildStorageUrl(path: string | null | undefined): string {
    if (!path) return "";
    if (/^(https?:|blob:|data:)/i.test(path)) return path;

    const base = stripTrailingSlash(process.env.NEXT_PUBLIC_STORAGE_URL ?? "");
    const env = getProdOrDevSuffix();
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;

    return [base, env, cleanPath].filter(Boolean).join("/");
}
