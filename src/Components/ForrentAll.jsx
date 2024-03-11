import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Select from "react-select";


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

const ForrentAll = () => {
  const [profiles, setProfiles] = useState([]);
  const token = localStorage.getItem("token");
  const [province, setprovince] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/getAllRentProfilesAndStatus",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              province: province.map(option => option.value).join(',') // ส่งค่าจังหวัดที่เลือกในรูปแบบของ string แบ่งด้วยเครื่องหมาย ","
            }
          }
        );
        setProfiles(response.data);
      } catch (error) {
        console.error("Error fetching rent profiles:", error);
      }
    };

    fetchProfiles();
  }, [province]);

  const handleSelectChange = (province, actionMeta) => {
    console.log("Selected Options:", province);
    if (actionMeta.name === "province") {
      setprovince(province);
    }
  };

  return (
    <div>
            <div className="border rounded p-4 w-2/4 mx-auto mt-4 ">
      <Select
        options={provinceOptions}
        isMulti
        name="province"
        onChange={(province, actionMeta) =>
          handleSelectChange(province, actionMeta)
        }
        value={province}
        placeholder="เลือกจังหวัด"
      />
      </div>
      <div className="flex flex-wrap h-[100vh]">
      {profiles
        .filter((profile) =>
          province.length === 0
            ? true // ถ้าไม่ได้เลือกจังหวัดใดๆ ให้แสดงทุกๆ ข้อมูล
            : province.some(
              (selectedProvince) =>
                profile.RentEquipmentProfile.province.includes(selectedProvince.value)
            )
        )
        .map((profile) => (
          <div
            key={profile.user_id}
            className="relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none"
          >
            <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
              <img
                src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
                className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
              />
              <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
              {profile.RentEquipmentProfile && (
              <img className="h-full w-full rounded-full" src={profile.RentEquipmentProfile.imgProfileURL} alt="" />
            )}
              </div>
            </div>
            <div className="mt-16 flex flex-col items-center">
            {profile.RentEquipmentProfile && (
              <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                {profile.RentEquipmentProfile.username}
              </h4>
              )}
            </div>
            <Link to={`/EquipmentRental/${profile.user_id}`}>
              <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
                ดูข้อมูลเพิ่มเติม
              </button>
            </Link>
          </div>
        ))}
    </div>
    </div>
  );
};

export default ForrentAll;

            