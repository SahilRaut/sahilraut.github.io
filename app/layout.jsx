import "./globals.css";

export const metadata = {
  title: "Sahil Raut // Robotics",
  description:
    "Sahil Raut -- Robotics and Machine Learning Engineer. Humanoid robotics, embodied control, manipulation, large language models.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
