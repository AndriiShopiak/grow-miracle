"use client";

import Head from "next/head";

interface PaginationSEOProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
}

export default function PaginationSEO({ 
  currentPage, 
  totalPages, 
  baseUrl = "https://sad-olega.com" 
}: PaginationSEOProps) {
  if (currentPage <= 1) return null;

  const prevUrl = currentPage === 2 ? baseUrl : `${baseUrl}/?page=${currentPage - 1}`;
  const nextUrl = currentPage < totalPages ? `${baseUrl}/?page=${currentPage + 1}` : null;

  return (
    <Head>
      <link rel="prev" href={prevUrl} />
      {nextUrl && <link rel="next" href={nextUrl} />}
    </Head>
  );
}
