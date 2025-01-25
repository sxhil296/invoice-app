"use client";

import NextError from "next/error";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {/* <h1 className="text-3xl font-semibold">Error : {error.message}</h1> */}  // OR
      <NextError statusCode={500} title={error.message} />
    </div>
  );
}
