"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      clientName: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSubmitted(true);
        toast.success(result.message || "Your message was sent successfully.");
        setTimeout(() => setSubmitted(false), 5000);
        (e.target as HTMLFormElement).reset();
      } else {
        const errorMessage = result.error || "Please provide a valid name, email, and message.";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      const errorMessage = "Unable to submit your message right now.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-[family-name:var(--font-mono)] text-primary-light tracking-widest uppercase">
            // Contact
          </span>
          <h2 className="font-[family-name:var(--font-headline)] text-3xl md:text-4xl font-bold mt-3 tracking-tight">
            Get in <span className="gradient-text">touch</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl text-justify">
            Currently open for new opportunities. Let&apos;s build something
            scalable together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-surface-container-low/50 border-border">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-[family-name:var(--font-mono)] text-muted-foreground tracking-wide mb-2 block">
                        NAME
                      </label>
                      <Input
                        name="name"
                        placeholder="Your name"
                        required
                        minLength={2}
                        maxLength={100}
                        className="bg-background border-border focus:border-primary focus:ring-primary/20 h-12"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-[family-name:var(--font-mono)] text-muted-foreground tracking-wide mb-2 block">
                        EMAIL
                      </label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="you@email.com"
                        required
                        maxLength={254}
                        className="bg-background border-border focus:border-primary focus:ring-primary/20 h-12"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-[family-name:var(--font-mono)] text-muted-foreground tracking-wide mb-2 block">
                      MESSAGE
                    </label>
                    <Textarea
                      name="message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      required
                      minLength={10}
                      maxLength={5000}
                      className="bg-background border-border focus:border-primary focus:ring-primary/20 resize-none"
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-destructive">
                      {error}
                    </p>
                  )}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:shadow-glow-primary h-12"
                    disabled={submitted || loading}
                  >
                    {loading ? (
                      "Sending..."
                    ) : submitted ? (
                      "Message Sent! ✓"
                    ) : (
                      <>
                        <Send size={16} strokeWidth={1.5} /> Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center gap-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Mail
                  size={18}
                  strokeWidth={1.5}
                  className="text-primary-light"
                />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-headline)] font-semibold mb-1">
                  Email
                </h3>
                <p className="text-sm text-muted-foreground">
                  {process.env.NEXT_PUBLIC_PERSONAL_EMAIL || ""}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                <MapPin
                  size={18}
                  strokeWidth={1.5}
                  className="text-secondary-light"
                />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-headline)] font-semibold mb-1">
                  Location
                </h3>
                <p className="text-sm text-muted-foreground">
                  {process.env.NEXT_PUBLIC_PERSONAL_ADDRESS || ""} | Open To Remote
                </p>
              </div>
            </div>

            <div className="glass rounded-xl p-5 mt-4">
              <p className="text-sm text-on-surface-variant leading-relaxed font-[family-name:var(--font-mono)]">
                <span className="text-primary-light">const</span>{" "}
                <span className="text-secondary-light">status</span> ={" "}
                <span className="text-green-400">&quot;open_to_work&quot;</span>
                ;
                <br />
                <span className="text-primary-light">const</span>{" "}
                <span className="text-secondary-light">response_time</span> ={" "}
                <span className="text-tertiary-light">
                  &quot;&lt; 24h&quot;
                </span>
                ;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
