"use client";

import Link from "next/link";
import "./globals.css";
import CustomButton from "@/components/shared/CustomButton/CustomButton";

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
          <CustomButton>
            <Link href="/">Go Home</Link>
          </CustomButton>

          <CustomButton className="bg-transparent text-foreground border border-border hover:bg-accent">
            <span onClick={() => window.history.back()}>Go Back</span>
            Go Back
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
