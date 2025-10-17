"use client";

import Head from "next/head";

interface CanonicalURLProps {
  baseUrl: string;
  pathname: string;
}

export default function CanonicalURL({ baseUrl, pathname }: CanonicalURLProps) {
  // Створюємо canonical URL без параметрів запиту
  const canonicalUrl = `${baseUrl}${pathname}`;
  
  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
}
