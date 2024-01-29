import React, { useState } from "react";
import axios from "axios";
import { Upload, Input, Button , Space } from "antd";
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
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture" 
        maxCount={12} 
        onChange={handleFileChange} 
        multiple
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
