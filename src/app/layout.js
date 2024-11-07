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
  title: "كرادة ستور",
  description: "افضل متجر لتوفير الاجهزة مع ضمان حقيقي",
  keywords:
    "karada store,gaming,phones,computers,pc,tablets,consoles,store,كيمنك,سماعات,هواتف",
  author: "Karada store",
  ogTitle: "Karada store",
  ogDescription: "افضل متجر لتوفير الاجهزة مع ضمان حقيقي",
  ogType: "website",
  ogUrl: "https://karadastore.iq",
  ogImage:
    "https://scontent.fnjf7-2.fna.fbcdn.net/v/t39.30808-6/461507526_848167634092409_3807515064458253433_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=-5PePNY0zN4Q7kNvgESf4Dz&_nc_zt=23&_nc_ht=scontent.fnjf7-2.fna&_nc_gid=A6nvZli-7bICOQuw93iKa3d&oh=00_AYARNZxDEi5ypd2SnS3BTkuliPyf1i7uBtsmvF-RbbCDog&oe=672EB4D5",
  instagramCard: "https://www.instagram.com/karada.store.elc",
  instagramTitle: "karada.store.elc",
  facebookCard: "https://www.facebook.com/karada.gaming",
  facebookTitle: "متجر الكرادة - Karada Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords} />
      <meta name="author" content={metadata.author} />

      <meta property="og:title" content={metadata.ogTitle} />
      <meta property="og:description" content={metadata.ogDescription} />
      <meta property="og:type" content={metadata.ogType} />
      <meta property="og:url" content={metadata.ogUrl} />
      <meta property="og:image" content={metadata.ogImage} />

      <meta property="og:site_name" content={metadata.instagramTitle} />
      <meta property="og:see_also" content={metadata.instagramCard} />
      <meta property="og:see_also" content={metadata.facebookCard} />
      <ReactQueryProvider
        fontStyle={`${newSansFont.variable} ${rubikFont.variable} ${IBMFont.variable} antialiased`}
      >
        <ProgressBar />
        <MainHeader />
        <MainHeaderWeb />
        {children}
        <BottomNabar />
        <SideMenu />
      </ReactQueryProvider>
    </html>
  );
}
