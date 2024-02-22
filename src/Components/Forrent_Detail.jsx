import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";


const Forrent_Detail = () => {
  const [profileData, setProfileData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:3001/api/getEquipmentRentProfile/${id}`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        setProfileData(response.data.rentEquipmentProfile);
      } catch (error) {
        console.error('Error fetching data:', error);
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
    <p className="text-gray-500 text-sm mt-1">{profileData.province}</p>
  </div>

  <div className="mt-4">
    <ul className="space-y-2">
      <li className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.316 3.051a1 1 0 01.668.075l3.467 2.251a1 1 0 01.288.849l-.744 4.999a1 1 0 01-.97.745H5.79a1 1 0 01-.97-.745l-.744-4.999a1 1 0 01.288-.849l3.467-2.251a1 1 0 01.668-.075zM15 11a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 011-1h2a1 1 0 011 1v2z"
            clipRule="evenodd"
          />
        </svg>
        <a
          href={`https://line.me/R/ti/p/${profileData.lineId}`}
          target="_blank"
          rel="noreferrer"
          className="ml-2 text-gray-500 hover:text-blue-500"
        >
          {profileData.lineId}
        </a>
      </li>

      <li className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M16 8a3 3 0 100-6 3 3 0 000 6zM2 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" />
        </svg>
        <a
          href={`https://www.facebook.com/${profileData.Facebook}`}
          target="_blank"
          rel="noreferrer"
          className="ml-2 text-gray-500 hover:text-blue-500"
        >
          {profileData.Facebook}
        </a>
      </li>
      <li className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18.5 8.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM12 5a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V5zM5 8a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V8z"
            clipRule="evenodd"
          />
        </svg>
        <a
          href={`https://www.instagram.com/${profileData.Instagram}`}
          target="_blank"
          rel="noreferrer"
          className="ml-2 text-gray-500 hover:text-blue-500"
        >
          {profileData.Instagram}
        </a>
      </li>

      <li className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M2 3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm2 2H3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V5a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <a href={`tel:${profileData.Tel}`} className="ml-2 text-gray-500 hover:text-blue-500">
          {profileData.Tel}
        </a>
      </li>
    </ul>
  </div>

  <div className="mt-4">
  <p className="text-gray-700">
    {profileData.about && profileData.about.split('\n').map((line, index) => (
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

export default Forrent_Detail;
