import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/saga-blue/theme.css"; // นำเข้า CSS ของ PrimeReact
import "primereact/resources/primereact.min.css"; // นำเข้า CSS ของ PrimeReact
import { MultiSelect } from "primereact/multiselect";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { Image } from "antd";
import axios from "axios";
import Swal from "sweetalert2";

function FormVerifyRent() {
  const StepOne = ({ nextStep, handleChange, values, setValues }) => {
    const [Date, setSelectedDate] = useState(
      values.Date || null
    );


    const handleDateChange = (e) => {
      setSelectedDate(e.value);
      // ทำสิ่งที่คุณต้องการเมื่อวันที่เปลี่ยน
      setValues((prevValues) => ({
        ...prevValues,
        Date: e.value, // Save the selected date to the state
      }));
    };

    const getBase64 = (img, callback) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    };
    const beforeUpload = (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    };

    const [loading, setLoading] = useState(false);

    const [imgProfile, setimageProfile] = useState(values.imgProfile || null);
    const handleChanges = (info) => {
      if (info.file.status === "uploading") {
        setLoading(true);
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (url) => {
          setLoading(false);
          setimageProfile(url);
          setValues((prevValues) => ({
            ...prevValues,
            imgProfile: url,
          }));
        });
      }
    };
    const uploadButton = (
      <button
        style={{
          border: 0,
          background: "none",
        }}
        type="button"
      >
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div
          style={{
            marginTop: 8,
          }}
        >
          Upload
        </div>
      </button>
    );

    return (
      <div className="flex flex-col items-center py-10">
        <div className="field grid w-64">
          <label
            htmlFor="profileImage"
            className="col-fixed text-sm font-medium text-gray-700 mb-2"
          >
            รูปโปรไฟล์
          </label>

          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            beforeUpload={beforeUpload}
            onChange={handleChanges}
          >
            {imgProfile ? (
              <img
                src={imgProfile}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
        <div className="field grid w-64 mt-4">
          <label
            htmlFor="Name"
            className="col-fixed text-sm font-medium text-gray-700 mb-2"
          >
            ชื่อ-นามสกุล
          </label>
          <div className="col">
            <input
              type="text"
              id="Name"
              name="Name"
              value={values.Name}
              onChange={handleChange}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="field grid w-64 mt-4">
          <label
            htmlFor="birthdate"
            className="col-fixed text-sm font-medium text-gray-700 mb-2"
          >
            วันเกิด
          </label>
          <div className="col">
            <Calendar
              id="birthdate"
              name="birthdate"
              value={Date}
              onChange={handleDateChange}
              className="p-inputtext p-component border-gray-300 rounded-md"
              pt={{
                input: {
                  root: { className: "border-gray-300 rounded-md" },
                },
              }}
            />
          </div>
        </div>

        <div className="field grid w-64 mt-4">
          <label
            htmlFor="line"
            className="col-fixed text-sm font-medium text-gray-700 mb-2"
          >
            Line ID
          </label>
          <div className="col">
            <input
              type="text"
              id="line"
              name="line"
              value={values.line}
              onChange={handleChange}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <button
          onClick={nextStep}
          className="mt-8 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          ถัดไป
        </button>
      </div>
    );
  };

  const StepTwo = ({ nextStep, prevStep, handleChange, values }) => {
    return (
      <div className="flex flex-col items-center py-10">
        <div className="w-64">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            อีเมล
          </label>
          <input
            type="Email"
            name="Email"
            value={values.Email}
            onChange={handleChange}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="flex mt-8">
          <button
            onClick={prevStep}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 mr-4"
          >
            ย้อนกลับ
          </button>
          <button
            onClick={nextStep}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            ถัดไป
          </button>
        </div>
      </div>
    );
  };
  const StepThree = ({
    nextStep,
    prevStep,
    handleChange,
    values,
    setValues,
  }) => {
    const getBase64 = (img, callback) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    };
    const beforeUpload = (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    };

    const [loadingOne, setLoadingOne] = useState(false);
    const [imgFace, setimageFace] = useState(values.imgFace || null);
    const handleChangesOne = (info) => {
      if (info.file.status === "uploading") {
        setLoadingOne(true);
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (url) => {
          setLoadingOne(false);
          setimageFace(url);
          setValues((prevValues) => ({
            ...prevValues,
            imgFace: url,
          }));
        });
      }
    };

    const uploadButton = (
      <button
        style={{
          border: 0,
          background: "none",
        }}
        type="button"
      >
        {loadingOne ? <LoadingOutlined /> : <PlusOutlined />}
        <div
          style={{
            marginTop: 8,
          }}
        >
          Upload
        </div>
      </button>
    );

    const getBase64two = (img, callback) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    };
    const beforeUploadtwo = (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    };

    const [loadingtwo, setLoadingtwo] = useState(false);
    const [imgCard, setimageCardId] = useState(values.imgCard || null);

    const handleChangestwo = (info) => {
      if (info.file.status === "uploading") {
        setLoadingtwo(true);
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64two(info.file.originFileObj, (url) => {
          setLoadingtwo(false);
          setimageCardId(url);
          setValues((prevValues) => ({
            ...prevValues,
            imgCard: url,
          }));
        });
      }
    };
    const uploadButtontwo = (
      <button
        style={{
          border: 0,
          background: "none",
        }}
        type="button"
      >
        {loadingtwo ? <LoadingOutlined /> : <PlusOutlined />}
        <div
          style={{
            marginTop: 8,
          }}
        >
          Upload
        </div>
      </button>
    );
    return (
      <div className="flex flex-col items-center py-10">
        <div className="w-80">
          <label className="text-sm font-medium text-gray-700 mb-2">
            ชื่อ-นามสกุล
          </label>
          <input
            type="text"
            name="Name"
            value={values.Name}
            onChange={handleChange}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-3/4 sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="w-80 mt-4">
          <label className="text-sm font-medium text-gray-700 mb-2">
            ที่อยู่
          </label>
          <input
            type="text"
            name="Address"
            value={values.Address}
            onChange={handleChange}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="w-80 mt-4">
          <label className="text-sm font-medium text-gray-700 mb-2">
            รหัสบัตรประชาชน
          </label>
          <input
            type="text"
            name="CardNumber"
            value={values.CardNumber}
            onChange={handleChange}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="w-80 mt-4">
          <label className="text-sm font-medium text-gray-700 mb-2">
            รูปภาพบัตรประชาชน
          </label>

          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            beforeUpload={beforeUploadtwo}
            onChange={handleChangestwo}
          >
            {imgCard ? (
              <img
                src={imgCard}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButtontwo
            )}
          </Upload>
          
        </div>

        <div className="w-80 mt-4">
          <label className="text-sm font-medium text-gray-700 mb-2">
            รูปภาพหน้าจริง
          </label>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            beforeUpload={beforeUpload}
            onChange={handleChangesOne}
          >
            {imgFace ? (
              <img
                src={imgFace}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>

          
        </div>

        <div className="flex mt-8">
          <button
            onClick={prevStep}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 mr-4"
          >
            ย้อนกลับ
          </button>
          <button
            onClick={nextStep}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            ถัดไป
          </button>
        </div>
      </div>
    );
  };
  const StepFour = ({ prevStep, values }) => {
    const handleSubmit = () => {
      // Combine the data from all steps
      const postData = {
        ...values, // Include values from StepFour
        // Add any additional data you want to send
      };
  
      // Call the submitData function to send the data to the API
      submitLessor(postData);
    };
    const submitLessor = async (data) => {
      try {
        const token = localStorage.getItem("token");

      // Set up headers with the token
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
        // Replace 'YOUR_API_ENDPOINT' with the actual endpoint of your API
        const response = await axios.post("http://localhost:3001/api/VerifyEquipmentRental", data,{ headers });
        console.log("API Response:", response.data);
        Swal.fire({
          title: 'Success!',
          text: 'Data submitted successfully',
          icon: 'success',
        })
        // You can handle the response as needed
      } catch (error) {
        console.error("API Error:", error);
        // You can handle errors as needed
      }
    };
    return (
      <div className="w-full py-10">
        <div className="md:flex md:items-center mb-6 mt-3">
          <div className="md:w-1/3">
            <div className="text-sm font-medium text-gray-700">
              ชื่อ-นามสกุล:
            </div>
          </div>
          <div class="md:w-2/3">
            <div class=" ">{values.Name}</div>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6 mt-3">
          <div className="md:w-1/3">
            <div className="text-sm font-medium text-gray-700">วันเกิด:</div>
          </div>
          <div class="md:w-2/3">
            <div class=" ">
              {values.Date && values.Date.toDateString()}
            </div>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6 mt-3">
          <div className="md:w-1/3">
            <div className="text-sm font-medium text-gray-700">Line ID:</div>
          </div>
          <div class="md:w-2/3">
            <div class=" ">{values.line}</div>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6 mt-3">
          <div className="md:w-1/3">
            <div className="text-sm font-medium text-gray-700">อีเมล:</div>
          </div>
          <div class="md:w-2/3">
            <div class=" ">{values.Email}</div>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6 mt-3">
          <div className="md:w-1/3">
            <div className="text-sm font-medium text-gray-700">ที่อยู่:</div>
          </div>
          <div class="md:w-2/3">
            <div class=" ">{values.Address}</div>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6 mt-3">
          <div className="md:w-1/3">
            <div className="text-sm font-medium text-gray-700">
              รหัสบัตรประชาชน:
            </div>
          </div>
          <div class="md:w-2/3">
            <div class=" ">{values.CardNumber}</div>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6 mt-3">
          <div className="md:w-1/3">
            <div className="text-sm font-medium text-gray-700">รูปโปรไฟล์:</div>
          </div>
          <div class="md:w-2/3">
            <div class=" ">
              {values.imgProfile && (
                <Image
                  src={values.imgProfile}
                  alt="Profile"
                  width={120}
                  className="mt-4"
                />
              )}
            </div>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6 mt-3">
          <div className="md:w-1/3">
            <div className="text-sm font-medium text-gray-700">
              รูปบัตรประชาชน:
            </div>
          </div>
          <div class="md:w-2/3">
            <div class=" ">
              {values.imgCard && (
                <Image
                  src={values.imgCard}
                  alt="ID Card"
                  width={120}
                  className="mt-4"  
                />
              )}
            </div>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6 mt-3">
          <div className="md:w-1/3">
            <div className="text-sm font-medium text-gray-700">
              รูปหน้าจริง:
            </div>
          </div>
          <div class="md:w-2/3">
            <div class=" ">
              {values.imgFace && (
                <Image
                  src={values.imgFace}
                  alt="Face Image"
                  width={120}
                  className="mt-4"
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex mt-8">
          <button
            onClick={prevStep}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 mr-4"
          >
            ย้อนกลับ
          </button>
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            ยืนยันข้อมูล
          </button>
        </div>
      </div>
    );
  };

  // สร้างคอมโพเนนต์ของ sidebar
  const Sidebar = ({ step, setStep }) => {
    // สร้างฟังก์ชันสำหรับเปลี่ยน step ตามการคลิก
    const handleClick = (e) => {
      const { value } = e.target;
      setStep(Number(value));
    };
    // สร้างฟังก์ชันสำหรับเปลี่ยนสีของปุ่มตาม step ปัจจุบัน
    const getColor = (value) => {
      return step === value
        ? "bg-indigo-600 text-white"
        : "bg-gray-300 text-gray-700";
    };
    // ส่งคืนคอมโพเนนต์ของ sidebar
    return (
      <div className="flex flex-col items-center py-10">
        <button
          value={1}
          onClick={handleClick}
          className={`w-32 px-4 py-2 rounded-md hover:bg-indigo-700 ${getColor(
            1
          )}`}
        >
          ข้อมูลส่วนตัว
        </button>
        <button
          value={2}
          onClick={handleClick}
          className={`w-32 px-4 py-2 rounded-md hover:bg-indigo-700 mt-4 ${getColor(
            2
          )}`}
        >
          ยืนยัน Email
        </button>
        <button
          value={3}
          onClick={handleClick}
          className={`w-32 px-4 py-2 rounded-md hover:bg-indigo-700 mt-4 ${getColor(
            3
          )}`}
        >
          ยืนยันตัวตน
        </button>
        <button
          value={4}
          onClick={handleClick}
          className={`w-32 px-4 py-2 rounded-md hover:bg-indigo-700 mt-4 ${getColor(
            4
          )}`}
        >
          ยืนยันข้อมูล
        </button>
      </div>
    );
  };
  // สร้างคอมโพเนนต์หลักของ multistep form
  const MultiStepForm = () => {
    // สร้าง state สำหรับเก็บข้อมูลของแต่ละ step
    const [values, setValues] = useState({
      Name: "",
      
    });
    // สร้าง state สำหรับเก็บข้อมูลของ step ปัจจุบัน
    const [step, setStep] = useState(1);
    // สร้างฟังก์ชันสำหรับเปลี่ยน step ไปข้างหน้า
    const nextStep = () => {
      setStep((prevStep) => prevStep + 1);
    };
    // สร้างฟังก์ชันสำหรับเปลี่ยน step ไปข้างหลัง
    const prevStep = () => {
      setStep((prevStep) => prevStep - 1);
    };
    // สร้างฟังก์ชันสำหรับเปลี่ยนแปลงข้อมูลใน state
    const handleChange = (e) => {
      const { name, value } = e.target;
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    };
    // สร้างฟังก์ชันสำหรับแสดงคอมโพเนนต์ของแต่ละ step
    const renderStep = () => {
      switch (step) {
        case 1:
          return (
            <StepOne
              nextStep={nextStep}
              handleChange={handleChange}
              values={values}
              setValues={setValues}
            />
          );
        case 2:
          return (
            <StepTwo
              nextStep={nextStep}
              prevStep={prevStep}
              handleChange={handleChange}
              values={values}
            />
          );
        case 3:
          return (
            <StepThree
              nextStep={nextStep}
              prevStep={prevStep}
              handleChange={handleChange}
              values={values}
              setValues={setValues}
            />
          );
        case 4:
          return <StepFour prevStep={prevStep} values={values} />;
        default:
          return <div>ไม่พบ step ที่ต้องการ</div>;
      }
    };
    // ส่งคืนคอมโพเนนต์ของ multistep form
    return (
      <div className="container mx-auto">
        <div className="flex">
          <div className="w-1/4">
            <Sidebar step={step} setStep={setStep} />
          </div>
          <div className="w-2/4">{renderStep()}</div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div>
        <MultiStepForm />
      </div>
    </div>
  );
}

export default FormVerifyRent;