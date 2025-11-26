import { GoogleStorageError, GoogleStorageErrorType } from "@/domain/Errors";
import { getProdOrDevSuffix } from "@/utils/utils";
import { Storage } from "@google-cloud/storage";

const errorHandler = (errorType: GoogleStorageErrorType, error: unknown) => {
    return new GoogleStorageError(errorType, error);
}

export enum GoogleStorageFolder {
    PROJECTS = 'projects',
    IMAGES = 'images',
    NEWS = 'news',
}

const storage = new Storage({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
});

const bucketName = process.env.NEXT_PUBLIC_GOOGLE_STORAGE_BUCKET_NAME!;

const bucket = storage.bucket(bucketName);

export class GoogleStorageManager {
    public static async getUploadUrl(folder: GoogleStorageFolder, subfolder: string, fileName: string, contentType: string): Promise<{ url: string, filePath: string }> {
        try {
            // Generate random string for the file name
            // First extract the file name and the extension
            const fileExtension = fileName.split('.').pop() ?? '';
            const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
            const randomString = Math.random().toString(36).substring(2, 15);
            const newFileName = `${fileNameWithoutExtension}-${randomString}.${fileExtension}`;

            const filePath = `${folder}/${subfolder}/${newFileName}`;
            const fullFilePath = `${getProdOrDevSuffix()}/${filePath}`;

            const file = bucket.file(fullFilePath);
            const [url] = await file.getSignedUrl({
                version: 'v4',
                action: 'write',
                expires: Date.now() + 15 * 60 * 1000,
                contentType: contentType,
            });

            return { url, filePath };
        } catch (error) {
            throw errorHandler(GoogleStorageErrorType.GET_UPLOAD_URL_FAILED, error);
        }
    }

    public static async uploadFile(folder: GoogleStorageFolder, subfolder: string, fileInput: File): Promise<string> {
        try {
            const fileName = fileInput.name;
            const fileExtension = fileName.split('.').pop() ?? '';
            const randomString = Math.random().toString(36).substring(2, 15);
            const newFileName = `${randomString}.${fileExtension}`;

            const filePath = `${folder}/${subfolder}/${newFileName}`;
            const fullFilePath = `${getProdOrDevSuffix()}/${filePath}`;
            
            const file = bucket.file(fullFilePath);
            
            // Convert File to Buffer
            const arrayBuffer = await fileInput.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            
            // Save file with metadata
            await file.save(buffer, {
                metadata: {
                    contentType: fileInput.type,
                },
            });

            return filePath;
        } catch (error) {
            throw errorHandler(GoogleStorageErrorType.UPLOAD_FILE_FAILED, error);
        }
    }

    public static async deleteFile(filePath: string): Promise<void> {
        try {
            const fullFilePath = `${getProdOrDevSuffix()}/${filePath}`;

            const file = bucket.file(fullFilePath);
            await file.delete();
        } catch (error) {
            throw errorHandler(GoogleStorageErrorType.DELETE_FILE_FAILED, error);
        }
    }
}