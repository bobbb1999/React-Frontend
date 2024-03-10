import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLine , FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
const Profile_Rent = () => {
  const [profileData, setProfileData] = useState({});
  const { id } = useParams();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3001/api/getMeRentalProfile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfileData(response.data.rentEquipmentProfile);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <nav>
          <ol className="flex items-center gap-2">
            <li>
              <Link
                to={`/EditProfileRent`}
                className="font-medium text-blue-500 hover:text-blue-700"
              >
                แก้ไขโปรไฟล์
              </Link>
            </li>
          </ol>
        </nav>
      <div className="flex flex-col items-center">
        <img
          className="w-32 h-32 rounded-full object-cover"
          src={`${profileData.imgProfileURL}`}
          alt="Profile"
        />
        <h2 className="text-xl font-semibold mt-4">{profileData.username}</h2>
        <p className="text-gray-500 text-sm mt-1">{profileData.province}</p>
      </div>

      <div className="mt-6.5">
        <h4 className="mb-3.5 font-medium text-black dark:text-white">
          Follow me on
        </h4>
      </div>
      <div className="mt-6.5 flex items-center justify-center space-x-4">
        {profileData.Facebook && (
          <a
            href={profileData.Facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 flex flex-col items-center space-x-1"
          >
            <FaFacebook size={24} />
            <span>{profileData.Facebook}</span>
          </a>
        )}
        {profileData.Instagram && (
          <a
            href={`https://www.instagram.com/${profileData.Instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-700 flex flex-col items-center space-x-1"
          >
            <FaInstagram size={24} />
            <span>{profileData.Instagram}</span>
          </a>
        )}
        {profileData.lineId && (
          <a
            href={`https://line.me/ti/p/${profileData.lineId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-700 flex flex-col items-center space-x-1"
          >
            <FaLine size={24} />
            <span>{profileData.lineId}</span>
          </a>
        )}
        {profileData.Tel && (
          <a
            href={`https://line.me/ti/p/${profileData.Tel}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 flex flex-col items-center space-x-1"
          >
            <FaPhone size={24} />
            <span>{profileData.Tel}</span>
          </a>
        )}
        
      </div>

      <div className="mt-4">
        <p className="text-gray-700">
          {profileData.about &&
            profileData.about.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
        </p>
      </div>
    </div>
  );
};

export default Profile_Rent;

