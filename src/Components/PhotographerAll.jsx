import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";


const PhotographerAll = () => {
  const [allProfilesData, setAllProfilesData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptions2, setSelectedOptions2] = useState([]);
  const [averageRatings, setAverageRatings] = useState({});
  const [ReviewCounts, setReviewCounts] = useState({});
  const [selectedRating, setSelectedRating] = useState(null);
  const [hover, setHover] = useState(-1);

  const jobTypesOptions = [
    { value: "ถ่ายภาพบุคคล", label: "ถ่ายภาพบุคคล" },
    { value: "ถ่ายภาพงานอีเว้นท์", label: "ถ่ายภาพงานอีเว้นท์" },
    { value: "ถ่ายภาพทิวทัศน์และสิ่งปลูกสร้าง", label: "ถ่ายภาพทิวทัศน์และสิ่งปลูกสร้าง" },
    { value: "ถ่ายภาพทางอากาศ", label: "ถ่ายภาพทางอากาศ" },
    { value: "ถ่ายภาพสินค้า", label: "ถ่ายภาพสินค้า" },
    { value: "ถ่ายภาพอาหาร", label: "ถ่ายภาพอาหาร" },
    { value: "ถ่ายภาพอสังหาริมทรัพย์", label: "ถ่ายภาพอสังหาริมทรัพย์" },
    { value: "ถ่ายภาพไลฟ์สไตล์และแฟชั่น", label: "ถ่ายภาพไลฟ์สไตล์และแฟชั่น" },
  ];
  const provinceOptions = [
    { value: "กรุงเทพมหานคร", label: "กรุงเทพมหานคร" },
    { value: "สมุทรปราการ", label: "สมุทรปราการ" },
    { value: "นนทบุรี", label: "นนทบุรี" },
    { value: "ปทุมธานี", label: "ปทุมธานี" },
    { value: "พระนครศรีอยุธยา", label: "พระนครศรีอยุธยา" },
    { value: "อ่างทอง", label: "อ่างทอง" },
    { value: "ลพบุรี", label: "ลพบุรี" },
    { value: "สิงห์บุรี", label: "สิงห์บุรี" },
    { value: "ชัยนาท", label: "ชัยนาท" },
    { value: "สระบุรี", label: "สระบุรี" },
    { value: "ชลบุรี", label: "ชลบุรี" },
    { value: "ระยอง", label: "ระยอง" },
    { value: "จันทบุรี", label: "จันทบุรี" },
    { value: "ตราด", label: "ตราด" },
    { value: "ฉะเชิงเทรา", label: "ฉะเชิงเทรา" },
    { value: "ปราจีนบุรี", label: "ปราจีนบุรี" },
    { value: "นครนายก", label: "นครนายก" },
    { value: "สระแก้ว", label: "สระแก้ว" },
    { value: "นครราชสีมา", label: "นครราชสีมา" },
    { value: "บุรีรัมย์", label: "บุรีรัมย์" },
    { value: "สุรินทร์", label: "สุรินทร์" },
    { value: "ศรีสะเกษ", label: "ศรีสะเกษ" },
    { value: "อุบลราชธานี", label: "อุบลราชธานี" },
    { value: "ยโสธร", label: "ยโสธร" },
    { value: "ชัยภูมิ", label: "ชัยภูมิ" },
    { value: "อำนาจเจริญ", label: "อำนาจเจริญ" },
    { value: "บึงกาฬ", label: "บึงกาฬ" },
    { value: "หนองบัวลำภู", label: "หนองบัวลำภู" },
    { value: "ขอนแก่น", label: "ขอนแก่น" },
    { value: "อุดรธานี", label: "อุดรธานี" },
    { value: "เลย", label: "เลย" },
    { value: "หนองคาย", label: "หนองคาย" },
    { value: "มหาสารคาม", label: "มหาสารคาม" },
    { value: "ร้อยเอ็ด", label: "ร้อยเอ็ด" },
    { value: "กาฬสินธุ์", label: "กาฬสินธุ์" },
    { value: "สกลนคร", label: "สกลนคร" },
    { value: "นครพนม", label: "นครพนม" },
    { value: "มุกดาหาร", label: "มุกดาหาร" },
    { value: "เชียงใหม่", label: "เชียงใหม่" },
    { value: "ลำพูน", label: "ลำพูน" },
    { value: "ลำปาง", label: "ลำปาง" },
    { value: "อุตรดิตถ์", label: "อุตรดิตถ์" },
    { value: "แพร่", label: "แพร่" },
    { value: "น่าน", label: "น่าน" },
    { value: "พะเยา", label: "พะเยา" },
    { value: "เชียงราย", label: "เชียงราย" },
    { value: "แม่ฮ่องสอน", label: "แม่ฮ่องสอน" },
    { value: "นครสวรรค์", label: "นครสวรรค์" },
    { value: "อุทัยธานี", label: "อุทัยธานี" },
    { value: "กำแพงเพชร", label: "กำแพงเพชร" },
    { value: "ตาก", label: "ตาก" },
    { value: "สุโขทัย", label: "สุโขทัย" },
    { value: "พิษณุโลก", label: "พิษณุโลก" },
    { value: "พิจิตร", label: "พิจิตร" },
    { value: "เพชรบูรณ์", label: "เพชรบูรณ์" },
    { value: "ราชบุรี", label: "ราชบุรี" },
    { value: "กาญจนบุรี", label: "กาญจนบุรี" },
    { value: "สุพรรณบุรี", label: "สุพรรณบุรี" },
    { value: "นครปฐม", label: "นครปฐม" },
    { value: "สมุทรสาคร", label: "สมุทรสาคร" },
    { value: "สมุทรสงคราม", label: "สมุทรสงคราม" },
    { value: "เพชรบุรี", label: "เพชรบุรี" },
    { value: "ประจวบคีรีขันธ์", label: "ประจวบคีรีขันธ์" },
    { value: "นครศรีธรรมราช", label: "นครศรีธรรมราช" },
    { value: "กระบี่", label: "กระบี่" },
    { value: "พังงา", label: "พังงา" },
    { value: "ภูเก็ต", label: "ภูเก็ต" },
    { value: "สุราษฎร์ธานี", label: "สุราษฎร์ธานี" },
    { value: "ระนอง", label: "ระนอง" },
    { value: "ชุมพร", label: "ชุมพร" },
    { value: "สงขลา", label: "สงขลา" },
    { value: "สตูล", label: "สตูล" },
    { value: "ตรัง", label: "ตรัง" },
    { value: "พัทลุง", label: "พัทลุง" },
    { value: "ปัตตานี", label: "ปัตตานี" },
    { value: "ยะลา", label: "ยะลา" },
    { value: "นราธิวาส", label: "นราธิวาส" },
  ];

  useEffect(() => {
    const fetchAllProfilesData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3001/api/getAllPhotographerProfilesAndStatus",
          {
            headers: {
              Authorization: `Bearer ${token}`, // แทน yourAuthToken ด้วย token ของคุณ
            },
          }
        );

        setAllProfilesData(response.data);
      } catch (error) {
        console.error("Error fetching PhotographerProfiles data:", error);
      }
    };

    fetchAllProfilesData();
  }, []); // ให้ useEffect ทำงานเฉพาะครั้งแรก

  useEffect(() => {
    const fetchAverageRating = async (photographerId) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/photographer/avg-rating/${photographerId}`
        );
        setAverageRatings((prevRatings) => ({
          ...prevRatings,
          [photographerId]: response.data.averageRating,
        }));
      } catch (error) {
        console.error("Error fetching average rating:", error);
      }
    };
  
    const fetchReviewCount = async (photographerId) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/photographer/ReviewCount/${photographerId}`
        );
        setReviewCounts((prevCounts) => ({
          ...prevCounts,
          [photographerId]: response.data.reviewCount,
        }));
      } catch (error) {
        console.error("Error fetching review count:", error);
      }
    };
  
    if (allProfilesData) {
      allProfilesData.forEach((profileData) => {
        const photographerId = profileData.photographerProfiles.user_id; // เปลี่ยน user_id เป็น id
        fetchAverageRating(photographerId);
        fetchReviewCount(photographerId);
      });
    }
  }, [allProfilesData]);
  

  const handleSelectChange = (selectedOptions, actionMeta) => {
    console.log("Selected Options:", selectedOptions);
    if (actionMeta.name === "selectedOptions") {
      setSelectedOptions(selectedOptions);
    } else if (actionMeta.name === "selectedOptions2") {
      setSelectedOptions2(selectedOptions);
    }
  };

  const handleRatingChange = (newRating) => {
    setSelectedRating(newRating);
  };

  return (
    <div>
      <div className="border rounded p-4 w-2/4 mx-auto mt-4 ">
        <Select
          options={jobTypesOptions}
          isMulti
          name="selectedOptions"
          onChange={(selectedOptions, actionMeta) =>
            handleSelectChange(selectedOptions, actionMeta)
          }
          value={selectedOptions}
          placeholder="เลือกประเภทงาน"
        />
        <div className="mt-4">
          <Select
            options={provinceOptions}
            isMulti
            name="selectedOptions2"
            onChange={(selectedOptions2, actionMeta) =>
              handleSelectChange(selectedOptions2, actionMeta)
            }
            value={selectedOptions2}
            placeholder="เลือกจังหวัด"
          />
        </div>
        <div className="mt-4 flex ">
          <span>ค้นหาช่างภาพจากคะแนนรวม : </span>
          <Rating
            name="search-rating"
            value={selectedRating}
            onChange={(event, newRating) => {
              handleRatingChange(newRating);
            }}
            precision={0.5} // เพิ่มความละเอียดให้คะแนนอยู่ที่ 0.5
            size="large" // ขนาดของ Rating
            emptyIcon={<StarBorderIcon className="text-yellow-400" />} // ไอคอนที่ไม่ได้รับการเติมคะแนน
            icon={<StarIcon className="text-yellow-500" />} // ไอคอนที่ได้รับการเติมคะแนน
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            
          />
          
        </div>
      </div>

      {allProfilesData ? (
  <div className="grid gap-2 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 p-10">
    {allProfilesData.map((profileData) => {
      const profile = profileData.photographerProfiles; // เปลี่ยนจาก allProfilesData.photographerProfiles เป็น profileData.photographerProfiles

      const filterOptions = selectedOptions.map((option) => option.value);
      const filterOptions2 = selectedOptions2.map(
        (option) => option.value
      );

      return (
        (filterOptions.length === 0 ||
          filterOptions.some((option) =>
            profile.selectedOptions.includes(option)
          )) &&
        (filterOptions2.length === 0 ||
          filterOptions2.some((option) =>
            profile.selectedOptions2.includes(option)
          )) &&
        (selectedRating === null ||
          (averageRatings[profile.user_id] !== undefined &&
            averageRatings[profile.user_id] >= selectedRating)) && (
          // รายการผ่านการกรองจากคะแนนดาวที่ถูกเลือก
          <div
            className="w-full rounded-lg shadow-md lg:max-w-sm"
            key={profile.id}
          >
            <img
              className="mx-auto w-32 h-32 mt-6 relative border-4 border-gray/40 rounded-full overflow-hidden"
              src={profile.imgProfileURL}
              alt="Profile image"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold text-blue-600">
                {profile.username}
              </h4>
              {averageRatings[profile.user_id] === undefined ||
              isNaN(averageRatings[profile.user_id]) ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <span className="text-lg text-gray-600">0</span>
                  <Rating
                    name="read-only"
                    value={0}
                    precision={0.1}
                    readOnly
                  />
                  <span>({ReviewCounts[profile.user_id] || 0} รีวิว)</span>
                </Stack>
              ) : (
                <Stack direction="row" spacing={1} alignItems="center">
                  <span className="text-lg text-gray-600">
                    {averageRatings[profile.user_id]}
                  </span>
                  <Rating
                    name="read-only"
                    value={averageRatings[profile.user_id]}
                    precision={0.1}
                    readOnly
                  />
                  <span>({ReviewCounts[profile.user_id] || 0} รีวิว)</span>
                </Stack>
              )}

              <Link to={`/Photograhpers/${profile.id}`}> {/* แก้จาก '/Photograhpers/${profile.id}' เป็น '/Photographers/${profile.id}' */}
                <button className="mt-4 px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                  ดูข้อมูลเพิ่มเติม
                </button>
              </Link>
            </div>
          </div>
        )
      );
    })}
  </div>
) : (
  <p>Loading...</p>
)}

    </div>
  );
};

export default PhotographerAll;
