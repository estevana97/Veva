"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";

// The guest shows this code at the venue; scanning it links their bill to the reservation for spend points.
export default function BookingQr({ reference }: { reference: string }) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    QRCode.toDataURL(`VEVA:${reference}`, { margin: 1, width: 320 }).then(setSrc).catch(() => setSrc(""));
  }, [reference]);

  if (!src) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={`QR code for reservation ${reference}`} className="h-36 w-36 border border-line p-1" />;
}
