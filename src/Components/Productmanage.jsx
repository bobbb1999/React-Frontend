import React, { useState } from "react";
import Select from "react-select";
import { Dropdown } from 'primereact/dropdown';
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";

const Productmanage = () => {
  const [fileList, setFileList] = React.useState([]);
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const categoryOptions = [
    { value: "camera", label: "กล้องถ่ายรูป/วีดีโอ" },
    { value: "lens", label: "เลนส์" },
    { value: "lighting", label: "ไฟแฟรช/ไฟ LED" },
  ];

  const props = {
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-4);
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
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState([]);
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  const openAddProductModal = () => {
    setAddProductModalOpen(true);
  };

  const onSubmit = async (data) => { // ส่งข้อมูล form ไปยัง onSubmit ให้ React Hook Form ดูแล
    try {
      const response = await axios.post('http://localhost:3001/api/uploadporduct', {
        ...data,
        fileList
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };
  

  const closeAddProductModal = () => {
    setAddProductModalOpen(false);
  };

  const addProduct = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('product_name', productName);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('description', description);

    fileList.forEach((file) => {
      formData.append('file', file.originFileObj);
    });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post('http://localhost:3001/api/uploadproduct', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };
  
  const editItem = (id) => {
    // Add your logic here to edit an item
  };

  const deleteItem = (id) => {
    // Add your logic here to delete an item
  };
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">All Products</h2>
        </div>
        <div className="my-2 flex sm:flex-row flex-col justify-between">
          <div className="flex flex-row mb-1 sm:mb-0">
            <div className="relative">
              <select className="h-full rounded-l border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white">
                <option>All</option>
                <option>React</option>
                <option>Angular</option>
              </select>
            </div>
          </div>
          <div className="block relative">
            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current text-gray-500"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M10 2a8 8 0 0 1 6.32 12.906l5.387 5.387-1.414 1.414-5.387-5.387A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 0 12A6 6 0 0 0 10 4z" />
              </svg>
            </span>
            <input
              placeholder="Search"
              className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
            />
          </div>

          <button
            onClick={openAddProductModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Add Product
          </button>
          {isAddProductModalOpen && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <form>
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="product-name"
                            className="text-sm font-medium text-gray-900 block mb-2"
                          >
                            Product Name
                          </label>
                          <input
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            type="text"
                            name="product_name"
                            id="product_name"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            placeholder="Sony Alpha 6700"
                            required
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="category"
                            className="text-sm font-medium text-gray-900 block mb-2"
                          >
                            Category
                          </label>
                              <Select
                                value={category}
                                onChange={(selectedOption) => setCategory(selectedOption.value)}
                                options={categoryOptions}
                                placeholder="เลือกประเภทของอุปกรณ์"
                              />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="price"
                            className="text-sm font-medium text-gray-900 block mb-2"
                          >
                            Price
                          </label>
                          <input
                            type="number"
                            name="price"
                            id="price"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            placeholder="ราคาต่อ 1 วัน"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-span-full">
                          <label
                            htmlFor="description"
                            className="text-sm font-medium text-gray-900 block mb-2"
                          >
                            Product Details
                          </label>
                          <textarea
                            id="description"
                            rows="6"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                            placeholder="กล้อง APS-C sensor 26MP APS-C/Super 35mm 4K 120fps 10-bit 4:2:2 ระบบ Focus Real-time Eye AF and Real-time Tracking สำหรับงานถ่ายภาพยนตร์ บันทึก VDO ทั่วไป มีพัดลมระบายความร้อน"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                        </div>

                        <div className="col-span-full">
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
                      </div>
                    </form>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      onClick={addProduct}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      เพิ่มสินค้า
                    </button>
                    <button
                      onClick={closeAddProductModal}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Productmanage;