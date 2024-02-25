import React, { useState, useEffect } from "react";
import axios from "axios";
import Rating from "@mui/material/Rating";
import { message } from "antd";
import { useParams } from "react-router-dom";

const Reveiws_Product = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [reviewData, setReviewData] = useState({
    reviewedId: id,
    rating: 0,
    comment: "",
  });

  const token = localStorage.getItem("token");
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/products/${id}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
      }
    };

    fetchReviews();
  }, [id]);

  const handleChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (event, newValue) => {
    setReviewData({ ...reviewData, rating: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ดึงข้อมูล role จาก Local Storage
      const role = localStorage.getItem("role");
      // ตั้งค่า reviewType ตาม role
      const reviewType = role === "photo" ? "product" : "rent_equipment";

      // สร้าง object ใหม่เพื่อส่งข้อมูลรีวิว
      const reviewDataToSend = {
        ...reviewData,
        reviewType: reviewType,
      };

      const response = await axios.post(
        "http://localhost:3001/api/reviews",
        reviewDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      message.success("รีวิวสำเร็จ");
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h2 className="text-2xl font-bold mb-4">รีวิวจากผู้เช่าสินค้า</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border p-4 rounded-lg shadow flex flex-col space-y-2"
          >
            <div className="flex justify-between items-center">
              <p className="font-bold">
                {review.user.firstname} {review.user.lastname}
              </p>
              <p>{formatDate(review.createdAt)}</p>
            </div>
            <Rating name="read-only" value={review.rating} readOnly />
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
      <div className="max-w-md">
      <h2 className="text-2xl font-bold mb-4 mt-4">เพิ่มรีวิว</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="rating" className="block mb-2 font-semibold">
            คะแนน
          </label>
          <Rating
            name="rating"
            value={reviewData.rating}
            onChange={handleRatingChange}
          />
        </div>
        <div>
          <label htmlFor="comment" className="block mb-2 font-semibold">
            ความคิดเห็น
          </label>
          <textarea
            id="comment"
            name="comment"
            value={reviewData.comment}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            ส่งรีวิว
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Reveiws_Product;
