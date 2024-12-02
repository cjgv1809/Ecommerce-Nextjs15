import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import "../globals.css";

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "A simple ecommerce store",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body>
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}

          <main>
            <Header />
            {children}
          </main>

          {/* Include the Sanity Live component  for live functionality */}
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}
