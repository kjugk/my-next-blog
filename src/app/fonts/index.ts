import { Bokor, IBM_Plex_Sans_JP, Oswald } from "next/font/google";

export const ibmPlexSansJp = IBM_Plex_Sans_JP({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-sans-jp",
});

export const bokor = Bokor({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bokor",
});

export const oswald = Oswald({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});
