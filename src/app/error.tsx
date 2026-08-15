"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex-grow flex flex-col items-center justify-center px-6 py-24 relative z-10 w-full max-w-[1200px] mx-auto text-center min-h-[calc(100vh-200px)]">
      {/* Background Grid */}
      

      {/* Technical Error Code */}
      <div className="mb-8 inline-block bg-background border border-border rounded-lg px-6 py-4 shadow-[0_10px_40px_rgba(var(--color-primary),0.05)]">
        <div className="flex items-center gap-3 mb-2 justify-center">
          <AlertTriangle className="text-destructive w-5 h-5" />
          <span className="font-mono text-sm text-destructive uppercase tracking-wider font-semibold">
            Exception Caught
          </span>
        </div>
        <code className="font-mono text-sm text-heading font-medium">
          {error.digest
            ? `ERR_${error.digest}`
            : "ERR_UNEXPECTED_EXCEPTION_500"}
        </code>
      </div>

      {/* Headline & Subtext */}
      <h1 className="text-4xl md:text-[64px] md:leading-[72px] font-bold text-heading mb-6 tracking-tight font-[family-name:var(--font-headline)]">
        System Interrupted
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
        An unexpected error occurred while processing your request. Our
        engineering team has been notified and is currently investigating the
        issue. Please try your action again or return to the dashboard.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
        <Link
          href="/"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium hover:scale-[0.98] transition-all flex items-center gap-2 w-full sm:w-auto justify-center shadow-md"
        >
          <Home className="w-5 h-5" />
          Return to Home
        </Link>
        <button
          onClick={() => reset()}
          className="bg-transparent border border-border text-heading px-8 py-3 rounded-lg font-medium hover:bg-muted transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <RefreshCw className="w-5 h-5" />
          Retry Connection
        </button>
      </div>
    </main>
  );
}
