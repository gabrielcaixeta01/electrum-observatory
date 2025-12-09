"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

export default function SiteImage(props: ImageProps) {
  const [prefix, setPrefix] = useState("");

  useEffect(() => {
    const isProd = window.location.pathname.startsWith("/electrum-observatory");
    setPrefix(isProd ? "/electrum-observatory" : "");
  }, []);

  return <Image {...props} src={prefix + props.src} alt={props.alt ?? ""} />;
}