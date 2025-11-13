import localFont from "next/font/local";
import "./globals.css";
import { ReactQueryProvider } from "./providers";
import BottomNabar from "@/components/BottomNavbar/bottomNavbar";
import SideMenu from "@/components/SideMenu/sideMenu";
import MainHeader from "@/components/MainHeader/mainHeader";
import ProgressBar from "./Progreess";
import MainHeaderWeb from "@/components/MainHeader/web/mainHeaderWeb";
import Footer from "@/components/Footer/footer";
import Head from "next/head";
import Script from "next/script";

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
    {
      rel: "manifest",
      href: "/manifest.json",
    },
  ],
  additionalMetaTags: [
    {
      name: "apple-itunes-app",
      content:
        "app-id=6741197248, app-argument=https://apps.apple.com/iq/app/karada-store/id6741197248",
    },
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
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
        <meta name="apple-itunes-app" content="app-id=6741197248" />
        {/* Meta Pixel Code */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1552395819444834&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </Head>
      <body>
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel-base"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
            `,
          }}
        />
        <Script
          id="meta-pixel-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              fbq('init', '1552395819444834');
              fbq('track', 'PageView');
              
              // Track when user clicks app store link
              window.trackAppStoreClick = function() {
                fbq('track', 'Lead', {
                  content_name: 'App Store Click',
                  content_category: 'App Download'
                });
              };
            `,
          }}
        />
        {/* End Meta Pixel Code */}
        <ReactQueryProvider
          fontStyle={`${newSansFont.variable} ${rubikFont.variable} ${IBMFont.variable}  antialiased`}
        >
          <ProgressBar />
          <MainHeader />
          <MainHeaderWeb />
          {children}
          <BottomNabar />
          <Footer />
          <SideMenu />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
