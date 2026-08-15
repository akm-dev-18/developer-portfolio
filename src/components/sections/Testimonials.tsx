"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Quote } from "lucide-react";

import { Testimonial } from "@/types";

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-[family-name:var(--font-mono)] text-primary-light tracking-widest uppercase">
            // Testimonials
          </span>
          <h2 className="font-[family-name:var(--font-headline)] text-3xl md:text-4xl font-bold mt-3 tracking-tight">
            What people <span className="gradient-text">say</span>
          </h2>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((t, i) => {
              const initials = t.name.split(' ').map((n:string) => n[0]).join('');
              return (
                <CarouselItem key={t.name} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                    className="h-full"
                  >
                    <Card className="bg-surface-container-low/50 border-border h-full">
                      <CardContent className="p-6 flex flex-col h-full">
                        <Quote
                          size={24}
                          strokeWidth={1.5}
                          className="text-primary/30 mb-4"
                        />
                        <p className="text-sm text-on-surface-variant leading-relaxed flex-1 italic text-justify">
                          &ldquo;{t.quote}&rdquo;
                        </p>
                        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                          <Avatar className="h-9 w-9 bg-primary/10 border border-primary/20">
                            <AvatarFallback className="text-xs font-[family-name:var(--font-mono)] text-primary-light bg-transparent">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{t.name}</p>
                            <p className="text-xs text-muted-foreground">{t.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
