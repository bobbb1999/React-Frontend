import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { FaFacebook, FaInstagram, FaLine } from "react-icons/fa";

const jobTypesOptions1 = [
  { value: "ถ่ายภาพบุคคล", label: "ถ่ายภาพบุคคล" },
  { value: "ถ่ายภาพงานอีเว้นท์", label: "ถ่ายภาพงานอีเว้นท์" },
  {
    value: "ถ่ายภาพทิวทัศน์และสิ่งปลูกสร้าง",
    label: "ถ่ายภาพทิวทัศน์และสิ่งปลูกสร้าง",
  },
  { value: "ถ่ายภาพทางอากาศ", label: "ถ่ายภาพทางอากาศ" },
  { value: "ถ่ายภาพสินค้า", label: "ถ่ายภาพสินค้า" },
  { value: "ถ่ายภาพอาหาร", label: "ถ่ายภาพอาหาร" },
  { value: "ถ่ายภาพอสังหาริมทรัพย์", label: "ถ่ายภาพอสังหาริมทรัพย์" },
  { value: "ถ่ายภาพไลฟ์สไตล์และแฟชั่น", label: "ถ่ายภาพไลฟ์สไตล์และแฟชั่น" },
];
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

function Profile_Photo_EditForm() {
  const [formData, setFormData] = useState({
    username: "",
    selectedOptions: [],
    selectedOptions2: [],
    about: "",
    Facebook: "",
    Instagram: "",
    lineId: "",
    fileList: [],
  });
  const [loading, setLoading] = useState(true);
  const animatedComponents = makeAnimated();
  const { id } = useParams();

  useEffect(() => {
    const fetchPhotographerProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3001/api/getMePhotographerProfile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const photographerProfile = response.data.photographerProfile;

        // Split string values to arrays for selectedOptions and selectedOptions2
        const selectedOptionsArray =
          photographerProfile.selectedOptions.split(",");
        const selectedOptions2Array =
          photographerProfile.selectedOptions2.split(",");

        // Map the arrays to the appropriate format for react-select
        const selectedOptions = selectedOptionsArray.map((option) => ({
          value: option.trim(),
          label: option.trim(),
        }));

        const selectedOptions2 = selectedOptions2Array.map((option) => ({
          value: option.trim(),
          label: option.trim(),
        }));

        setFormData({
          username: photographerProfile.username,
          selectedOptions: selectedOptions,
          selectedOptions2: selectedOptions2,
          about: photographerProfile.about,
          Facebook: photographerProfile.Facebook,
          Instagram: photographerProfile.Instagram,
          lineId: photographerProfile.lineId,
          fileList: [],
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching PhotographerProfile:", error);
        setLoading(false);
      }
    };

    fetchPhotographerProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = ({ fileList }) => {
    setFormData((prevData) => ({
      ...prevData,
      fileList,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const selectedOptionsValues = formData.selectedOptions.map(
        (option) => option.value
      );
      const selectedOptions2Values = formData.selectedOptions2.map(
        (option) => option.value
      );

      const updatedFormData = {
        ...formData,
        selectedOptions: selectedOptionsValues,
        selectedOptions2: selectedOptions2Values,
      };
      await axios.patch(
        "http://localhost:3001/api/updateProfilePhotographer",
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Handle success, maybe redirect or show a success message
    } catch (error) {
      console.error("Error updating PhotographerProfile:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-auto h-auto pt-4 px-20 flex flex-col items-center dark:bg-black shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Form Content */}
        <div className="space-y-12">
          {/* Upload Profile Picture */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-12">
            <div
              className="mt-10 flex"
              style={{ margin: "auto", textAlign: "center" }}
            >
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-circle"
                fileList={formData.fileList}
                onChange={handleFileChange}
                className="cursor-pointer"
              >
                {formData.fileList.length >= 1 ? null : (
                  <button
                    className="flex flex-col items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                )}
              </Upload>
              {/* Preview Modal */}
              <Modal
                visible={false}
                title={formData.fileList[0]?.name}
                footer={null}
                onCancel={() => {}}
                centered
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={formData.fileList[0]?.preview}
                />
              </Modal>
            </div>
            {/* Rest of the form fields */}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md  dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  About
                </label>
                <textarea
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md w-full dark:bg-gray-700 dark:text-white"
                  rows="8"
                ></textarea>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  Maximum length: 200 characters
                </p>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="selectedOptions"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Selected Options
                </label>
                <Select
                  id="selectedOptions"
                  name="selectedOptions"
                  value={formData.selectedOptions} // กำหนดค่า value ให้เป็น formData.selectedOptions
                  components={animatedComponents}
                  onChange={(selectedOptions) =>
                    setFormData({ ...formData, selectedOptions })
                  }
                  options={jobTypesOptions1}
                  isMulti
                  className="text-gray-700 dark:text-gray-300"
                />
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="selectedOptions2"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Selected Options 2
                </label>
                <Select
                  id="selectedOptions2"
                  name="selectedOptions2"
                  value={formData.selectedOptions2} // กำหนดค่า value ให้เป็น formData.selectedOptions2
                  components={animatedComponents}
                  onChange={(selectedOptions2) =>
                    setFormData({ ...formData, selectedOptions2 })
                  }
                  options={provinceOptions1}
                  isMulti
                  className="text-gray-700 dark:text-gray-300"
                />
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="Facebook"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Facebook
                </label>
                <input
                  type="text"
                  id="Facebook"
                  name="Facebook"
                  value={formData.Facebook}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="Instagram"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Instagram
                </label>
                <input
                  type="text"
                  id="Instagram"
                  name="Instagram"
                  value={formData.Instagram}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="lineId"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Line ID
                </label>
                <input
                  type="text"
                  id="lineId"
                  name="lineId"
                  value={formData.lineId}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <div className="mt-6 mb-6 flex items-center justify-center gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile_Photo_EditForm;
