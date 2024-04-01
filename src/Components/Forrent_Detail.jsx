import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLine , FaPhone } from "react-icons/fa";

const Forrent_Detail = () => {
  const [profileData, setProfileData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3001/api/getEquipmentRentProfile/${id}`,
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
      <div className="flex flex-col items-center">
        <img
          className="w-32 h-32 rounded-full object-cover"
          src={`${profileData.imgProfileURL}`}
          alt="Profile"
        />
        <h2 className="text-xl font-semibold mt-4">{profileData.username}</h2>
        <span className="bg-green-500 text-white text-xs font-semibold py-1 px-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.293 13.293a1 1 0 0 1-1.414 0L4.293 9.707a1 1 0 1 1 1.414-1.414L9 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1 0 1.414z" clipRule="evenodd" />
          </svg>
          ยืนยันตัวตนแล้ว
        </span>
        <p className="text-gray-500 text-sm mt-1">{profileData.province}</p>
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
      <div className="mt-6.5">
        <h4 className="mb-3.5 font-medium text-black text-center dark:text-white">
          ติดต่อฉันได้ที่
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
    </div>
  );
};

export default Forrent_Detail;
