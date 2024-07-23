import {
  Box,
  Button,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Roboto300Font from "@fontsource/roboto/files/roboto-vietnamese-300-normal.woff";
import Roboto400Font from "@fontsource/roboto/files/roboto-vietnamese-400-normal.woff";
import Roboto700Font from "@fontsource/roboto/files/roboto-vietnamese-700-normal.woff";
import {
  Document,
  Page,
  PDFDownloadLink,
  Text,
  View,
} from "@react-pdf/renderer";
import { Font, StyleSheet } from "@react-pdf/renderer";
import moment from "moment";
import { useEffect } from "react";

import { Loading } from "../../components/ui/Loading";
import { PageWrapper } from "../../components/ui/PageWrapper";
import { TitlePage } from "../../components/ui/TitlePage";
import { useAppDispatch, useAppSelector } from "../../hooks/app-hook";
import { selectIsLoading, selectListPhieuNhap } from "../../stores/phieunhap";
import { getListPhieuNhap } from "../../stores/phieunhap/phienhap.thunk";
import { PhieuNhapType } from "../../types/phieunhap";

Font.register({
  family: "Roboto",
  fonts: [
    {
      fontWeight: 400,
      src: Roboto400Font,
    },
    {
      fontWeight: 300,
      src: Roboto300Font,
    },
    {
      fontWeight: 700,
      src: Roboto700Font,
    },
  ],
});

const PhieuNhapPage = () => {
  const dispatch = useAppDispatch();
  const listPhieuNhap = useAppSelector(selectListPhieuNhap);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getListPhieuNhap());
  }, []);

  const renderData = () => {
    if (isLoading) {
      return <Loading />;
    }

    return (
      <Box
        width={"100%"}
        height={"100%"}
        border={"1px solid #e2e8f0"}
        borderRadius={"8px"}
        p="8px"
      >
        <TableContainer>
          <Table variant="striped" colorScheme="gray">
            <TableCaption>Danh sách phiếu nhập trong hệ thống</TableCaption>
            <Thead>
              <Tr>
                <Th>Mã PN</Th>
                <Th>Ngày nhập</Th>
                <Th>Mã ĐĐH</Th>
                <Th>Nhà cung cấp</Th>
                <Th>Nhân viên</Th>
                <Th>Xem</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listPhieuNhap.map((phieunhap: PhieuNhapType, index) => (
                <Tr key={index}>
                  <Td>{phieunhap.mapn}</Td>
                  <Td>{moment(phieunhap.ngaydat).format("DD-MM-YYYY")}</Td>
                  <Td>{phieunhap.dondathang.mddh}</Td>
                  <Td>{phieunhap.dondathang.nhacungcap.tenncc}</Td>
                  <Td>{phieunhap.nhanvien.hoten}</Td>
                  <Td>
                    <PDFDownloadLink
                      document={<MyDocument />}
                      fileName="hoadon.pdf"
                    >
                      <Button
                        color={"#5998e3"}
                        _hover={{
                          background: "transparent",
                        }}
                      >
                        Xuất phiếu nhập
                      </Button>
                    </PDFDownloadLink>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  return (
    <PageWrapper>
      <Flex direction={"column"} gap={10}>
        <TitlePage title={"Danh sách phiếu nhập"} isShowButtonCreate={false} />

        {renderData()}
      </Flex>
    </PageWrapper>
  );
};

export default PhieuNhapPage;

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { margin: 10, padding: 10, flexGrow: 1 },
  text: {
    fontFamily: "Roboto",
    fontSize: 12,
  },
});

const MyDocument = () => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.text}>Hóa Đơn Bán Hàng</Text>
        <Text style={styles.text}>Ngày: {new Date().toLocaleDateString()}</Text>
        <Text style={styles.text}>Tên khách hàng: John Doe</Text>
        <Text style={styles.text}>Sản phẩm: Xe đạp ABC</Text>
        <Text style={styles.text}>Số lượng: 1</Text>
        <Text style={styles.text}>Đơn giá: 10.000.000 VND</Text>
        <Text style={styles.text}>Tổng cộng: 10.000.000 VND</Text>
      </View>
    </Page>
  </Document>
);
