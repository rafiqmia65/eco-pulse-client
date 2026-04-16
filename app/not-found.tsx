"use client";

import Link from "next/link";
import "./globals.css";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="max-w-md w-full text-center border border-border bg-card rounded p-8 shadow-custom">
        <h1 className="text-6xl font-bold text-primary">404</h1>

        <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>

        <p className="mt-3 text-sm text-muted-foreground">
          The page you are looking for doesn’t exist or may have been moved.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-5 py-2 rounded bg-primary text-primary-foreground hover:opacity-90 transition"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-5 py-2 rounded border border-border hover:bg-accent transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
