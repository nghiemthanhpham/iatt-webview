import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IOS - IN ẢNH TRỰC TUYẾN",
  description:
    "Chỉnh sửa ảnh miễn phí và in ảnh trực tuyến dễ dàng. Tải lên những tấm ảnh yêu thích và bắt đầu chỉnh sửa ngay!",
  openGraph: {
    title: "IOS - IN ẢNH TRỰC TUYẾN",
    description:
      "Chỉnh sửa ảnh hoàn toàn miễn phí và in ảnh trực tuyến dễ dàng. Chọn ảnh yêu thích và tải lên để chỉnh sửa!",
    url: "https://inanhtructuyen.com",
    images: [
      {
        url: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2025/01/cach-xoa-app-store.jpg",
        width: 1200,
        height: 630,
        alt: "IOS - In Ảnh Trực Tuyến",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IOS - IN ẢNH TRỰC TUYẾN",
    description:
      "Chỉnh sửa ảnh miễn phí và in ảnh trực tuyến dễ dàng. Tải lên ảnh yêu thích và chỉnh sửa ngay!",
    images: [
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2025/01/cach-xoa-app-store.jpg",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className} suppressHydrationWarning={true}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
