import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FacebookPageEmbed from "./facebook";
import { useState } from "react";
import { ROUTES } from "@/utils/route";

const Footer = () => {
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(true);
  const [toggle3, setToggle3] = useState(true);

  return (
    <footer className="w-full bg-[#F7F4EF] pt-12 pb-6 flex justify-center items-center">
      <div className="container !px-5 lg:!px-0 !mx-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-10">
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900">
              KẾT NỐI & CHIA SẺ
            </h3>
            <ul className="space-y-2 w-5/6">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Hãy đăng ký nhận bản tin & LIKE trên Facebook để xem tại sao
                  mọi người lại yêu thích & lựa chọn{" "}
                  <strong className="text-orange-600">In Ảnh Trực Tuyến</strong>{" "}
                  là nhà in tin cậy của Photographer.
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-gray-900">
                THEO DÕI CHÚNG TÔI
              </h3>
              <div className="flex space-x-4">
                <Link href="/" className="text-blue-600 hover:text-blue-700">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/768px-Facebook_Logo_%282019%29.png"
                    alt="alt"
                    width={1000}
                    height={1000}
                    className="w-7 h-7 lg:w-9 lg:h-9"
                  />
                </Link>
                <Link href="/" className="text-gray-900 hover:text-gray-700">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/2048px-Icon_of_Zalo.svg.png"
                    alt="alt"
                    width={1000}
                    height={1000}
                    className="w-7 h-7 lg:w-9 lg:h-9"
                  />
                </Link>
                <Link href="/">
                  <Image
                    src="https://banner2.cleanpng.com/20231123/xjc/transparent-tiktok-logo-black-and-white-logo-tiktok-app-minima-minimalist-black-and-white-tiktok-app-1711004158896.webp"
                    alt="alt"
                    width={1000}
                    height={1000}
                    className="w-7 h-7 lg:w-9 lg:h-9"
                  />
                </Link>
                <Link href="/">
                  <Image
                    src="https://tiemquatiko.com/wp-content/uploads/2022/08/shopee-circle-logo-design-shopping-bag-13.png"
                    alt="alt"
                    width={1000}
                    height={1000}
                    className="w-7 h-7 lg:w-9 lg:h-9"
                  />
                </Link>
              </div>
            </div>
            <div className="w-full">
              <FacebookPageEmbed />
            </div>
          </div>
          <div className="space-y-4">
            <h3
              onClick={() => setToggle1(!toggle1)}
              className="cursor-pointer text-md font-semibold text-gray-900 flex"
            >
              THÔNG TIN CHUNG{" "}
              <ChevronDown
                className={`w-5 h-5 ml-2 transition-transform ${
                  toggle1 ? "rotate-180" : ""
                }`}
              />
            </h3>
            {toggle1 && (
              <ul className="space-y-2">
                {/* <li>
                  <Link href="/" className="text-gray-600 hover:text-gray-900">
                    Hỏi đáp
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-600 hover:text-gray-900">
                    Thông tin vận chuyển
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-600 hover:text-gray-900">
                    Hướng dẫn trực tiếp mua hàng trực tuyến
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-600 hover:text-gray-900">
                    Phương thức giao hàng COD
                  </Link>
                </li> */}
                <li>
                  <Link
                    href={`${ROUTES.ABOUT}?scrollTo=gt`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${ROUTES.ABOUT}?scrollTo=dt`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Chính sách đổi trả
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${ROUTES.ABOUT}?scrollTo=gh`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Điều khoản giao hàng
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${ROUTES.ABOUT}?scrollTo=bm`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Chính sách bảo mật
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${ROUTES.ABOUT}?scrollTo=tt`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Chính sách thanh toán
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <div className="space-y-4">
            <h3
              onClick={() => setToggle2(!toggle2)}
              className="cursor-pointer text-md font-semibold text-gray-900 flex"
            >
              IN ẢNH TRỰC TUYẾN{" "}
              <ChevronDown
                className={`w-5 h-5 ml-2 transition-transform ${
                  toggle2 ? "rotate-180" : ""
                }`}
              />
            </h3>
            {toggle2 && (
              <ul className="space-y-2">
                <li>
                  <Link
                    href={`${ROUTES.HOME}`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${ROUTES.ABOUT}?scrollTo=gt`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Về chúng tôi
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${ROUTES.PLASTIC}?tag=Plastic`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    In ấn
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${ROUTES.FRAME}?tag=Frame`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Khung ảnh
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${ROUTES.ALBUM}?tag=Album`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Photobook
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${ROUTES.PRICE}`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Bảng giá
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${ROUTES.BLOG}`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Tin tức
                  </Link>
                </li>
                {/* <li>
                  <Link href="/" className="text-gray-600 hover:text-gray-900">
                    Liên hệ với chúng tôi
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-600 hover:text-gray-900">
                    Vị trí cửa hàng
                  </Link>
                </li> */}
              </ul>
            )}
          </div>
          <div className="space-y-4">
            <h3
              onClick={() => setToggle3(!toggle3)}
              className="cursor-pointer text-md font-semibold text-gray-900 flex"
            >
              CÁC TỈNH THÀNH{" "}
              <ChevronDown
                className={`w-5 h-5 ml-2 transition-transform ${
                  toggle3 ? "rotate-180" : ""
                }`}
              />
            </h3>
            {toggle3 && (
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-gray-900">
                    TP. Hồ Chí Minh
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-600 hover:text-gray-900">
                    Cần Thơ
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-600 hover:text-gray-900">
                    Cà Mau
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-600 hover:text-gray-900">
                    Đà Nẵng
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-600 hover:text-gray-900">
                    Hải Phòng
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-600 hover:text-gray-900">
                    Nha Trang
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-600 hover:text-gray-900">
                    Vĩnh Long
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900">
              PHƯƠNG THỨC THANH TOÁN
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/7630/7630510.png"
                  alt="Tiền mặt"
                  width={24}
                  height={24}
                />
                <span className="text-gray-600">Tiền mặt</span>
              </li>
              <li className="flex items-center space-x-2">
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/15953/15953021.png"
                  alt="Chuyển khoản"
                  width={24}
                  height={24}
                />
                <span className="text-gray-600">Chuyển khoản</span>
              </li>
              <li className="flex items-center space-x-2">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                  alt="Momo"
                  width={24}
                  height={24}
                />
                <span className="text-gray-600">Momo</span>
              </li>
              <li className="flex items-center space-x-2">
                <Image
                  src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png"
                  alt="VNPay"
                  width={24}
                  height={24}
                />
                <span className="text-gray-600">VNPay</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900">
              CHỨNG CHỈ UY TÍN
            </h3>
            <div className="flex flex-row lg:flex-col justify-start items-center lg:items-start gap-7 !m-0">
              <Image
                src="https://res.cloudinary.com/farmcode/image/upload/v1741450139/iatt/Untitled_design_1_qj4hfg.png"
                alt="DMCA Protected"
                width={128}
                height={0}
              />
              <Image
                src="https://webmedia.com.vn/images/2021/09/logo-da-thong-bao-bo-cong-thuong-mau-xanh.png"
                alt="Đã thông báo Bộ Công Thương"
                width={128}
                height={0}
              />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900">TẢI APP</h3>
            <div className="flex justify-start items-center gap-4">
              <Image
                src="https://res.cloudinary.com/farmcode/image/upload/v1740924247/iatt/karylba4x40rayg8rndh.png"
                alt="ios"
                width={140}
                height={0}
              />
              <Image
                src="https://res.cloudinary.com/farmcode/image/upload/v1740924245/iatt/tioltw838yiyu1zkhyuh.png"
                alt="chplay"
                width={140}
                height={0}
              />
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="text-gray-600 text-sm">
            <p>Copyright © 2025 IN ẢNH TRỰC TUYẾN.</p>
            <p>Địa chỉ: Trần Văn Hoài, Ninh Kiều, Cần Thơ</p>
            <p>Thời gian làm việc: Cả tuần: 9:00 - 17:00</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
