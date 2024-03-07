import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForrentAll = () => {
  const [profiles, setProfiles] = useState([]);
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/getAllRentProfilesAndStatus",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfiles(response.data);
      } catch (error) {
        console.error("Error fetching rent profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className="flex flex-wrap h-[100vh]">
      {profiles.map((profile) => (
        <div key={profile.user_id} className="relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
          <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
            <img src='https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png' className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"/> 
            <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
              <img className="h-full w-full rounded-full" src={profile.RentEquipmentProfile.imgProfileURL} alt="" />
            </div>
          </div> 
          <div className="mt-16 flex flex-col items-center">
            <h4 className="text-xl font-bold text-navy-700 dark:text-white">
              {profile.RentEquipmentProfile.username}
            </h4>
          </div> 
          <Link to={`/EquipmentRental/${profile.user_id}`}>
            <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
              ดูข้อมูลเพิ่มเติม
            </button>
          </Link>
        </div>  
      ))}
    </div>
  );
};

export default ForrentAll;
