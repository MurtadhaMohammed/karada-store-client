"use client";
import Link from "next/link";

export default function Custom500() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-5xl font-bold text-red-600 mb-4">500 - Server Error</h1>
      <p className="text-lg text-gray-700 mb-6">
        Oops! Something went wrong on our end. Please try again later.
      </p>
      <Link href="/">
        <a className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Go back home
        </a>
      </Link>
    </div>
  );
}
