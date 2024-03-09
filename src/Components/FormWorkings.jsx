import React, { useState } from "react";
import axios from "axios";
import { Upload, Input, Button , Space , message} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const FormWorkings = () => {
  const [files, setFiles] = useState([]);
  const [workName, setWorkName] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (info) => {
    setFiles(info.fileList);
  };

  const handleUpload = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i].originFileObj); // ใช้ originFileObj เพื่อให้ได้ File object
      }
      formData.append("work_name", workName);
      formData.append("description", description);
  
      await axios.post("http://localhost:3001/api/uploadworkings", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        title: 'Success!',
        text: 'Data submitted successfully',
        icon: 'success',
      })
      console.log("Upload successful");
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };
  function checkFileSize(file) {
    const fileSize = file.size / 1024 / 1024; // convert bytes to MB
    const maxSize = 15; // กำหนดขนาดไฟล์สูงสุดเป็น 5 MB
  
    if (fileSize > maxSize) {
      message.error(`${file.name} มีขนาดใหญ่เกิน ${maxSize}MB`);
      return false; // ถ้าขนาดใหญ่เกินกำหนดให้ return false เพื่อยกเลิกการอัปโหลดไฟล์
    }
    return true; // ถ้าขนาดไม่เกินกำหนดให้ return true เพื่ออนุญาตให้อัปโหลดไฟล์
  }
  return (
    <>
    <h4 className="text-title-md2 font-semibold text-black dark:text-white ml-4 mt-4">
              อัพโหลดผลงาน
            </h4>
    <div className="mx-auto max-w-md p-4 space-y-4">
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
        size="large"
      >
        <Upload 
        action="https://photographer-testz.free.beeceptor.com/photos"
        listType="picture" 
        maxCount={12} 
        onChange={handleFileChange} 
        multiple
        beforeUpload={checkFileSize}
        >
          <Button icon={<UploadOutlined />}>อัพโหลดรูปภาพ (สูงสุด : 12 รูปภาพ)</Button>
        </Upload>
      </Space>

      <Input
        type="text"
        placeholder="ชื่องานที่รับ"
        value={workName}
        onChange={(e) => setWorkName(e.target.value)}
      />

      <Input
        type="text"
        placeholder="รายละเอียด"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button onClick={handleUpload}>
        Upload
      </Button>
    </div>
    </>
  );
};

export default FormWorkings;
