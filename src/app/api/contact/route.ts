import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

type ContactPayload = {
  clientName?: unknown;
  email?: unknown;
  message?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    const clientName =
      typeof body.clientName === "string" ? body.clientName.trim() : "";

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    const message =
      typeof body.message === "string" ? body.message.trim() : "";

    if (
      clientName.length < 2 ||
      clientName.length > 100 ||
      !emailPattern.test(email) ||
      email.length > 254 ||
      message.length < 10 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        { error: "Please provide a valid name, email, and message." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("contact_messages")
      .insert({
        client_name: clientName,
        email,
        message,
      });

    if (error) {
      console.error("Contact message insert failed:", error.message);

      return NextResponse.json(
        { error: "Unable to submit your message right now." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Your message was sent successfully." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
