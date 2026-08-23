import { useEffect, useRef, useState } from "react";
import { Camera, ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Lightweight, frontend-only photo attachment.
 * Uses the browser's native file input: `capture="environment"` opens the
 * device camera on mobile, and the plain input opens the gallery/file picker
 * on both mobile and desktop.
 */
export function PhotoAttachment({
  file,
  onChange,
  label = "Attach a photo of the idol",
}: {
  file: File | null;
  onChange: (file: File | null) => void;
  label?: string;
}) {
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const pick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.files?.[0] ?? null;
    if (next) onChange(next);
    e.target.value = "";
  };

  const clear = () => {
    onChange(null);
    if (cameraRef.current) cameraRef.current.value = "";
    if (galleryRef.current) galleryRef.current.value = "";
  };

  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/60 p-4">
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={pick}
        aria-hidden="true"
        tabIndex={-1}
      />
      <input
        ref={galleryRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={pick}
        aria-hidden="true"
        tabIndex={-1}
      />

      {preview ? (
        <div className="flex items-center gap-4">
          <img
            src={preview}
            alt="Selected idol photo preview"
            className="size-20 shrink-0 rounded-xl border border-border object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{file?.name}</p>
            <p className="text-xs text-muted-foreground">
              {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : ""}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Button type="button" size="sm" variant="outline" onClick={() => cameraRef.current?.click()}>
                <Camera /> Retake
              </Button>
              <Button type="button" size="sm" variant="outline" onClick={() => galleryRef.current?.click()}>
                <ImageIcon /> Reselect
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={clear}>
                <X /> Remove
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">{label}</p>
          <div className="flex gap-2">
            <Button type="button" size="sm" onClick={() => cameraRef.current?.click()}>
              <Camera /> Take photo
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={() => galleryRef.current?.click()}>
              <ImageIcon /> Choose photo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
