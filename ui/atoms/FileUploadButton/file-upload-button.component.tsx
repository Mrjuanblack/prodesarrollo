import { Button } from "@heroui/react";
import { useRef, useState, useEffect } from "react";
import { FileUploadButtonProperties } from "./file-upload-button.properties";

export const FileUploadButtonComponent = (properties: FileUploadButtonProperties) => {
    const {
        label = "Subir archivo",
        accept,
        multiple = false,
        isDisabled = false,
        className,
        value,
        onChange,
        onBlur,
        isInvalid = false,
        errorMessage,
    } = properties;

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    useEffect(() => {
        if (value === null || value === undefined) {
            setSelectedFiles([]);
        } else if (multiple) {
            // When multiple is true, value is File[] | null
            setSelectedFiles((value as File[]) || []);
        } else {
            // When multiple is false, value is File | null
            setSelectedFiles(value ? [value as File] : []);
        }
    }, [value, multiple]);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const fileArray = Array.from(files);
            setSelectedFiles(fileArray);
            if (multiple) {
                (onChange as ((files: File[] | null) => void) | undefined)?.(fileArray);
            } else {
                (onChange as ((file: File | null) => void) | undefined)?.(fileArray[0]);
            }
        } else {
            setSelectedFiles([]);
            if (multiple) {
                (onChange as ((files: File[] | null) => void) | undefined)?.(null);
            } else {
                (onChange as ((file: File | null) => void) | undefined)?.(null);
            }
        }
        onBlur?.();
    };

    const getButtonText = () => {
        if (selectedFiles.length === 0) {
            return label;
        } else if (selectedFiles.length === 1) {
            return selectedFiles[0].name;
        } else {
            return `${selectedFiles.length} archivos seleccionados`;
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={handleFileChange}
                className="hidden"
                disabled={isDisabled}
            />
            <Button
                onPress={handleButtonClick}
                isDisabled={isDisabled}
                color={isInvalid ? "danger" : "primary"}
                variant="flat"
                className={className}
            >
                {getButtonText()}
            </Button>
            {isInvalid && errorMessage && (
                <p className="text-danger text-tiny">{errorMessage}</p>
            )}
        </div>
    );
};

