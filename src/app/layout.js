import localFont from "next/font/local";
import "./globals.css";
import { ReactQueryProvider } from "./providers";
import BottomNabar from "@/components/BottomNavbar/bottomNavbar";
import SideMenu from "@/components/SideMenu/sideMenu";
import MainHeader from "@/components/MainHeader/mainHeader";
import { Suspense } from "react";
import ProgressBar from "./Progreess";
import HomeSkeleton from "./Skeleton/skeleton";
import MainHeaderWeb from "@/components/MainHeader/web/mainHeaderWeb";
import ErrorBoundary from "@/components/ErrorBoundry/errorBoundry";


const IBMFont = localFont({
  src: [
    {
      path: "./fonts/IBMPlexSansArabic-Medium.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/IBMPlexSansArabic-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/IBMPlexSansArabic-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/IBMPlexSansArabic-Bold.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-IBM",
});

const newSansFont = localFont({
  src: [
    {
      path: "./fonts/NeoSansArabic.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/NeoSansArabicBold.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-NeoSans",
});

const rubikFont = localFont({
  src: [
    {
      path: "./fonts/Rubik-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Rubik-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Rubik-SemiBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Rubik-Bold.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-rubik",
});

export const metadata = {
  title: " ستور",
  description: "افضل متجر لتوفير الاجهزة مع ضمان حقيقي",
  keywords:
    "karada store,gaming,phones,computers,pc,tablets,consoles,store,كيمنك,سماعات,هواتف",
  author: "Karada store",
  ogTitle: "Karada store",
  ogDescription: "افضل متجر لتوفير الاجهزة مع ضمان حقيقي",
  ogType: "website",
  ogUrl: "https://karadastore.iq",
  ogimage:
    "https://karadastore.eu-central-1.linodeobjects.com/karada-store/image-3cj-xn.jpg",
  instagramCard: "https://www.instagram.com/karada.store.elc",
  instagramTitle: "karada.store.elc",
  facebookCard: "https://www.facebook.com/karada.gaming",
  facebookTitle: "متجر الكرادة - Karada Store",
};

export default function RootLayout({ children }) {
  return (
      <body className={`${newSansFont.variable} ${rubikFont.variable} ${IBMFont.variable} antialiased`}>
        <ReactQueryProvider>
          <ProgressBar />
          <MainHeader />
          <MainHeaderWeb />
          {children}
          <BottomNabar />
          <SideMenu />
        </ReactQueryProvider>
      </body>
  );
}
