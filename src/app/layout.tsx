import "@/styles/core.scss";

export const metadata = {
  title: "Misquoted",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}