import Link from 'next/link';
import { ArrowLeft, Code2, Terminal } from 'lucide-react';
import Image from 'next/image';

export default function NotFound() {
  return (
    <main className="flex-grow flex items-center justify-center relative z-10 px-6 pt-32 pb-24 min-h-[calc(100vh-100px)]">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="max-w-4xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text/Action Column */}
        <div className="flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1">
          <div>
            <h1 className="text-6xl md:text-8xl font-bold font-[family-name:var(--font-headline)] text-transparent bg-clip-text bg-gradient-to-r from-primary to-[var(--color-secondary)] drop-shadow-[0_0_20px_rgba(var(--color-primary),0.3)] tracking-tighter mb-2">
              404
            </h1>
            <h2 className="text-3xl font-bold font-[family-name:var(--font-headline)] text-heading mb-4">
              Endpoint Not Found
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
              The resource you requested could not be resolved. It may have been moved, deleted, or never existed in the first place.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
            <Link 
              href="/"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-md font-mono text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[0.98]"
            >
              <ArrowLeft size={18} />
              RETURN TO ORIGIN
            </Link>
            <Link 
              href="/projects"
              className="border border-border text-heading hover:bg-muted/50 px-8 py-3 rounded-md font-mono text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <Code2 size={18} />
              VIEW PROJECTS
            </Link>
          </div>
        </div>
        
        {/* Visual/Terminal Column */}
        <div className="order-1 lg:order-2 w-full max-w-md mx-auto">
          <div className="glass border border-border/50 rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            {/* Terminal Header */}
            <div className="bg-muted/50 border-b border-border/50 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="mx-auto flex items-center gap-2">
                <Terminal size={14} className="text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground font-semibold">bash -- system@akm.dev</span>
              </div>
            </div>
            {/* Terminal Body */}
            <div className="p-6 font-mono text-sm bg-card/80 min-h-[250px] relative">
              <div className="flex justify-center mb-6 opacity-80">
                {/* A simple geometric AM logo approximation since we don't have the image file */}
                <div className="w-16 h-16 flex items-center justify-center text-primary text-4xl font-bold font-[family-name:var(--font-headline)] tracking-tighter">
                  AM
                </div>
              </div>
              <div className="text-muted-foreground mb-2">$ GET /requested-path</div>
              <div className="text-destructive mb-2">&gt; Error: 404 Not Found</div>
              <div className="text-muted-foreground mb-4">&gt; Connection closed by foreign host.</div>
              <div className="text-primary flex">
                <span>system@akm.dev:~$ </span>
                <span className="w-2 h-5 bg-primary ml-1 animate-pulse inline-block align-middle"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
