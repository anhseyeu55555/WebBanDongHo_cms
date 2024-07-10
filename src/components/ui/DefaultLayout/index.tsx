import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import avatar from "../../../assets/images/avatar.png";
import { useAppDispatch, useAppSelector } from "../../../hooks/app-hook";
import { selectUsername } from "../../../stores/auth";
import { selectDetailNV, selectIsLoading } from "../../../stores/nhanvien";
import { getDetailNVByUsername } from "../../../stores/nhanvien/nhanvien.thunk";
import { Header } from "../Header";
import { Loading } from "../Loading";

interface SidebarType {
  link: string;
  name: string;
  id: string;
}

const listSidebar: SidebarType[] = [
  {
    link: "/admin/danhmuc",
    name: "Danh sách danh mục",
    id: "danh-sach-danh-muc",
  },
  {
    link: "/admin/nhacungcap",
    name: "Nhà cung cấp",
    id: "danh-sach-nha-cung-cap",
  },
  {
    link: "/admin/thuonghieu",
    name: "Danh sách thương hiệu",
    id: "danh-sach-thuong-hieu",
  },
  {
    link: "/admin/khachhang",
    name: "Danh sách khách hàng",
    id: "danh-sach-khachhang",
  },
  {
    link: "/admin/nhanvien",
    name: "Danh sách nhân viên",
    id: "danh-sach-nhan-vien",
  },
  {
    link: "/admin/sanpham",
    name: "Danh sách sản phẩm",
    id: "danh-sach-san-pham",
  },
  {
    link: "/admin/donhanguser",
    name: "Danh sách đơn hàng",
    id: "danh-sach-don-hang",
  },
];

export const DefaultLayout = () => {
  const username =
    useAppSelector(selectUsername) || localStorage.getItem("username");
  const detailNV = useAppSelector(selectDetailNV);

  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!username) return;
    dispatch(getDetailNVByUsername(username));
  }, [username]);

  return (
    <>
      <Header />

      <Flex gap={20}>
        <Box
          minW={"280px"}
          height={"180vh"}
          backgroundColor={"#2e3836"}
          p={"32px 12px"}
        >
          <Flex direction={"column"} gap={10}>
            {isLoading ? (
              <Loading />
            ) : (
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                gap={5}
                direction={"column"}
              >
                <Box maxH={200} maxW={200}>
                  <Image src={avatar} alt="" />
                </Box>
                <Text
                  textAlign={"center"}
                  color={"white"}
                  fontWeight={700}
                  fontSize={24}
                >
                  {detailNV.hoten}
                </Text>
              </Flex>
            )}
            <Flex direction={"column"} gap={10}>
              {listSidebar.map((sidebar) => (
                <Link
                  key={sidebar.id}
                  href={sidebar.link}
                  _hover={{
                    transition: "all 0.3s ease",
                    scale: 1.5,
                  }}
                  color={"white"}
                  fontWeight={700}
                  fontSize={18}
                >
                  {sidebar.name}
                </Link>
              ))}
            </Flex>
          </Flex>
        </Box>
        <Outlet />
      </Flex>
    </>
  );
};
