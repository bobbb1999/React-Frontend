import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";
import Swal from 'sweetalert2';

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
    { value: "Portraits", label: "ถ่ายภาพบุคคล" },
    { value: "Event", label: "ถ่ายภาพงานอีเว้นท์" },
    { value: "Landscapes", label: "ถ่ายภาพทิวทัศน์และสิ่งปลูกสร้าง"},
    { value: "Aerial", label: "ถ่ายภาพทางอากาศ" },
    { value: "Product", label: "ถ่ายภาพสินค้า" },
    { value: "Food", label: "ถ่ายภาพอาหาร" },
    { value: "Realty", label: "ถ่ายภาพอสังหาริมทรัพย์" },
    { value: "Fashion", label: "ถ่ายภาพไลฟ์สไตล์และแฟชั่น" },
  ];

  const thaiProvinces = [
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
    formData.append("selectedOptions", selected.map((option) => option.value));
    formData.append("selectedOptions2", selected2.map((option) => option.value));
  
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
      const response = await axios.post("http://localhost:3001/api/accountprofile", formData, { headers });
  
      // Handle the response as needed
      console.log("Response from server:", response.data);
      Swal.fire({
        title: 'Success!',
        text: 'Data submitted successfully',
        icon: 'success',
      });
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error submitting form:", error);
    }
  };
  

  return (
    <div className="mx-auto h-auto pt-20 px-20 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-start mb-4">แก้ไขข้อมูลโปรไฟล์</h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
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

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
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
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  ความยาวไม่เกิน 200 ตัวอักษร
                </p>
              </div>
              <div className="col-span-full">
                <h1 className="text-xl font-bold mb-2">ประเภทงานที่รับ</h1>
                <Select
                  className="w-96"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={options}
                  onChange={handleChanged}
                  placeholder="เลือกตัวเลือกที่คุณต้องการ..."
                />
              </div>

              <div className="col-span-full">
                <h1 className="text-xl font-bold mb-2">จังหวัดที่รับงาน</h1>
                <Select
                  className="w-96"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={thaiProvinces}
                  onChange={handleChanged2}
                  placeholder="เลือกตัวเลือกที่คุณต้องการ..."
                />
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ชื่อ - นามสกุลจริง *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
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
  );
}

export default Account1;