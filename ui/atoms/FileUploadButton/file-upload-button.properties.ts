export interface BaseFileUploadButtonProperties {
    label?: string;
    accept?: string;
    isDisabled?: boolean;
    className?: string;
    onBlur?: () => void;
    isInvalid?: boolean;
    errorMessage?: string;
}

export interface FileUploadButtonPropertiesSingle extends BaseFileUploadButtonProperties {
    multiple?: false;
    value?: File | null;
    onChange?: (file: File | null) => void;
}

export interface FileUploadButtonPropertiesMultiple extends BaseFileUploadButtonProperties {
    multiple: true;
    value?: File[] | null;
    onChange?: (files: File[] | null) => void;
}

export type FileUploadButtonProperties = FileUploadButtonPropertiesSingle | FileUploadButtonPropertiesMultiple;

