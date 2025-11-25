interface UserReadableError {
  getError(): string;
}

export enum GoogleStorageErrorType {
  GET_UPLOAD_URL_FAILED = "1",
  UPLOAD_FILE_FAILED = "2",
  DELETE_FILE_FAILED = "3",
}

const GOOGLE_STORAGE_PREFIX = "GS";
export class GoogleStorageError extends Error implements UserReadableError {
  constructor(
    public readonly type: GoogleStorageErrorType,
    public readonly cause?: unknown
  ) {
    super(`Google Storage error: ${GOOGLE_STORAGE_PREFIX} - ${type}`);
    // Log code
    console.error(`Google Storage error: ${this.getError()}`);
    // Log original error
    if (this.cause) {
      console.error("Details:");
      console.error(this.cause);
    }
  }

  getError(): string {
    return `${GOOGLE_STORAGE_PREFIX} - ${this.type}`;
  }
}

// Repository Errors
export enum RepositoryErrorType {
  NOT_FOUND = "0",
  GET = "1",
  GET_MANY = "2",
  GET_ALL = "3",
  CREATE = "4",
  CREATE_MANY = "5",
  UPDATE = "6",
  UPDATE_MANY = "7",
  DELETE = "8",
  DELETE_MANY = "9",
}

export enum RepositoryErrorOrigin {
  PROJECTS = "001",
  PROJECT_DOCUMENTS = "002",
  PROJECT_PHOTOS = "003",
  USERS = "004",
  AUTH = "005",
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
      console.error("Details:");
      console.error(this.cause);
    }
  }

  getError(): string {
    return `${this.origin} - ${this.type}`;
  }
}
