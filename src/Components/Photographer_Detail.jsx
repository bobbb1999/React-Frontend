import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaFacebook, FaInstagram, FaLine } from "react-icons/fa";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { message } from "antd";
import Swal from "sweetalert2";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

function Photographer_Detail() {
  const { id } = useParams();
  const [photographerProfile, setPhotographerProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [reviewsData, setReviewsData] = useState([]);
  const [selectedWorkingId, setSelectedWorkingId] = useState(null);
  const [rating, setRating] = useState(0); // เพิ่ม state สำหรับ rating
  const [comment, setComment] = useState(""); // เพิ่ม state สำหรับ comment
  const useridlogin = localStorage.getItem("useridlogin");

  useEffect(() => {
    const fetchPhotographerProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3001/api/getPhotographerProfile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPhotographerProfile(response.data.photographerProfile);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching PhotographerProfile:", error);
        setLoading(false);
      }
    };

    fetchPhotographerProfile();
  }, [id]);

  useEffect(() => {
    const fetchWorkingsAndReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        const user_id = photographerProfile.user_id;

        const [workingsResponse, reviewsResponse] = await Promise.all([
          axios.get(`http://localhost:3001/api/getworkings/${user_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(`http://localhost:3001/api/getreview_workings/${user_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const imageGalleries = workingsResponse.data.workings.map((working) => {
          return {
            images: working.imageUrls.map((url) => {
              return {
                original: url,
                thumbnail: url,
              };
            }),
            work_name: working.work_name,
            description: working.description,
            employer_id: working.employer_id,
            id: working.id,
          };
        });
        setImageUrls(imageGalleries);

        setReviewsData(reviewsResponse.data.reviews);

      } catch (error) {
        console.error("Error fetching workings and reviews:", error);
      }
    };

    if (photographerProfile) {
      fetchWorkingsAndReviews();
    }
  }, [id, photographerProfile]);


  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.get(
  //         `http://localhost:3001/api/getreview_workings/${user_id}`, // Fetch reviews for the photographer
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       setReviewsData(response.data.reviews);
  //     } catch (error) {
  //       console.error("Error fetching reviews:", error);
  //     }
  //   };

  //   if (photographerProfile) {
  //     fetchReviews();
  //   }
  // }, [id, photographerProfile]);

  const handleHirePhotographer = async () => {
    try {
      if (!jobDescription.trim()) {
        message.error("Please enter a job description");
        return;
      }

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3001/api/user/job-hiring",
        {
          photographerId: photographerProfile.user_id,
          job_description: jobDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "ส่งข้อมูลการจ้างงานสำเร็จ",
      });

      setShowModal(false);
      console.log("Job hiring success:", response.data);
    } catch (error) {
      console.error("Error hiring photographer:", error);
    }
  };

  const handleReview = async (index) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3001/api/review_workings",
        {
          photographer_id: photographerProfile.user_id,
          working_id: imageUrls[index].id,
          rating: rating,
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Review submitted successfully");
      
      // หลังจากรีวิวสำเร็จ อัพเดท reviewsData ด้วยข้อมูลรีวิวล่าสุด
      fetchWorkingsAndReviews();
  
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  


  const handleRatingChange = (newValue, index) => {
    const updatedReviewsData = [...reviewsData];
    updatedReviewsData[index] = {
      ...updatedReviewsData[index],
      rating: newValue,
    };
    setReviewsData(updatedReviewsData);
  };

  const handleCommentChange = (value, index) => {
    const updatedReviewsData = [...reviewsData];
    updatedReviewsData[index] = {
      ...updatedReviewsData[index],
      comment: value,
    };
    setReviewsData(updatedReviewsData);
  };

  const handleSelectWorking = (workingId) => {
    setSelectedWorkingId(workingId);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!photographerProfile) {
    return <p>PhotographerProfile not found</p>;
  }

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Profile Photographer
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          จ้างงานช่างภาพ
        </button>
      </div>

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="flex flex-wrap justify-center">
            <div className="w-4/12 sm:w-2/12 px-4">
              <img
                src={photographerProfile.imgProfileURL}
                alt="Photographer Profile"
                className="shadow rounded-full max-w-full h-auto align-middle border-none"
              />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {photographerProfile.username}
            </h3>
            <p className="font-medium">
              {photographerProfile.selectedOptions &&
                photographerProfile.selectedOptions}
            </p>
            <div className="mx-auto max-w-180">
              <h4 className="font-semibold text-black dark:text-white">
                About Me
              </h4>
              <p className="mt-4.5">
                {photographerProfile.about &&
                  photographerProfile.about.split("\n").map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
              </p>
            </div>
            <div className="mt-6.5">
              <h4 className="mb-3.5 font-medium text-black dark:text-white">
                Follow me on
              </h4>
            </div>
            <div className="mt-6.5 flex items-center justify-center space-x-4">
              {photographerProfile.Facebook && (
                <a
                  href={photographerProfile.Facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 flex flex-col items-center space-x-1"
                >
                  <FaFacebook size={24} />
                  <span>{photographerProfile.Facebook}</span>
                </a>
              )}
              {photographerProfile.Instagram && (
                <a
                  href={`https://www.instagram.com/${photographerProfile.Instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-700 flex flex-col items-center space-x-1"
                >
                  <FaInstagram size={24} />
                  <span>{photographerProfile.Instagram}</span>
                </a>
              )}
              {photographerProfile.lineId && (
                <a
                  href={`https://line.me/ti/p/${photographerProfile.lineId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-700 flex flex-col items-center space-x-1"
                >
                  <FaLine size={24} />
                  <span>{photographerProfile.lineId}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">จ้างงานช่างภาพ</h2>
            <label>รายละเอียดการจ้างงาน</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full h-32 border border-gray-300 rounded-md p-2 mb-4"
              placeholder="ใส่รายละเอียดการจ้างงาน"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 mr-4 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleHirePhotographer}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6.5">
        <h4 className="mb-3.5 font-medium text-black dark:text-white">ผลงาน</h4>
      </div>
      {imageUrls.map((working, index) => (
        <div
          key={index}
          className="my-4 flex flex-col sm:flex-row border border-gray-300 rounded-lg shadow-md"
        >
          <div className="w-full sm:w-1/2 p-4">
            <h2 className="font-semibold">{working.work_name}</h2>
            <p>{working.description}</p>

            {/* ฟอร์มรีวิว */}
            {useridlogin && working.employer_id === parseInt(useridlogin) && !reviewsData.some(review => review.working_id === working.id) && (
              <div className="mt-4 w-3/4">
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <legend>Rate this working</legend>
                  <Rating
                    name={`rating-${working.id}`}
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
                  />
                </Box>
                <textarea
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  placeholder="Add your comment..."
                  className="w-full h-20 border border-gray-300 rounded-md p-2 mt-2"
                />
                <button
                  onClick={() => handleReview(index)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600"
                >
                  Submit Review
                </button>
              </div>
            )}


            {/* แสดงรีวิว */}
            {reviewsData.map((review, reviewIndex) => {
              if (review.working_id === working.id) {
                return (
                  <div key={reviewIndex} className="mt-4 border border-gray-300 rounded p-4">
                    <p><strong>{review.user.firstname} {review.user.lastname}</strong></p>
                    <Rating name="read-only" value={review.rating} readOnly />
                    <p>{review.comment}</p>
                  </div>
                );
              }
              return null;
            })}

          </div>

          <div className="w-full sm:w-1/2">
            <ImageGallery items={working.images} />
          </div>
        </div>
      ))}

    </div>
  );
}

export default Photographer_Detail;
