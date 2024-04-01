import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import Swal from "sweetalert2";

const provinceOptions1 = [
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

const Profile_Rent_EditForm = () => {
  const [profileData, setProfileData] = useState({
    username: "",
    about: "",
    lineId: "",
    Facebook: "",
    Instagram: "",
    Tel: "",
    province: [],
  });

  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const token = localStorage.getItem("token");
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    // Function to fetch profile data
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/getMeRentalProfile/:id",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); // Replace :id with the actual user ID
        const { rentEquipmentProfile } = response.data;
        if (rentEquipmentProfile.province) {
          const provinceData = rentEquipmentProfile.province;
          // Remove surrounding square brackets
          const trimmedProvinceData = provinceData.substring(
            1,
            provinceData.length - 1
          );
          // Remove double quotes function
          const removeDoubleQuotes = (province) =>
            province.replace(/"/g, "").trim();
          // Split, map, and remove double quotes
          rentEquipmentProfile.province = trimmedProvinceData
            .split(",")
            .map(removeDoubleQuotes)
            .map((province) => ({ value: province, label: province }));
        }

        setProfileData(rentEquipmentProfile);
        if (rentEquipmentProfile.imgProfileURL) {
          setProfileImage(rentEquipmentProfile.imgProfileURL);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleProvinceChange = (selectedOption) => {
    setProfileData({
      ...profileData,
      province: selectedOption,
    });
  };

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      const { originFileObj } = info.file;
      setProfileImage(originFileObj);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(originFileObj);
    }
  };

  const handleUploadImage = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);

    // Add the new image to the fileList
    setFileList([{ originFileObj: file }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("username", profileData.username);
    formData.append("about", profileData.about);
    formData.append("lineId", profileData.lineId);
    formData.append("Facebook", profileData.Facebook);
    formData.append("Instagram", profileData.Instagram);
    formData.append("Tel", profileData.Tel);
    const selectedProvinces = profileData.province.map(
      (province) => province.value
    );

    // Append selected provinces to form data
    selectedProvinces.forEach((provinceValue) => {
      formData.append("province", provinceValue); // Assuming 'province' is an array in the backend
    });
    if (fileList.length > 0) {
      formData.append("imgProfile", fileList[0].originFileObj);
    }

    try {
      const response = await axios.patch(
        "http://localhost:3001/api/updateProfileRentEquipment",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Profile has been updated successfully.",
      });
      // Handle success (e.g., show success message)
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error (e.g., show error message)
    } finally {
      setLoading(false);
    }
  };

  // Function to handle modal visibility
  const showModal = () => {
    setModalVisible(true);
  };

  // Function to handle modal closing
  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <div className="container mx-auto max-w-screen-lg p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl mb-2 sm:mb-4">
        Edit Rent Equipment Profile
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">  
          <div>
            <label htmlFor="profileImage" className="block">
              Profile Image:
            </label>
            
            <Upload
              listType="picture-card"
              fileList={[]}
              beforeUpload={(file) => {
                handleUploadImage(file); // เมื่อเลือกรูปภาพใหม่จะทำการแสดงรูปภาพใหม่ทันที
                return false; // ไม่ต้องอัปโหลดไฟล์
              }}
              onChange={handleImageChange}
              className="text-center"
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="profile"
                  style={{ width: "100%" }}
                /> // แสดงรูปภาพใหม่
              ) : (
                <div>
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="preview"
                      style={{ width: "100%" }}
                    /> // แสดงรูปภาพที่ผู้ใช้เลือกไว้แต่ยังไม่ได้อัปโหลด
                  ) : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </div>
              )}
            </Upload>
          </div>
          <div className="flex flex-wrap">
          <div className="w-full sm:w-1/2 pr-2">
            <label htmlFor="username" className="block">
              Username:
            </label>
            <input
              type="text"
              name="username"
              value={profileData.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-full sm:w-1/2 pr-2">
            <label htmlFor="about" className="block">
              About:
            </label>
            <textarea
              name="about"
              value={profileData.about}
              onChange={handleChange}
              placeholder="About"
              required
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          <div className="w-full sm:w-1/2 pr-2">
            <label htmlFor="lineId" className="block">
              Line ID:
            </label>
            <input
              type="text"
              name="lineId"
              value={profileData.lineId}
              onChange={handleChange}
              placeholder="Line ID"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-full sm:w-1/2 pr-2">
            <label htmlFor="Facebook" className="block">
              Facebook:
            </label>
            <input
              type="text"
              name="Facebook"
              value={profileData.Facebook}
              onChange={handleChange}
              placeholder="Facebook"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-full sm:w-1/2 pr-2">
            <label htmlFor="Instagram" className="block">
              Instagram:
            </label>
            <input
              type="text"
              name="Instagram"
              value={profileData.Instagram}
              onChange={handleChange}
              placeholder="Instagram"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-full sm:w-1/2 pr-2">
            <label htmlFor="Tel" className="block">
              Telephone:
            </label>
            <input
              type="text"
              name="Tel"
              value={profileData.Tel}
              onChange={handleChange}
              placeholder="Telephone"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-full sm:w-1/2 pr-2">
            <div className="form-group">
              <label htmlFor="province">Province:</label>
              <Select
                value={profileData.province}
                onChange={handleProvinceChange}
                options={provinceOptions1}
                isMulti
                placeholder="Select province"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-blue-500 text-white p-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile_Rent_EditForm;
