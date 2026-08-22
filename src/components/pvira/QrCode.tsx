import { useEffect, useRef } from "react";

/** Renders a QR code for a drop-off reference. Client-only (canvas). */
export function QrCode({ value, size = 148 }: { value: string; size?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const QR = await import("qrcode");
      if (cancelled || !ref.current) return;
      await QR.toCanvas(ref.current, value, {
        width: size,
        margin: 1,
        color: { dark: "#1d3b2a", light: "#ffffff" },
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [value, size]);

  return (
    <canvas
      ref={ref}
      width={size}
      height={size}
      className="rounded-xl border border-border bg-white p-1"
      aria-label={`QR code for reference ${value}`}
      role="img"
    />
  );
}
