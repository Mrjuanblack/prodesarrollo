interface UserReadableError {
    getError(): string;
}

export enum GoogleDriveErrorType {
    RESUMABLE_UPLOAD_SESSION_CREATION_FAILED = '1',
    VISIBILITY_UPDATE_FAILED = '2',
    LIST_FILES_FAILED = '3',
    DELETE_FILE_FAILED = '4',
    FOLDER_CREATION_FAILED = '5',
    FOLDER_PATH_RESOLUTION_FAILED = '6',
    FILE_DELETION_FAILED = '7',
}

const GOOGLE_DRIVE_PREFIX = 'G';
export class GoogleDriveError extends Error implements UserReadableError {
    constructor(
        public readonly type: GoogleDriveErrorType,
        public readonly cause?: unknown
    ) {
        super(`Google Drive error: ${GOOGLE_DRIVE_PREFIX} - ${type}`);
        // Log code
        console.error(`Google Drive error: ${this.getError()}`);
        // Log original error
        if (this.cause) {
            console.error('Details:');
            console.error(this.cause);
        }
    }

    getError(): string {
        return `${GOOGLE_DRIVE_PREFIX} - ${this.type}`;
    }
}

// Repository Errors
export enum RepositoryErrorType {
    NOT_FOUND = '0',
    GET = '1',
    GET_MANY = '2',
    GET_ALL = '3',
    CREATE = '4',
    CREATE_MANY = '5',
    UPDATE = '6',
    UPDATE_MANY = '7',
    DELETE = '8',
    DELETE_MANY = '9'
}

export enum RepositoryErrorOrigin {
   PROJECTS = '001',
   PROJECT_DOCUMENTS = '002',
}

export class RepositoryError extends Error implements UserReadableError {
    constructor(
        public readonly origin: RepositoryErrorOrigin,
        public readonly type: RepositoryErrorType,
        public readonly cause?: unknown
    ) {
        super(`Repository error: ${origin} - ${type}`);
        // Log code
        console.error(`Repository error: ${this.getError()}`);
        // Log original error
        if (this.cause) {
            console.error('Details:');
            console.error(this.cause);
        }
    }

    getError(): string {
        return `${this.origin} - ${this.type}`;
    }
}