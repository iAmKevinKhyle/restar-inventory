import { Button, Dropdown } from "antd";
import { DownOutlined, FileExcelOutlined, FilePdfOutlined } from "@ant-design/icons";

const ExportButton = ({ onExportPDF, onExportExcel }) => {
  const items = [
    {
      key: "pdf",
      label: "Export to PDF",
      icon: <FilePdfOutlined style={{ color: "red" }} />,
      onClick: onExportPDF,
    },
    {
      key: "excel",
      label: "Export to Excel",
      icon: <FileExcelOutlined style={{ color: "green" }} />,
      onClick: onExportExcel,
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomLeft">
      <Button type="primary">
        Export <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default ExportButton;
