import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { message } from "antd";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

function ProductAll() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newPrices, setNewPrices] = useState([]);

  const token = localStorage.getItem("token");

  const categories = [
    { value: "", label: "All" },
    {
      value: "camera",
      label: "กล้องถ่ายรูป/วีดีโอ",
      image: "/svg/photo-camera-svgrepo-com.svg",
    },
    {
      value: "lens",
      label: "เลนส์",
      image: "/svg/lens-camera-lens-svgrepo-com.svg",
    },
    {
      value: "lighting",
      label: "ไฟแฟรช/ไฟ LED",
      image: "/svg/spotlight-svgrepo-com.svg",
    },
    {
      value: "power",
      label: "Power/Battery",
      image: "/svg/battery-75-svgrepo-com.svg",
    },
    { value: "gopro", label: "GoPro", image: "/svg/gopro-svgrepo-com.svg" },
    {
      value: "mic",
      label: "Mic/Wireless",
      image: "/svg/microphone-svgrepo-com.svg",
    },
    {
      value: "accessory_camera",
      label: "อุปกรณ์ถ่ายรูป",
      image: "/svg/photo-camera-svgrepo-com.svg",
    },
    {
      value: "accessory_video",
      label: "อุปกรณ์ถ่ายวีดีโอ",
      image: "/svg/video-camera-video-svgrepo-com.svg",
    },
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleProductClick = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3001/api/getRentEquipmentProfileByProductId/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/ProductDetail/${productId}`, {
        state: { product: response.data.product },
      });
    } catch (error) {
      message.error("ไม่สามารถแสดงข้อมูลสินค้าได้");
      console.error("Error fetching product details:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      let url = `http://localhost:3001/api/getAllProducts/${id}`;
      if (selectedCategory) {
        url += `?category=${selectedCategory}`;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ดึงค่าเฉลี่ยของคะแนนดาวของแต่ละสินค้าแล้วเก็บไว้ในข้อมูลสินค้า
      const productsWithAverageRating = await Promise.all(
        response.data.products.map(async (product) => {
          try {
            const ratingResponse = await axios.get(
              `http://localhost:3001/api/product/average-rating/${product.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const reviewCountResponse = await axios.get(
              `http://localhost:3001/api/product/getReviewCount/${product.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            let averageRating = ratingResponse.data.averageRating;
            let reviewCount = reviewCountResponse.data.reviewCount;
            if (isNaN(averageRating)) {
              averageRating = 0;
            }
            return { ...product, averageRating, reviewCount };
          } catch (error) {
            console.error("Error fetching average rating for product:", error);
            return product;
          }
        })
      );

      setProducts(productsWithAverageRating);
    } catch (error) {
      message.error("ไม่มีสินค้า");
      console.error("Error fetching products:", error);
    }
  };

  const fetchAverageRating = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/photographer/check-average-rating/:id",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        response.status === 200 &&
        response.data.message === "Average rating is 5.0"
      ) {
        // หากค่าเฉลี่ยของรีวิวเป็น 5.0 ให้ปรับราคาสินค้าลง 5%
        const updatedPrices = products.map((product) => {
          const updatedPrice = parseFloat(product.price) * 0.95; // ลดราคาลง 5%
          return updatedPrice.toFixed(2); // ปรับให้เป็นทศนิยม 2 ตำแหน่ง
        });
        setNewPrices(updatedPrices); // อัพเดทราคาใหม่
        console.log(updatedPrices);
      }
    } catch (error) {
      console.error("Error fetching average rating:", error);
      message.error("ไม่สามารถตรวจสอบค่าเฉลี่ยของรีวิวได้");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [id, selectedCategory]);

  useEffect(() => {
    fetchAverageRating();
  }, [products]);

  return (
    <div className="bg-[#f6f9fc]">
      <div className="flex flex-wrap justify-center">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => handleCategoryChange(category.value)}
            className={`bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded flex items-center justify-center m-2 md:w-auto`}
          >
            <img
              src={category.image}
              className="w-6 h-6 mr-2"
              alt={category.label}
            />
            <span className="hidden md:inline">{category.label}</span>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-4 "
            onClick={() => handleProductClick(product.id)}
          >
            <a href="#">
              <img
                className="p-8 rounded-t-lg w-full w-52 h-52 object-cover object-right"
                src={product.imageUrls[0]}
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5 ">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {product.product_name}
                </h5>
              </a>
              <Stack direction="row" spacing={1} alignItems="center">
                <span className="text-lg text-gray-600">
                  {product.averageRating}
                </span>
                <Rating
                  name="read-only"
                  value={product.averageRating}
                  precision={0.1}
                  readOnly
                />
                <span className="text-lg text-gray-600">
                  ({product.reviewCount} รีวิว)
                </span>
              </Stack>
              <div className="flex items-center mt-2.5 mb-5">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  ค่าเช่า{" "}
                  {newPrices[index] ? (
                    <del className="text-gray-500">{product.price} บาท/วัน</del>
                  ) : (
                    `${product.price} บาท/วัน`
                  )}{" "}
                  {newPrices[index] && (
                    <span className="text-red-500">-5%</span>
                  )}
                </span>
                {newPrices[index] && (
                  <span className="text-xl font-bold text-gray-900 dark:text-white ml-2">
                    {newPrices[index]} บาท/วัน
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductAll;
