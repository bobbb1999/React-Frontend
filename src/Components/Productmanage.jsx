import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import Swal from 'sweetalert2';
const Productmanage = () => {
  const [fileList, setFileList] = React.useState([]);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  // สร้าง state สำหรับเก็บข้อมูลสินค้าที่จะแสดงในหน้านั้น ๆ
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  // คำนวณรายการสินค้าที่จะแสดงตามหน้า
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  // ฟังก์ชันเปลี่ยนหน้า
  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
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

  const props = {
    name: "file",
    multiple: true,
    action: "https://photographer-testz.free.beeceptor.com/photos",
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/getproducts/:id",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data.products);
        console.log(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const [newProduct, setNewProduct] = useState([]);
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  const openAddProductModal = () => {
    setAddProductModalOpen(true);
  };

  const closeAddProductModal = () => {
    setAddProductModalOpen(false);
  };

  const addProduct = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("description", description);

    fileList.forEach((file) => {
      formData.append("file", file.originFileObj);
    });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3001/api/uploadproduct",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      message.success("สินค้าถูกเพิ่มเรียบร้อยแล้ว");
      console.log(response.data);
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Reload after 1 second
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditProductModalOpen, setEditProductModalOpen] = useState(false);
  const openEditProductModal = () => {
    setEditProductModalOpen(true);
  };

  const closeEditProductModal = () => {
    setEditProductModalOpen(false);
  };
  const editItem = (product) => {
    setSelectedProduct(product);
    // เปิด modal สำหรับแก้ไขข้อมูล
    openEditProductModal();
  };

  const updateProduct = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/api/updateproduct/${selectedProduct.id}`,
        {
          product_name: selectedProduct.product_name,
          category: selectedProduct.category,
          description: selectedProduct.description,
          price: selectedProduct.price
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
  
      console.log(response.data);
      message.success("Product updated successfully");
      closeEditProductModal();
      fetchData();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteItem = async (id) => {
    // ใช้ SweetAlert ถามก่อนลบสินค้า
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: 'คุณต้องการลบสินค้านี้ใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ใช่, ฉันต้องการลบ!',
      cancelButtonText: 'ยกเลิก'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:3001/api/deleteproduct/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          console.log(response.data);
          message.success("Product deleted successfully");
          fetchData();
          // หลังจากลบสำเร็จแล้ว อาจจะต้องโหลดสินค้าใหม่อีกครั้งโดยเรียก fetchData() หรือเมื่อไหร่ที่เหมาะสม
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      }
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/getproducts/:id",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data.products);
      console.log(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">สินค้า</h2>
        </div>
        <div className="my-2 flex sm:flex-row flex-col justify-between">
          {/* <div className="flex flex-row mb-1 sm:mb-0">
            <div className="relative">
              <select className="h-full rounded-l border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white">
                <option>All</option>
                <option>React</option>
                <option>Angular</option>
              </select>
            </div>
          </div> */}
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
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <button
            onClick={openAddProductModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            เพิ่มสินค้า
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
                            ชื่อสินค้า
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
                            ประเภทของสินค้า
                          </label>
                          <Select
                            value={categoryOptions.find(
                              (option) => option.value === category
                            )}
                            onChange={(selectedOption) =>
                              setCategory(selectedOption.value)
                            }
                            options={categoryOptions}
                            placeholder="เลือกประเภทของอุปกรณ์"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="price"
                            className="text-sm font-medium text-gray-900 block mb-2"
                          >
                            ราคาให้เช่า
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
                            รายละเอียดของสินค้า
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
                              คลิ๊กเพื่อเลือกรูปภาพหรือลากไฟล์รูปภาพมาวาง
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
                      ยกเลิก
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ชื่อสินค้า
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ประเภท
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    รายละเอียด
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ราคา
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    รูปภาพ
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    แก้ไข
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ลบ
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.filter((product) =>
                  product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((product) => (
                  <tr key={product.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {product.product_name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {product.category}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {product.description}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {product.price}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        {product.imageUrls.map((imageUrl, idx) => (
                          <img
                            key={idx}
                            src={imageUrl}
                            alt={`Product ${idx + 1}`}
                            className="h-8 w-8 mr-2"
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => editItem(product)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mr-4"
                      >
                        แก้ไข
                      </button>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => deleteItem(product.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          ย้อนกลับ
        </button>

        <button
          onClick={nextPage}
          disabled={indexOfLastProduct >= products.length}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            indexOfLastProduct >= products.length
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          ถัดไป
        </button>
        {isEditProductModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              {selectedProduct && (
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <form>
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="product-name"
                            className="text-sm font-medium text-gray-900 block mb-2"
                          >
                            ชื่อสินค้า
                          </label>
                          <input
                            value={selectedProduct.product_name}
                            onChange={(e) =>
                              setSelectedProduct({
                                ...selectedProduct,
                                product_name: e.target.value,
                              })
                            }
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
                            ประเภทของสินค้า
                          </label>
                          <Select
                            value={categoryOptions.find(
                              (option) =>
                                option.value === selectedProduct.category
                            )}
                            onChange={(selectedOption) =>
                              setSelectedProduct({
                                ...selectedProduct,
                                category: selectedOption.value,
                              })
                            }
                            options={categoryOptions}
                            placeholder="เลือกประเภทของอุปกรณ์"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="price"
                            className="text-sm font-medium text-gray-900 block mb-2"
                          >
                            ราคาให้เช่า
                          </label>
                          <input
                            type="number"
                            name="price"
                            id="price"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            placeholder="ราคาต่อ 1 วัน"
                            value={selectedProduct.price}
                            onChange={(e) =>
                              setSelectedProduct({
                                ...selectedProduct,
                                price: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="col-span-full">
                          <label
                            htmlFor="description"
                            className="text-sm font-medium text-gray-900 block mb-2"
                          >
                            รายละเอียดของสินค้า
                          </label>
                          <textarea
                            id="description"
                            rows="6"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                            placeholder="กล้อง APS-C sensor 26MP APS-C/Super 35mm 4K 120fps 10-bit 4:2:2 ระบบ Focus Real-time Eye AF and Real-time Tracking สำหรับงานถ่ายภาพยนตร์ บันทึก VDO ทั่วไป มีพัดลมระบายความร้อน"
                            value={selectedProduct.description}
                            onChange={(e) =>
                              setSelectedProduct({
                                ...selectedProduct,
                                description: e.target.value,
                              })
                            }
                          ></textarea>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      onClick={updateProduct}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      แก้ไข
                    </button>
                    <button
                      onClick={closeEditProductModal}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Productmanage;
