import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Galleria } from "primereact/galleria";
import { Button } from "primereact/button";

function Photographer_Detail() {
  const { id } = useParams();
  const [photographerProfile, setPhotographerProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [activeIndexes, setActiveIndexes] = useState({});
  const galleria = useRef();

  const options = [
    { value: "Portraits", label: "ถ่ายภาพบุคคล" },
    { value: "Event", label: "ถ่ายภาพงานอีเว้นท์" },
    { value: "Landscapes", label: "ถ่ายภาพทิวทัศน์และสิ่งปลูกสร้าง" },
    { value: "Aerial", label: "ถ่ายภาพทางอากาศ" },
    { value: "Product", label: "ถ่ายภาพสินค้า" },
    { value: "Food", label: "ถ่ายภาพอาหาร" },
    { value: "Realty", label: "ถ่ายภาพอสังหาริมทรัพย์" },
    { value: "Fashion", label: "ถ่ายภาพไลฟ์สไตล์และแฟชั่น" },
  ];

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
    const fetchWorkings = async () => {
      try {
        const token = localStorage.getItem("token");
        const user_id = photographerProfile.user_id; // ดึง user_id จาก photographerProfile
        const response = await axios.get(
          `http://localhost:3001/api/getworkings/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              
            },
          }
        );
        setImageUrls(response.data.workings);
      } catch (error) {
        console.error("Error fetching workings:", error);
      }
    };
  
    if (photographerProfile) { // ตรวจสอบว่ามีข้อมูล photographerProfile มาแล้ว
      fetchWorkings();
    }
  }, [id, photographerProfile]);

  useEffect(() => {
    if (imageUrls.length > 0) {
      const initialIndexes = {};
      imageUrls.forEach((working, index) => {
        initialIndexes[index] = 0;
      });
      setActiveIndexes(initialIndexes);
    }
  }, [imageUrls]);

  const itemTemplate = (item) => {
    return (
      <img
        src={item}
        alt="Work"
        style={{ width: "100%", display: "block" }}
        className="p-shadow-2"
      />
    );
  };

  // Define the thumbnail template for Galleria
  const thumbnailTemplate = (item) => {
    return (
      <img
        src={item}
        alt="Work"
        style={{ width: "100%", display: "block" }}
        className="p-shadow-2"
      />
    );
  };
  const handleShowImages = (workingIndex) => {
    setActiveIndexes((prevIndexes) => ({
      ...prevIndexes,
      [workingIndex]: imageUrls[workingIndex].imageUrls[0],
    }));
    galleria.current.show();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!photographerProfile) {
    return <p>PhotographerProfile not found</p>;
  }

  return (
    <>
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            Profile Photograhper
          </h2>

          {/* <nav>
              <ol className="flex items-center gap-2">
                <li>
                  <a className="font-medium" href="/">
                    Dashboard /
                  </a>
                </li>
                <li className="font-medium text-primary">Profile</li>
              </ol>
            </nav> */}
        </div>
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="flex flex-wrap justify-center">
              <div className="w-4/12 sm:w-2/12 px-4">
                <img
                  src={photographerProfile.imgProfileURL}
                  alt="imgProfileURL"
                  className="shadow rounded-full max-w-full h-auto align-middle border-none"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                {photographerProfile.username}
              </h3>

              <p className="font-medium">
                {photographerProfile.selectedOptions}
              </p>

              <div className="mx-auto max-w-180">
                <h4 className="font-semibold text-black dark:text-white">
                  About Me
                </h4>
                <p className="mt-4.5">{photographerProfile.about}</p>
              </div>
              <div className="mt-6.5">
                <h4 className="mb-3.5 font-medium text-black dark:text-white">
                  Follow me on
                </h4>
              </div>
            </div>
          </div>
        </div>
        {/* Display images */}
        <div className="mt-6.5">
          <h4 className="mb-3.5 font-medium text-black dark:text-white">
            Works
          </h4>
          {imageUrls.map((working, index) => (
            <div key={index} className="flex items-start gap-6 mb-8">
              <div className="w-2/3">
                <h5 className="text-xl font-semibold mb-2">
                  {working.work_name}
                </h5>
                {working.description &&
                  working.description.split("\n").map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
                {/* Add a button to show the Galleria */}
                <Button
                  label="Show"
                  icon="pi pi-external-link"
                  onClick={() => galleria.current.show()}
                />
              </div>
              <div className="w-1/3 rounded shadow overflow-hidden">
                {/* Add a Galleria component with a ref */}
                <Galleria
                  ref={galleria}
                  value={working.imageUrls}
                  activeIndex={activeIndexes[index]}
                  onItemChange={(e) =>
                    setActiveIndexes((prevIndexes) => ({
                      ...prevIndexes,
                      [index]: e.index,
                    }))
                  }
                  showThumbnails
                  showItemNavigators
                  item={itemTemplate}
                  thumbnail={thumbnailTemplate}
                  style={{ maxWidth: "100%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Photographer_Detail;
