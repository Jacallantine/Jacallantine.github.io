import { NextResponse } from "next/server";

const PORTFOLIO_EMAIL_ENDPOINT =
  "https://jacallantine-github-io.vercel.app/api/send-email";

export async function POST(request) {
  try {
    const { date, time, activity, note = "" } = await request.json();

    if (!date || !time || !activity) {
      return NextResponse.json({ error: "Missing date details" }, { status: 400 });
    }

    const message = [
      "She said YES to the date!",
      "",
      `Date: ${date}`,
      `Time: ${time}`,
      `Activity: ${activity}`,
      note ? `Her note: ${note}` : null,
      "",
      "Sent from the date invitation website.",
    ]
      .filter(Boolean)
      .join("\n");

    // Send through the already-configured portfolio contact endpoint. That
    // deployment owns RESEND_API_KEY and the verified recipient configuration.
    const portfolioResponse = await fetch(PORTFOLIO_EMAIL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "jcallantine3@gmail.com",
        subject: "She said YES to the date!",
        body: message,
      }),
      cache: "no-store",
    });

    const responseBody = await portfolioResponse.json().catch(() => ({}));

    if (!portfolioResponse.ok) {
      console.error("Portfolio email endpoint error:", responseBody.error);
      return NextResponse.json(
        { error: responseBody.error || "Portfolio email service failed" },
        { status: portfolioResponse.status }
      );
    }

    return NextResponse.json({
      message: "Date confirmation sent through the portfolio email service",
      id: responseBody.id,
    });
  } catch (error) {
    console.error("Date email proxy error:", error);
    return NextResponse.json(
      { error: "Could not send the date confirmation" },
      { status: 500 }
    );
  }
}
