import React, { useEffect, useState } from "react";
import axios from "axios";

function PhotographerAll() {
  const [photoProfiles, setPhotoProfiles] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // เรียก API เพื่อดึงข้อมูลผู้ใช้ที่มีบทบาทเป็น "photo"
    axios
      .get(`http://localhost:3000/photos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPhotoProfiles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="grid gap-2 lg:grid-cols-4 p-10">
      {photoProfiles.map((profile, key) => (
        <div
          className="w-full rounded-lg shadow-md lg:max-w-sm  "
          key={profile.id}
        >
          <img
            className="mx-auto w-32 h-32 mt-6 relative border-4 border-gray/40 rounded-full overflow-hidden"
            src="https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
            alt="Profile image"
          />
          <div className="p-4">
            <h4 className="text-xl font-semibold text-blue-600">
              {profile.firstname}
            </h4>
            <p className="mb-2 leading-normal">{profile.lastname}</p>
            <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
              ดูข้อมูลเพิ่มเติม
            </button>
          </div>
        </div>
      ))}
    </div>

  );
}




// <div>
        //     <h2>Photograhper</h2>
        //     <div className="photograhper-profiles">
        //         {photoProfiles.map((profile) => (
        //             <div key={profile.id} className="card">
        //                 <h3>{profile.firstname} {profile.lastname}</h3>
        //                 <p>Email: {profile.email}</p>
        //                 <p>Role: {profile.role}</p>
        //             </div>
        //         ))}
        //     </div>
        // </div>

export default PhotographerAll;
