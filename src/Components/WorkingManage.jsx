import React, { useState, useEffect } from "react";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, message, Button } from "antd";

const WorkingManage = () => {
  const [workings, setWorkings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [workName, setWorkName] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [editWork, setEditWork] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/getMyWorkings/:id`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setWorkings(response.data.workings);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleAddWorkings = async () => {
    try {
      const formData = new FormData();
      formData.append("work_name", workName);
      formData.append("description", description);
      files.forEach((file) => {
        formData.append("file", file.originFileObj);
      });

      await axios.post("http://localhost:3001/api/uploadworkings", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Reload workings after adding
      const response = await axios.get(
        `http://localhost:3001/api/getMyWorkings/:id`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWorkings(response.data.workings);

      // Reset form
      setWorkName("");
      setDescription("");
      setFiles([]);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
    });
  };

  const handleChange = ({ fileList }) => {
    if (fileList.length > 9) {
      message.error("You can only upload up to 9 images.");
      return;
    }
    setFiles(fileList);
  };

  const handleEdit = (work) => {
    setEditWork(work); // เซ็ตข้อมูล workings ที่ต้องการแก้ไข
    setWorkName(work.work_name); // เซ็ตชื่องานเริ่มต้น
    setDescription(work.description); // เซ็ตคำอธิบายเริ่มต้น

    // ดึงรูปภาพเดิมของ workings นั้นๆ และเซ็ตเป็นข้อมูลเริ่มต้น
    const fileList = work.imageUrls.map((url, index) => ({
      uid: index,
      name: `image-${index}`,
      status: "done",
      url: url,
    }));
    setFiles(fileList);

    setShowEditModal(true); // เปิด Modal สำหรับแก้ไข
  };

  // ฟังก์ชันเพิ่มขึ้นเพื่อลบรูปภาพออกจาก state `files`
  const handleRemoveImage = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleChangeStatus = async (id, currentStatus) => {
    try {
      // กำหนดสถานะใหม่ที่ต้องการส่งไปยัง API
      const newStatus = currentStatus === "show" ? "hide" : "show";

      // เรียกใช้ API เพื่ออัพเดทสถานะ
      await axios.patch(
        `http://localhost:3001/api/changeStatusWorkings/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // หาข้อมูล workings ที่ต้องการอัพเดท
      const updatedWorkings = workings.map((work) => {
        if (work.id === id) {
          return { ...work, status: newStatus };
        }
        return work;
      });

      // อัพเดท state ของ workings ใหม่
      setWorkings(updatedWorkings);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleEditWorkings = async () => {
    try {
      const formData = new FormData();
      formData.append("work_name", workName);
      formData.append("description", description);

      // เพิ่มรูปภาพใหม่ที่เพิ่มเข้ามาในการแก้ไข
      files.forEach((file) => {
        if (file.originFileObj) {
          formData.append("file", file.originFileObj);
        }
      });

      // เพิ่มรูปภาพเดิมที่อยู่ใน workings นั้นๆ
      for (const url of editWork.imageUrls) {
        // ตรวจสอบว่าเป็น URL หรือไม่
        if (typeof url === "string" && url.startsWith("http")) {
          // ดึง binary data ของรูปภาพเดิม
          const response = await axios.get(url, {
            responseType: "arraybuffer",
          });

          // แปลงเป็น Blob object
          const blob = new Blob([response.data], { type: "image/jpeg" });

          // สร้าง File object จาก Blob
          const file = new File([blob], `image-${Date.now()}.jpg`, {
            type: "image/jpeg",
          });

          // เพิ่ม File object เข้าไปใน FormData
          formData.append("file", file);
        }
      }

      await axios.patch(
        `http://localhost:3001/api/updateworking/${editWork.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Reload workings after editing
      const response = await axios.get(
        `http://localhost:3001/api/getMyWorkings/:id`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWorkings(response.data.workings);

      // Reset form
      setWorkName("");
      setDescription("");
      setFiles([]);
      setShowEditModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Workings</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Workings
        </button>
      </div>

      {/* Workings List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {workings.map((work) => (
          <div
            key={work.id}
            className="bg-gray-200 p-4 rounded shadow-lg flex flex-col"
          >
            <h2 className="text-lg font-semibold mb-2">{work.work_name}</h2>
            <p className="mb-2">{work.description}</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {work.imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Work ${index + 1}`}
                  className="w-full h-24 object-cover rounded"
                />
              ))}
            </div>
            <div className="mt-auto flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(work)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Delete
              </button>
              {/* <button
                onClick={() => handleChangeStatus(work.id, work.status)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {work.status === "show" ? "hide" : "show"}
              </button> */}
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  onChange={() => handleChangeStatus(work.id, work.status)}
                  checked={work.status === "show"}
                />
                <div
                  className={`relative w-11 h-6 ${
                    work.status === "show" ? "bg-blue-600" : "bg-red-500"
                  } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}
                />
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {work.status === "show"
                    ? "แสดงผลงาน"
                    : "ซ่อนผลงาน"}
                </span>
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Add Workings Modal */}
      <Modal
        title="Add Workings"
        visible={showModal}
        onOk={handleAddWorkings}
        onCancel={() => setShowModal(false)}
        okText="Add"
        cancelText="Cancel"
      >
        <input
          type="text"
          placeholder="Work Name"
          value={workName}
          onChange={(e) => setWorkName(e.target.value)}
          className="w-full border rounded px-2 py-1 mb-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-2 py-1 mb-2"
        ></textarea>
        <Upload
          multiple
          listType="picture-card"
          fileList={files}
          onChange={handleChange}
          beforeUpload={() => false}
          onPreview={handlePreview}
        >
          {files.length < 9 && (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </Modal>

      {/* Edit Workings Modal */}
      <Modal
        title="Edit Workings"
        visible={showEditModal}
        onOk={handleEditWorkings}
        onCancel={() => setShowEditModal(false)}
        okText="Edit"
        cancelText="Cancel"
      >
        <input
          type="text"
          placeholder="Work Name"
          value={workName}
          onChange={(e) => setWorkName(e.target.value)}
          className="w-full border rounded px-2 py-1 mb-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-2 py-1 mb-2"
        ></textarea>
        <Button type="danger">Delete All Images</Button>
        <Upload
          multiple
          listType="picture-card"
          fileList={files}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={() => false}
        >
          {files.length < 9 && (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </Modal>

      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default WorkingManage;
