import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { date, time, activity, note = "" } = await request.json();

    if (!date || !time || !activity) {
      return NextResponse.json({ error: "Missing date details" }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Email service is not configured" }, { status: 503 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const safeDate = escapeHtml(date);
    const safeTime = escapeHtml(time);
    const safeActivity = escapeHtml(activity);
    const safeNote = escapeHtml(note);

    const { data, error } = await resend.emails.send({
      from: "Date Night <onboarding@resend.dev>",
      to: ["jacallantine@crimson.ua.edu"],
      subject: "She said YES to the date 💗",
      html: `
        <div style="font-family:Arial,sans-serif;color:#442d35;line-height:1.6">
          <h1 style="color:#c93f6c">It’s a date!</h1>
          <p><strong>Date:</strong> ${safeDate}</p>
          <p><strong>Time:</strong> ${safeTime}</p>
          <p><strong>Activity:</strong> ${safeActivity}</p>
          ${safeNote ? `<p><strong>Her note:</strong> ${safeNote}</p>` : ""}
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Date accepted", id: data.id });
  } catch {
    return NextResponse.json({ error: "Could not save the date" }, { status: 500 });
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
