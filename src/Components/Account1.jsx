import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";
import Swal from "sweetalert2";
import Profile_Photographer from "./Profile_Photographer";

function Account1() {
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const animatedComponents = makeAnimated();

  // สร้างอาร์เรย์ของตัวเลือก
  const options = [
    { value: "ถ่ายภาพบุคคล", label: "ถ่ายภาพบุคคล" },
    { value: "ถ่ายภาพงานอีเว้นท์", label: "ถ่ายภาพงานอีเว้นท์" },
    { value: "ถ่ายภาพทิวทัศน์และสิ่งปลูกสร้าง", label: "ถ่ายภาพทิวทัศน์และสิ่งปลูกสร้าง" },
    { value: "ถ่ายภาพทางอากาศ", label: "ถ่ายภาพทางอากาศ" },
    { value: "ถ่ายภาพสินค้า", label: "ถ่ายภาพสินค้า" },
    { value: "ถ่ายภาพอาหาร", label: "ถ่ายภาพอาหาร" },
    { value: "ถ่ายภาพอสังหาริมทรัพย์", label: "ถ่ายภาพอสังหาริมทรัพย์" },
    { value: "ถ่ายภาพไลฟ์สไตล์และแฟชั่น", label: "ถ่ายภาพไลฟ์สไตล์และแฟชั่น" },
  ];

  const thaiProvinces = [
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

  // สร้าง state สำหรับเก็บค่าที่เลือก
  const [selected, setSelected] = useState([]);
  // สร้างฟังก์ชันสำหรับจัดการการเลือกและยกเลิกเลือก
  const handleChanged = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  // สร้าง state สำหรับเก็บค่าที่เลือก
  const [selected2, setSelected2] = useState([]);
  // สร้างฟังก์ชันสำหรับจัดการการเลือกและยกเลิกเลือก
  const handleChanged2 = (selectedOptions2) => {
    setSelected2(selectedOptions2);
  };
  // สร้างฟังก์ชันสำหรับแสดงค่าที่เลือก
  const displaySelected = () => {
    if (selected.length > 0) {
      return selected.map((option) => option.value).join(", ");
    } else {
      return "ไม่มีค่าที่เลือก";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract data from the form
    const formData = new FormData();
    formData.append("username", e.target.username.value);
    formData.append("about", e.target.about.value);
    formData.append("lineId", e.target.lineId.value);
    formData.append("Facebook", e.target.Facebook.value);
    formData.append("Instagram", e.target.Instagram.value);
    formData.append("Tel", e.target.Tel.value);
    formData.append(
      "selectedOptions",
      selected.map((option) => option.value)
    );
    formData.append(
      "selectedOptions2",
      selected2.map((option) => option.value)
    );

    // Append the image file to FormData
    if (fileList.length > 0) {
      formData.append("imgProfile", fileList[0].originFileObj);
    }

    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Add this header for file upload
      };

      // Now, send the complete form data to the server
      const response = await axios.post(
        "http://localhost:3001/api/accountprofile",
        formData,
        { headers }
      );

      // Handle the response as needed
      console.log("Response from server:", response.data);
      Swal.fire({
        title: "Success!",
        text: "Data submitted successfully",
        icon: "success",
      });
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error submitting form:", error);
    }
  };

  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  useEffect(() => {
    const getStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          "http://localhost:3001/api/getStatusPhotographer",
          { headers }
        );
        setStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching status:", error);
        setError(error);
        setIsFormDisabled(true);
      }
    };

    getStatus();
  }, []);

  const renderAlert = () => {
    if (status === 'pending' || error) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">แจ้งเตือน!</strong>
          <span className="block sm:inline">
            {error ? ' คุณยังไม่ได้ยืนยันตัวตน กรุณายืนยันตัวตน' : ' โปรไฟล์ของคุณจะยังไม่แสดงหน้าเว็บไซต์ ถ้าหากแอดมินยังไม่อนุมัติการยืนยันตัวตนของคุณ'}
          </span>
        </div>
      );
    } else {
      return null;
    }
  };

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // ดึงข้อมูลโปรไฟล์จาก API
        const response = await axios.get(
          "http://localhost:3001/api/getDataProfile",
          { headers }
        );

        // เซ็ตข้อมูลโปรไฟล์ลงใน state
        setProfileData(response.data.photographerProfile);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!loading && profileData) {
    return (
      <div>
        <Profile_Photographer />
      </div>
    );
  } else {
    return (
      <div className="mx-auto h-auto pt-4 px-20 flex flex-col items-center">
        {renderAlert()}
        <h1 className="text-3xl font-bold text-start mb-4 pt-4">โปรไฟล์</h1>
        <div className="container mx-auto max-w-screen-lg p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="flex-grow w-full">
          <div className="space-y-6 h-full overflow-y-auto">
            <div className="border-b border-gray-900/10 pb-12">
              <div
                className="mt-10"
                style={{ margin: "auto", textAlign: "center" }}
              >
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-circle"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </div>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
                centered
              >
                <img
                  alt="example"
                  style={{
                    width: "100%",
                  }}
                  src={previewImage}
                />
              </Modal>

              <div className="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ชื่อผู้ใช้
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                        easyphoto.com/
                      </span>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        disabled={isFormDisabled}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    คำแนะนำตัวเอง
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                      disabled={isFormDisabled}
                    />
                  </div>
                  {/* <p className="mt-3 text-sm leading-6 text-gray-600">
                    ความยาวไม่เกิน 200 ตัวอักษร
                  </p> */}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <h1 className="text-xl font-bold mb-2">ประเภทงานที่รับ</h1>
                  <Select
                    className="w-96"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={options}
                    onChange={handleChanged}
                    placeholder="เลือกตัวเลือกที่คุณต้องการ..."
                    isDisabled={isFormDisabled}
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <h1 className="text-xl font-bold mb-2">จังหวัดที่รับงาน</h1>
                  <Select
                    className="w-96"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={thaiProvinces}
                    onChange={handleChanged2}
                    placeholder="เลือกตัวเลือกที่คุณต้องการ..."
                    isDisabled={isFormDisabled}
                  />
                </div>
              </div>
            </div>
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ชื่อ - นามสกุลจริง
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      disabled={isFormDisabled}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="lineId"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    LINE ID
                  </label>
                  <div className="mt-2">
                    <input
                      id="lineId"
                      name="lineId"
                      type="lineId"
                      autoComplete="lineId"
                      disabled={isFormDisabled}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="lineId"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Facebook
                  </label>
                  <div className="mt-2">
                    <input
                      id="Facebook"
                      name="Facebook"
                      type="Facebook"
                      autoComplete="Facebook"
                      disabled={isFormDisabled}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="lineId"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Instagram
                  </label>
                  <div className="mt-2">
                    <input
                      id="Instagram"
                      name="Instagram"
                      type="Instagram"
                      autoComplete="Instagram"
                      disabled={isFormDisabled}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="Tel"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    เบอร์โทรศัพท์
                  </label>
                  <div className="mt-2">
                    <input
                      id="Tel"
                      name="Tel"
                      type="Tel"
                      autoComplete="Tel"
                      disabled={isFormDisabled}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 mb-6 flex items-center justify-center gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
        </div>
      </div>
    );
  }
}

export default Account1;
