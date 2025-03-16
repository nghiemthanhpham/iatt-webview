"use client";

import { Ban, ChevronLeft, RefreshCcw, Undo2 } from "lucide-react";
import React from "react";
import NavigationBar from "./components/navigation-bar";
import { useSearchParams } from "next/navigation";
import ImageUploadMobile from "./components/image-upload-mobile";
import { toast } from "@/hooks/use-toast";
import { UploadService } from "@/services/upload";
import { MobileService } from "@/services/mobile";
import { DATA } from "@/utils/data";
import Image from "next/image";
import ImageProcessing from "./components/image-processing";
import ImageComposer from "./components/compile-image";
import { IMAGES } from "@/utils/image";
import Link from "next/link";

export default function AppFrameClient() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("function");

  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [currentImage, setCurrentImage] = React.useState<string | null>(null);
  const [originalImage, setOriginalImage] = React.useState<string | null>(null);
  const [responseImage1, setResponseImage1] = React.useState<string | null>(
    null
  ); // face2paint
  const [responseImage2, setResponseImage2] = React.useState<string | null>(
    null
  ); // paprika
  const [responseImage3, setResponseImage3] = React.useState<string | null>(
    null
  );
  const [selectedStyle, setSelectedStyle] = React.useState<string>("original");
  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [removeBackground, setRemoveBackground] = React.useState(false);
  const [selectedBackground, setSelectedBackground] = React.useState<
    string | null
  >(null);

  const [deviceHeight, setDeviceHeight] = React.useState("90vh");

  React.useEffect(() => {
    const updateHeight = () => {
      setDeviceHeight(`${window.innerHeight}px`);
    };

    updateHeight();

    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  React.useEffect(() => {
    setUploadedFile(null);
    setCurrentImage(null);
    setOriginalImage(null);
    setResponseImage1(null);
    setResponseImage2(null);
    setResponseImage3(null);
    setLoading(false);
    setSelectedBackground(null);
  }, [tab]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleImageUpload = (file: File | null) => {
    if (file) {
      setUploadedFile(file);
      const originalUrl = URL.createObjectURL(file);
      setCurrentImage(originalUrl);
      setOriginalImage(originalUrl);
      setSelectedStyle("original");
    }
  };

  const handleStyleSelect = (style: string) => {
    // Allow switching to original anytime
    if (style === "original") {
      setSelectedStyle(style);
      setCurrentImage(originalImage);
      return;
    }

    // Check if the selected style has a result
    let hasResult = false;
    switch (style) {
      case "face2paint":
        if (responseImage1) {
          setCurrentImage(responseImage1);
          hasResult = true;
        }
        break;
      case "paprika":
        if (responseImage2) {
          setCurrentImage(responseImage2);
          hasResult = true;
        }
        break;
      case "webtoon":
        if (responseImage3) {
          setCurrentImage(responseImage3);
          hasResult = true;
        }
        break;
    }

    if (hasResult) {
      setSelectedStyle(style);
    } else {
      toast({
        title: "",
        description: "Vui lòng tạo ảnh AI trước khi chọn kiểu này!",
        variant: "destructive",
      });
    }
  };

  const handleBackgroundSelect = (backgroundUrl: string | null) => {
    if (!removeBackground) {
      toast({
        title: "",
        description: "Vui lòng xóa phông nền trước khi chọn nền mới!",
        variant: "destructive",
      });
      return;
    }
    setSelectedBackground(backgroundUrl);
  };

  const validateForm = () => {
    if (!uploadedFile) {
      toast({
        title: "",
        description: "Vui lòng tải lên một hình ảnh!",
        variant: "destructive",
      });
      setLoading(false);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      setLoading(true);
      const upload: any = await UploadService.uploadToCloudinary([
        uploadedFile,
      ]);

      let response;
      if (tab === null) {
        response = await MobileService.smoothSkin(upload[0].secure_url);
      } else if (tab === "cl") {
        response = await MobileService.increaseQuality(upload[0].secure_url);
      } else if (tab === "ai") {
        const [res1, res2, res3] = await Promise.all([
          MobileService.imageAI(upload[0].secure_url, "face2paint"),
          MobileService.imageAI(upload[0].secure_url, "paprika"),
          MobileService.imageAI(upload[0].secure_url, "webtoon"),
        ]);
        if (res1.data && res2.data && res3.data) {
          response = res1;
        }
        setResponseImage1(res1.data);
        setResponseImage2(res2.data);
        setResponseImage3(res3.data);
        setCurrentImage(res1.data);
        setSelectedStyle("face2paint");
      } else if (tab === "xp") {
        response = await MobileService.removeBackground(upload[0].secure_url);
        setRemoveBackground(true);
      }

      if (response && response.data) {
        if (currentImage) {
          URL.revokeObjectURL(currentImage);
        }
        setCurrentImage(response.data);
      } else {
        toast({
          title: "",
          description: "Đã xảy ra lỗi khi xử lí ảnh, vui lòng thử lại!",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast({
        title: "",
        description: "Đã xảy ra lỗi khi xử lí ảnh, vui lòng thử lại!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative w-full flex flex-col justify-center items-center"
      style={{ height: deviceHeight }}
    >
      {/* PROCESSING  */}
      {loading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 z-20">
          <div
            className="w-full bg-black bg-opacity-50 flex flex-col gap-10 justify-center items-center"
            style={{ height: deviceHeight }}
          >
            <div className="bg-white px-7 py-8 rounded-lg flex flex-col items-center gap-6">
              <ImageProcessing />
              <div className="text-black font-medium">
                Hình ảnh đang được xử lí...
              </div>
            </div>
          </div>
        </div>
      )}
      <Image
        src={IMAGES.BACKGROUND_MOBILE}
        alt=""
        fill
        priority
        objectFit="cover"
        className="opacity-50 absolute top-0 left-0 z-0"
      />
      <div
        className="w-full flex flex-col z-10"
        style={{ height: deviceHeight }}
      >
        <header className="w-full text-white pt-3 p-2 text-center shrink-0">
          <div className="flex flex-row justify-between items-center">
            <Link href="/app-home" className="ml-1">
              <ChevronLeft className="text-[#4B5563]" />
            </Link>
            <div className="flex flex-row justify-center items-center gap-5 ml-12">
              <Undo2 className="text-[#4B5563]" />
              <RefreshCcw
                className="text-[#4B5563]"
                onClick={() => {
                  handleRefresh();
                  setRefresh(!refresh);
                }}
              />
              <Undo2 className="scale-x-[-1] text-[#4B5563] z-0" />
            </div>
            <div className="bg-[#645bff] text-white font-medium text-sm px-3 py-2 mr-2 rounded-lg">
              Tiếp tục
            </div>
          </div>
        </header>
        {/* MIN DA  */}
        {tab === "md" && (
          <main className="w-full flex flex-col flex-1 p-4">
            <div className="flex-1">
              <ImageUploadMobile
                onImageChange={handleImageUpload}
                title={"Chọn hình ảnh bạn muốn tăng chất lượng"}
                newImage={currentImage ?? undefined}
              />
            </div>
            <div
              onClick={handleSubmit}
              className={`bg-[#645bff] rounded-lg py-3 text-center text-white mb-[4.5rem] ${
                loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? "Đang xử lý..." : "Bắt đầu làm mịn"}
            </div>
            <footer className="w-full text-white text-center shrink-0">
              <NavigationBar action={tab} />
            </footer>
          </main>
        )}
        {/* CHAT LUONG  */}
        {tab === "cl" && (
          <main className="w-full flex flex-col flex-1 p-4">
            <div className="flex-1">
              <ImageUploadMobile
                onImageChange={handleImageUpload}
                title={"Chọn hình ảnh bạn muốn tăng chất lượng"}
                newImage={currentImage ?? undefined}
              />
            </div>
            <div
              onClick={handleSubmit}
              className={`bg-[#645bff] rounded-lg py-3 text-center text-white mb-[4.5rem] ${
                loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? "Đang xử lý..." : "Tăng chất lượng"}
            </div>
            <footer className="w-full text-white text-center shrink-0">
              <NavigationBar action={tab} />
            </footer>
          </main>
        )}
        {/* XOA PHONG  */}
        {tab === "xp" && (
          <main className="w-full flex flex-col flex-1 p-4">
            <div className="flex-1">
              {removeBackground && (
                <ImageComposer
                  foregroundImage={currentImage}
                  backgroundImage={selectedBackground}
                />
              )}
              {!removeBackground && (
                <ImageUploadMobile
                  onImageChange={handleImageUpload}
                  title={"Chọn hình ảnh bạn muốn xóa phông"}
                  newImage={currentImage ?? undefined}
                />
              )}
            </div>
            <div className="flex flex-row gap-4 py-4">
              <div
                className={`flex justify-center items-center w-14 h-full object-cover rounded-lg border-2 ${
                  selectedBackground === null
                    ? "border-[#645bff]"
                    : "border-white"
                } cursor-pointer`}
                onClick={() => handleBackgroundSelect(null)}
              >
                <Ban />
              </div>
              <div className="h-3/4 w-0.5 bg-gray-300 my-auto"></div>
              {DATA.BACKGROUND.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer"
                  onClick={() => handleBackgroundSelect(item.url)}
                >
                  <Image
                    src={item.url}
                    alt=""
                    width={1000}
                    height={1000}
                    className={`w-14 h-[90px] object-cover rounded-lg border-2 ${
                      selectedBackground === item.url
                        ? "border-[#645bff]"
                        : "border-white"
                    }`}
                  />
                </div>
              ))}
            </div>
            <div
              onClick={handleSubmit}
              className={`bg-[#645bff] rounded-lg py-3 text-center text-white mb-[4.5rem] ${
                loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? "Đang xử lý..." : "Xóa phông"}
            </div>
            <footer className="w-full text-white text-center shrink-0">
              <NavigationBar action={tab} />
            </footer>
          </main>
        )}
        {/* AI  */}
        {tab === "ai" && (
          <main className="w-full flex flex-col flex-1 p-4">
            <div className="flex-1">
              <ImageUploadMobile
                onImageChange={handleImageUpload}
                title={"Chọn hình ảnh bạn muốn tạo với AI"}
                newImage={currentImage ?? undefined}
              />
            </div>
            <div className="flex flex-row gap-4 py-4">
              <div
                className={`flex justify-center items-center w-14 h-full object-cover rounded-lg border-2 ${
                  selectedBackground === null
                    ? "border-[#645bff]"
                    : "border-white"
                } cursor-pointer`}
                onClick={() => handleBackgroundSelect(null)}
              >
                <Ban />
              </div>
              <div className="h-3/4 w-0.5 bg-gray-300 my-auto"></div>
              {DATA.AI_STYLE.map((item: any, index: number) => (
                <div
                  key={item.id}
                  onClick={() => handleStyleSelect(item?.style)}
                >
                  <Image
                    src={item.url}
                    alt=""
                    width={1000}
                    height={1000}
                    className={`flex justify-center items-center w-14 h-[90px] rounded-lg border-2 ${
                      selectedStyle === item?.style
                        ? "border-[#645bff]"
                        : "border-white"
                    } cursor-pointer`}
                  />
                </div>
              ))}
            </div>
            <div
              onClick={handleSubmit}
              className={`bg-[#645bff] rounded-lg py-3 text-center text-white mb-[4.5rem] ${
                loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? "Đang xử lý..." : "Tạo ảnh AI"}
            </div>
            <footer className="w-full text-white text-center shrink-0">
              <NavigationBar action={tab} />
            </footer>
          </main>
        )}
      </div>
    </div>
  );
}
