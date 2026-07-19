import { Geist } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export async function generateMetadata() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const socialImage = `${protocol}://${host}/og.png`;

  return {
    title: "A Little Date? 💗",
    description: "A very important (and very cute) invitation for one very special girl.",
    openGraph: {
      title: "Will you go on a little date with me?",
      description: "A very important question for one very special girl.",
      images: [{ url: socialImage, width: 1200, height: 630, alt: "A romantic date invitation" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Will you go on a little date with me?",
      description: "A very important question for one very special girl.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
