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
          "http://localhost:3001/api/getAllRentProfiles",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfiles(response.data.RentEquipmentProfiles);
      } catch (error) {
        console.error("Error fetching rent profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  return (
    // <div className="flex flex-wrap justify-center">
      <div class="flex flex-wrap h-[100vh] ">
      {profiles.map((profile) => (
            <div 
            key={profile.username}
             class="relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
                <div class="relative flex h-32 w-full justify-center rounded-xl bg-cover" >
                    <img src='https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png' class="absolute flex h-32 w-full justify-center rounded-xl bg-cover"/> 
                    <div class="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                        <img class="h-full w-full rounded-full" src={profile.imgProfileURL} alt="" />
                    </div>
                </div> 
                <div class="mt-16 flex flex-col items-center">
                    <h4 class="text-xl font-bold text-navy-700 dark:text-white">
                    {profile.username}
                    </h4>
                    {/* <p class="text-base font-normal text-gray-600">Product Manager</p> */}
                </div> 
                <Link to={`/EquipmentRental/${profile.id}`}>
            <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
              ดูข้อมูลเพิ่มเติม
            </button>
          </Link>
                {/* <div class="mt-6 mb-3 flex gap-14 md:!gap-14">
                    <div class="flex flex-col items-center justify-center">
                    <p class="text-2xl font-bold text-navy-700 dark:text-white">17</p>
                    <p class="text-sm font-normal text-gray-600">Posts</p>
                    </div>
                    <div class="flex flex-col items-center justify-center">
                    <p class="text-2xl font-bold text-navy-700 dark:text-white">
                        9.7K
                    </p>
                    <p class="text-sm font-normal text-gray-600">Followers</p>
                    </div>
                    <div class="flex flex-col items-center justify-center">
                    <p class="text-2xl font-bold text-navy-700 dark:text-white">
                        434
                    </p>
                    <p class="text-sm font-normal text-gray-600">Following</p>
                    </div>
                </div> */}
            </div>  
            ))}
        </div>
      
    // </div>
  );
};

export default ForrentAll;
