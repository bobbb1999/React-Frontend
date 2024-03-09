import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaFacebook, FaInstagram, FaLine } from "react-icons/fa";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function Profile_Photographer() {
  const { id } = useParams();
  const [photographerProfile, setPhotographerProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchPhotographerProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3001/api/getMePhotographerProfile/${id}`,
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
    const fetchWorkings = async () => {
      try {
        const token = localStorage.getItem("token");
        const user_id = photographerProfile.user_id;
        const response = await axios.get(
          `http://localhost:3001/api/getworkings/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const imageGalleries = response.data.workings.map((working) => {
          return {
            images: working.imageUrls.map((url) => {
              return {
                original: url,
                thumbnail: url,
              };
            }),
            work_name: working.work_name,
            description: working.description,
          };
        });
        setImageUrls(imageGalleries);
      } catch (error) {
        console.error("Error fetching workings:", error);
      }
    };

    if (photographerProfile) {
      fetchWorkings();
    }
  }, [id, photographerProfile]);

  useEffect(() => {
    const getStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          "http://localhost:3001/api/getStatusPhotographer",
          { headers }
        );
        setStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    getStatus();
  }, []);

  const renderAlert = () => {
    if (status === "pending") {
      return (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">แจ้งเตือน!</strong>
          <span className="block sm:inline">
            {
              " โปรไฟล์ของคุณจะยังไม่แสดงหน้าเว็บไซต์ ถ้าหากแอดมินยังไม่อนุมัติการยืนยันตัวตนของคุณ"
            }
          </span>
        </div>
      );
    } else {
      return null;
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!photographerProfile) {
    return <p>PhotographerProfile not found</p>;
  }

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      {/* Profile Section */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Profile Photographer
        </h2>
        {renderAlert()}
        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <Link
                to={`/EditProfilePhotographer`}
                className="font-medium text-blue-500 hover:text-blue-700"
              >
                แก้ไขโปรไฟล์
              </Link>
            </li>
          </ol>
        </nav>
      </div>

      {/* Profile Card */}
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
          {/* Profile Information */}
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {photographerProfile.username}
            </h3>
            <p className="font-medium">{photographerProfile.selectedOptions}</p>
            <div className="mx-auto max-w-180">
              <h4 className="font-semibold text-black dark:text-white">
                About Me
              </h4>
              <p className="mt-4.5 mx-auto text-left max-w-max">
                {photographerProfile.about &&
                  photographerProfile.about.split("\n").map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
              </p>
            </div>
            {/* Social Media Links */}
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

      {/* Works Section */}
      <div className="mt-6.5">
        <h4 className="mb-3.5 font-medium text-black dark:text-white">Works</h4>
      </div>

      {/* Image Gallery */}
      {imageUrls.map((working, index) => (
        <div
          key={index}
          className="my-4 flex flex-col sm:flex-row border border-gray-300 rounded-lg shadow-md"
        >
          <div className="w-full sm:w-1/2 p-4">
            <h2 className="font-semibold">{working.work_name}</h2>
            <p>{working.description}</p>
          </div>
          <div className="w-full sm:w-1/2">
            <ImageGallery items={working.images} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Profile_Photographer;
