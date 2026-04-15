import { StorageError, StorageErrorType } from "@/domain/Errors";
import { getProdOrDevSuffix } from "@/utils/utils";
import {
    DeleteObjectCommand,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const errorHandler = (errorType: StorageErrorType, error: unknown) => {
    return new StorageError(errorType, error);
};

export enum StorageFolder {
    PROJECTS = "projects",
    IMAGES = "images",
    NEWS = "news",
}

const bucketName = process.env.S3_BUCKET_NAME!;

const s3Client = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION ?? "auto",
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
    forcePathStyle: true,
});

function buildFullKey(filePath: string): string {
    return `${getProdOrDevSuffix()}/${filePath}`;
}

function randomSuffix(): string {
    return Math.random().toString(36).substring(2, 15);
}

export class StorageManager {
    public static async getUploadUrl(
        folder: StorageFolder,
        subfolder: string,
        fileName: string,
        contentType: string,
    ): Promise<{ url: string; filePath: string }> {
        try {
            const fileExtension = fileName.split(".").pop() ?? "";
            const fileNameWithoutExtension = fileName
                .split(".")
                .slice(0, -1)
                .join(".");
            const newFileName = `${fileNameWithoutExtension}-${randomSuffix()}.${fileExtension}`;

            const filePath = `${folder}/${subfolder}/${newFileName}`;
            const fullKey = buildFullKey(filePath);

            const command = new PutObjectCommand({
                Bucket: bucketName,
                Key: fullKey,
                ContentType: contentType,
            });

            const url = await getSignedUrl(s3Client, command, {
                expiresIn: 15 * 60,
            });

            return { url, filePath };
        } catch (error) {
            throw errorHandler(StorageErrorType.GET_UPLOAD_URL_FAILED, error);
        }
    }

    public static async uploadFile(
        folder: StorageFolder,
        subfolder: string,
        fileInput: File,
    ): Promise<string> {
        try {
            const fileName = fileInput.name;
            const fileExtension = fileName.split(".").pop() ?? "";
            const newFileName = `${randomSuffix()}.${fileExtension}`;

            const filePath = `${folder}/${subfolder}/${newFileName}`;
            const fullKey = buildFullKey(filePath);

            const arrayBuffer = await fileInput.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            await s3Client.send(
                new PutObjectCommand({
                    Bucket: bucketName,
                    Key: fullKey,
                    Body: buffer,
                    ContentType: fileInput.type,
                }),
            );

            return filePath;
        } catch (error) {
            throw errorHandler(StorageErrorType.UPLOAD_FILE_FAILED, error);
        }
    }

    public static async deleteFile(filePath: string): Promise<void> {
        try {
            const fullKey = buildFullKey(filePath);
            await s3Client.send(
                new DeleteObjectCommand({
                    Bucket: bucketName,
                    Key: fullKey,
                }),
            );
        } catch (error) {
            throw errorHandler(StorageErrorType.DELETE_FILE_FAILED, error);
        }
    }
}
