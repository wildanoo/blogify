import Navigation from "@/components/navigation/navigation";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/navigation/footer";
import { Metadata } from "next";
import { getDictionary } from "@/lib/getDictionary";
import siteConfig from "@/config/site";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });
export const generateMetadata = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  const dictionary = await getDictionary(lang);

  return {
    title: {
      template: "%s | " + siteConfig.siteName,
      default: siteConfig.siteName,
    },
    description: dictionary.footer.description,
    openGraph: {
      title: siteConfig.siteName,
      description: dictionary.footer.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}`,
      siteName: siteConfig.siteName,
      images: [
        {
          url: "https://localhost:3000/og.png", // Must be an absolute URL
          width: 1200,
          height: 628,
        },
      ],
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
        "de-DE": `${process.env.NEXT_PUBLIC_SITE_URL}/de`,
      },
    },
  };
};

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang}>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-J7JB825Y4F"
      ></Script>
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-J7JB825Y4F');`}
      </Script>
      <body className={inter.className}>
        <Navigation locale={lang as "en" | "de"} />
        <div className="pt-10 min-g-[calc(100vh - 300px)]">{children}</div>
        <Footer locale={lang as "en" | "de"} />
      </body>
    </html>
  );
}
