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
    { value: "Portraits", label: "ถ่ายภาพบุคคล" },
    { value: "Event", label: "ถ่ายภาพงานอีเว้นท์" },
    { value: "Landscapes", label: "ถ่ายภาพทิวทัศน์และสิ่งปลูกสร้าง" },
    { value: "Aerial", label: "ถ่ายภาพทางอากาศ" },
    { value: "Product", label: "ถ่ายภาพสินค้า" },
    { value: "Food", label: "ถ่ายภาพอาหาร" },
    { value: "Realty", label: "ถ่ายภาพอสังหาริมทรัพย์" },
    { value: "Fashion", label: "ถ่ายภาพไลฟ์สไตล์และแฟชั่น" },
  ];
  const provinceOptions = [
    { value: "BKK", label: "กรุงเทพมหานคร" },
    { value: "SPK", label: "สมุทรปราการ" },
    { value: "NBI", label: "นนทบุรี" },
    { value: "PTE", label: "ปทุมธานี" },
    { value: "AYA", label: "พระนครศรีอยุธยา" },
    { value: "ATG", label: "อ่างทอง" },
    { value: "LRI", label: "ลพบุรี" },
    { value: "SBR", label: "สิงห์บุรี" },
    { value: "CNT", label: "ชัยนาท" },
    { value: "SRI", label: "สระบุรี" },
    { value: "CBI", label: "ชลบุรี" },
    { value: "RYG", label: "ระยอง" },
    { value: "CTI", label: "จันทบุรี" },
    { value: "TRT", label: "ตราด" },
    { value: "CCO", label: "ฉะเชิงเทรา" },
    { value: "PRI", label: "ปราจีนบุรี" },
    { value: "NYK", label: "นครนายก" },
    { value: "SKW", label: "สระแก้ว" },
    { value: "NMA", label: "นครราชสีมา" },
    { value: "BRM", label: "บุรีรัมย์" },
    { value: "SRN", label: "สุรินทร์" },
    { value: "SSK", label: "ศรีสะเกษ" },
    { value: "UBN", label: "อุบลราชธานี" },
    { value: "YST", label: "ยโสธร" },
    { value: "CPM", label: "ชัยภูมิ" },
    { value: "ACR", label: "อำนาจเจริญ" },
    { value: "BKN", label: "บึงกาฬ" },
    { value: "NBP", label: "หนองบัวลำภู" },
    { value: "KKN", label: "ขอนแก่น" },
    { value: "UDN", label: "อุดรธานี" },
    { value: "LEI", label: "เลย" },
    { value: "NKI", label: "หนองคาย" },
    { value: "MKM", label: "มหาสารคาม" },
    { value: "RET", label: "ร้อยเอ็ด" },
    { value: "KSN", label: "กาฬสินธุ์" },
    { value: "SNK", label: "สกลนคร" },
    { value: "NPM", label: "นครพนม" },
    { value: "MDH", label: "มุกดาหาร" },
    { value: "CMI", label: "เชียงใหม่" },
    { value: "LPN", label: "ลำพูน" },
    { value: "LPG", label: "ลำปาง" },
    { value: "UTD", label: "อุตรดิตถ์" },
    { value: "PRE", label: "แพร่" },
    { value: "NAN", label: "น่าน" },
    { value: "PYO", label: "พะเยา" },
    { value: "CRI", label: "เชียงราย" },
    { value: "MSN", label: "แม่ฮ่องสอน" },
    { value: "NSN", label: "นครสวรรค์" },
    { value: "UTI", label: "อุทัยธานี" },
    { value: "KPT", label: "กำแพงเพชร" },
    { value: "TAK", label: "ตาก" },
    { value: "STI", label: "สุโขทัย" },
    { value: "PLK", label: "พิษณุโลก" },
    { value: "PCT", label: "พิจิตร" },
    { value: "PNB", label: "เพชรบูรณ์" },
    { value: "RBR", label: "ราชบุรี" },
    { value: "KRI", label: "กาญจนบุรี" },
    { value: "SPB", label: "สุพรรณบุรี" },
    { value: "NPT", label: "นครปฐม" },
    { value: "SKN", label: "สมุทรสาคร" },
    { value: "SKM", label: "สมุทรสงคราม" },
    { value: "PBI", label: "เพชรบุรี" },
    { value: "PKN", label: "ประจวบคีรีขันธ์" },
    { value: "NRT", label: "นครศรีธรรมราช" },
    { value: "KBI", label: "กระบี่" },
    { value: "PNA", label: "พังงา" },
    { value: "PKT", label: "ภูเก็ต" },
    { value: "SNI", label: "สุราษฎร์ธานี" },
    { value: "RNG", label: "ระนอง" },
    { value: "CPN", label: "ชุมพร" },
    { value: "SKA", label: "สงขลา" },
    { value: "STN", label: "สตูล" },
    { value: "TRG", label: "ตรัง" },
    { value: "PLG", label: "พัทลุง" },
    { value: "PTN", label: "ปัตตานี" },
    { value: "YLA", label: "ยะลา" },
    { value: "NWT", label: "นราธิวาส" },
  ];

  useEffect(() => {
    const fetchAllProfilesData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3001/api/getAllPhotographerProfiles",
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
          `http://localhost:3001/api/photographer/average-rating/${photographerId}`
        );
        setAverageRatings((prevRatings) => ({
          ...prevRatings,
          [photographerId]: response.data.averageRating,
        }));
      } catch (error) {
        console.error("Error fetching average rating:", error);
      }
    };

    if (allProfilesData) {
      allProfilesData.photographerProfiles.forEach((profile) => {
        fetchAverageRating(profile.id);
      });
    }
  }, [allProfilesData]);

  useEffect(() => {
    const fetchReviewCount = async (photographerId) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/photographer/getReviewCount/${photographerId}`
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
      allProfilesData.photographerProfiles.forEach((profile) => {
        fetchReviewCount(profile.id);
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
        <div className="mt-4 flex items-center justify-center">
          
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
          {allProfilesData.photographerProfiles.map((profile) => {
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
                (averageRatings[profile.id] !== undefined &&
                  averageRatings[profile.id] >= selectedRating)) && (
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
                    {averageRatings[profile.id] === undefined ||
                    isNaN(averageRatings[profile.id]) ? (
                      <Stack direction="row" spacing={1} alignItems="center">
                        <span className="text-lg text-gray-600">0</span>
                        <Rating
                          name="read-only"
                          value={0}
                          precision={0.1}
                          readOnly
                        />
                        <span>({ReviewCounts[profile.id] || 0} รีวิว)</span>
                      </Stack>
                    ) : (
                      <Stack direction="row" spacing={1} alignItems="center">
                        <span className="text-lg text-gray-600">
                          {averageRatings[profile.id]}
                        </span>
                        <Rating
                          name="read-only"
                          value={averageRatings[profile.id]}
                          precision={0.1}
                          readOnly
                        />
                        <span>({ReviewCounts[profile.id] || 0} รีวิว)</span>
                      </Stack>
                    )}

                    <Link to={`/Photograhpers/${profile.id}`}>
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
