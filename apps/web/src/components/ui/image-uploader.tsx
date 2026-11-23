"use client";

import * as React from "react";
import { UploadCloud, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface UploadedPhoto {
  id: string;
  url: string;
  name: string;
  size: number;
  alt?: string;
  progress?: number;
}

export interface ImageUploaderProps {
  photos?: UploadedPhoto[];
  maxPhotos?: number;
  maxSizeMB?: number;
  onPhotosChange?: (photos: UploadedPhoto[]) => void;
  disabled?: boolean;
  className?: string;
}

export function ImageUploader({
  photos = [],
  maxPhotos = 5,
  maxSizeMB = 5,
  onPhotosChange,
  disabled = false,
  className,
}: ImageUploaderProps) {
  const [internalPhotos, setInternalPhotos] = React.useState<UploadedPhoto[]>(photos);
  const [dragOver, setDragOver] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || disabled) return;
    setErrorMsg(null);

    const availableSlots = maxPhotos - internalPhotos.length;
    if (availableSlots <= 0) {
      setErrorMsg(`Maximum of ${maxPhotos} photos allowed.`);
      return;
    }

    const validFiles: UploadedPhoto[] = [];
    const maxBytes = maxSizeMB * 1024 * 1024;

    Array.from(files)
      .slice(0, availableSlots)
      .forEach((file) => {
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
          setErrorMsg("Only JPG, PNG, and WebP images are supported.");
          return;
        }
        if (file.size > maxBytes) {
          setErrorMsg(`File "${file.name}" exceeds the ${maxSizeMB}MB limit.`);
          return;
        }

        const url = URL.createObjectURL(file);
        validFiles.push({
          id: Math.random().toString(36).substring(2, 9),
          url,
          name: file.name,
          size: file.size,
          alt: `Photo: ${file.name}`,
          progress: 100,
        });
      });

    if (validFiles.length > 0) {
      const updated = [...internalPhotos, ...validFiles];
      setInternalPhotos(updated);
      onPhotosChange?.(updated);
    }
  };

  const removePhoto = (id: string) => {
    const updated = internalPhotos.filter((p) => p.id !== id);
    setInternalPhotos(updated);
    onPhotosChange?.(updated);
  };

  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Dropzone Container */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-border/80 bg-muted/30 text-center transition-all cursor-pointer hover:bg-muted/60 hover:border-brand-teal/50",
          dragOver && "border-brand-teal bg-brand-teal/5",
          disabled && "opacity-50 cursor-not-allowed",
        )}
        role="button"
        tabIndex={0}
        aria-label="Upload photo"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          disabled={disabled || internalPhotos.length >= maxPhotos}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="w-10 h-10 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-2.5">
          <UploadCloud className="w-5 h-5" />
        </div>
        <p className="text-sm font-medium text-foreground">Click to upload or drag & drop photos</p>
        <p className="text-xs text-muted-foreground mt-1">
          JPG, PNG, or WebP (max {maxSizeMB}MB each, up to {maxPhotos} photos)
        </p>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-1.5 text-xs text-destructive font-medium">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Photo Previews */}
      {internalPhotos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-1">
          {internalPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-video rounded-xl overflow-hidden border border-border bg-card shadow-sm"
            >
              <img
                src={photo.url}
                alt={photo.alt || "Uploaded evidence"}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removePhoto(photo.id);
                }}
                className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/70 text-white hover:bg-destructive transition-colors opacity-90 group-hover:opacity-100"
                aria-label={`Remove photo ${photo.name}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-1.5 text-[10px] text-white/90 truncate">
                {photo.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
