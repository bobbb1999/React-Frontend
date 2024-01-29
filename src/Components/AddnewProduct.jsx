import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

export default function AddNewProduct() {
  const { register, handleSubmit, control } = useForm();
  const [fileList, setFileList] = React.useState([]);

  const onSubmit = (data) => console.log(data);
  console.log(fileList);

  const props = {
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188", // replace with your upload URL
    onChange(info) {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-5);
      fileList = fileList.map((file) => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });
      setFileList(fileList);
    },
    beforeUpload(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          file.preview = reader.result;
          resolve(file);
        };
        reader.onerror = (error) => reject(error);
      });
    },
    listType: "picture-card",
    onPreview: async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      }

      const image = new Image();
      image.src = file.url || file.preview;
      image.onload = () => {
        const imgWindow = window.open(file.url || file.preview);
        imgWindow.document.write(
          '<img src="' + image.src + '" width="300" height="auto"/>'
        );
      };
    },
  };
  const categoryOptions = [
    { value: "camera", label: "กล้องถ่ายรูป/วีดีโอ" },
    { value: "lens", label: "เลนส์" },
    { value: "lighting", label: "ไฟแฟรช/ไฟ LED" },
    { value: "power", label: "Power/Battery" },
    { value: "gopro", label: "GoPro" },
    { value: "mic", label: "Mic/Wireless" },
    { value: "accessory_camera", label: "อุปกรณ์ถ่ายรูป" },
    { value: "accessory_video", label: "อุปกรณ์ถ่ายวีดีโอ" },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 mt-8 max-w-xl mx-auto bg-white shadow-md rounded"
    >
      <h2 className="text-2xl mb-6 text-center">เพิ่มสินค้า</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="ชื่อของอุปกรณ์"
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          {...register("price", { required: true })}
          type="text"
          placeholder="ราคาต่อ 1 วัน (ใส่แค่ตัวเลข เช่น 300)"
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Upload Images
        </label>
        <Upload.Dragger {...props} fileList={fileList}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload.
          </p>
        </Upload.Dragger>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <Controller
          name="category"
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <Select
              {...field}
              options={categoryOptions}
              placeholder="เลือกประเภทของอุปกรณ์"
            />
          )}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register("description")}
          rows={3}
          className="mt-1 p-2 w-full border rounded-md"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full mx-auto bg-blue-600 hover:bg-pink-dark text-black py-3 px-4 mt-8 rounded"
      >
        Save product
      </button>
    </form>
  );
}
