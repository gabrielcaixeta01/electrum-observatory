"use client";

import Image, { ImageProps } from "next/image";

export default function SiteImage(props: ImageProps) {
  const isProd =
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/electrum-observatory");

  const prefix = isProd ? "/electrum-observatory" : "";

  return <Image {...props} src={prefix + props.src} alt={props.alt ?? ""} />;
}