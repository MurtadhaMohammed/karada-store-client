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
import Footer from "@/components/Footer/footer";



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
  openGraph: {
    title: "Karada store",
    description: "افضل متجر لتوفير الاجهزة مع ضمان حقيقي",
    type: "website",
    url: "https://karadastore.iq",
    images: [
      {
        url: "https://i.imgur.com/1yaoApU.jpeg",
        width: 1200,
        height: 630,
        alt: "Karada Store Image",
      },
    ],
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
  additionalMetaTags: [
    {
      property: "instagram:card",
      content: "https://www.instagram.com/karada.store.elc",
    },
    {
      property: "instagram:title",
      content: "karada.store.elc",
    },
    {
      property: "facebook:card",
      content: "https://www.facebook.com/karada.gaming",
    },
    {
      property: "facebook:title",
      content: "متجر الكرادة - Karada Store",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html>
        <ReactQueryProvider fontStyle={`${newSansFont.variable} ${rubikFont.variable} ${IBMFont.variable} antialiased`}>
          <ProgressBar />
          <MainHeader />
          <MainHeaderWeb />
          {children}
          <BottomNabar />
          <Footer/>
          <SideMenu />
        </ReactQueryProvider>
    </html>
  );
}
