import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/saga-blue/theme.css"; // นำเข้า CSS ของ PrimeReact
import "primereact/resources/primereact.min.css"; // นำเข้า CSS ของ PrimeReact
import { MultiSelect } from "primereact/multiselect";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { Image } from "antd";

function FormVerify() {
  const StepOne = ({ nextStep, handleChange, values, setValues }) => {
    const [selectedDate, setSelectedDate] = useState(
      values.selectedDate || null
    );
    const [selectedJobs, setSelectedJobs] = useState(
      values.selectedJobs || null
    );

    const Jobs = [
      { name: "ถ่ายภาพบุคคล", code: "BK" },
      { name: "ถ่ายภาพงานอีเว้นท์", code: "EV" },
      { name: "ถ่ายภาพทิวทัศน์และสิ่งปลูกสร้าง", code: "TT" },
      { name: "ถ่ายภาพทางอากาศ", code: "AG" },
      { name: "ถ่ายภาพสินค้า", code: "SK" },
      { name: "ถ่ายภาพอาหาร", code: "RH" },
      { name: "ถ่ายภาพอสังหาริมทรัพย์", code: "AS" },
      { name: "ถ่ายภาพไลฟ์สไตล์และแฟชั่น", code: "FS" },
    ];

    const handleJobTypesChange = (e) => {
      setSelectedJobs(e.value);
      setValues((prevValues) => ({
        ...prevValues,
        selectedJobs: e.value, // เก็บประเภทงานที่รับใน state
      }));
    };

    const handleDateChange = (e) => {
      setSelectedDate(e.value);
      // ทำสิ่งที่คุณต้องการเมื่อวันที่เปลี่ยน
      setValues((prevValues) => ({
        ...prevValues,
        selectedDate: e.value, // Save the selected date to the state
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

    const [imageUrl, setImageUrl] = useState(values.imageUrl || null);
    const handleChanges = (info) => {
      if (info.file.status === "uploading") {
        setLoading(true);
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (url) => {
          setLoading(false);
          setImageUrl(url);
          setValues((prevValues) => ({
            ...prevValues,
            imageUrl: url,
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
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            beforeUpload={beforeUpload}
            onChange={handleChanges}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>

          {/* <div className="col">
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-2"
            />
            {values.profileImage && (
              <img
                src={URL.createObjectURL(values.profileImage)}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
          </div> */}
        </div>
        <div className="field grid w-64 mt-4">
          <label
            htmlFor="fullName"
            className="col-fixed text-sm font-medium text-gray-700 mb-2"
          >
            ชื่อ-นามสกุล
          </label>
          <div className="col">
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={values.fullName}
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
              value={selectedDate}
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
            htmlFor="lineId"
            className="col-fixed text-sm font-medium text-gray-700 mb-2"
          >
            Line ID
          </label>
          <div className="col">
            <input
              type="text"
              id="lineId"
              name="lineId"
              value={values.lineId}
              onChange={handleChange}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="field grid w-64 mt-4">
          <label
            htmlFor="jobTypes"
            className="col-fixed text-sm font-medium text-gray-700 mb-2"
          >
            ประเภทงานที่รับ
          </label>

          <div className="col">
            <MultiSelect
              id="jobTypes"
              name="jobTypes"
              value={selectedJobs}
              onChange={handleJobTypesChange}
              options={Jobs}
              maxSelectedLabels={2}
              optionLabel="name"
              display="chip"
              placeholder="Select Jobs"
              className="w-full md:w-20rem border-gray-300 rounded-md"
              pt={{
                root: {
                  className: "w-full md:w-14rem border-gray-500 rounded-md",
                },
                item: ({ context }) => ({
                  className: context.selected ? "bg-blue-100" : undefined,
                }),
              }}
            />
          </div>

          {/* <div className="col">
            <select
              id="jobTypes"
              name="jobTypes"
              value={values.jobTypes}
              onChange={handleChange}
              multiple
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
              <option value="portrait">ถ่ายภาพบุคคล</option>
              <option value="event">ถ่ายภาพงานอีเว้นท์</option>
              
            </select>
          </div> */}
        </div>
        {/* <div className="field grid w-64 mt-4">
          <label
            htmlFor="provinces"
            className="col-fixed text-sm font-medium text-gray-700 mb-2"
          >
            จังหวัดที่รับงาน
          </label>
          <div className="col">
            <select
              id="provinces"
              name="provinces"
              value={values.provinces}
              onChange={handleChange}
              multiple
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
              
            </select>
          </div>
        </div> */}
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
            type="email"
            name="email"
            value={values.email}
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
    const [imageUrlOne, setImageUrlOne] = useState(values.imageUrlOne || null);
    const handleChangesOne = (info) => {
      if (info.file.status === "uploading") {
        setLoadingOne(true);
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (url) => {
          setLoadingOne(false);
          setImageUrlOne(url);
          setValues((prevValues) => ({
            ...prevValues,
            imageUrlOne: url,
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
    const [imageUrltwo, setImageUrltwo] = useState(values.imageUrltwo || null);

    const handleChangestwo = (info) => {
      if (info.file.status === "uploading") {
        setLoadingtwo(true);
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64two(info.file.originFileObj, (url) => {
          setLoadingtwo(false);
          setImageUrltwo(url);
          setValues((prevValues) => ({
            ...prevValues,
            imageUrltwo: url,
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
            name="fullName"
            value={values.fullName}
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
            name="address"
            value={values.address}
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
            name="idCardNumber"
            value={values.idCardNumber}
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
            {imageUrltwo ? (
              <img
                src={imageUrltwo}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButtontwo
            )}
          </Upload>
          {/* <input
            type="file"
            accept="image/*"
            name="idCardImage"
            onChange={handleChange}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          /> */}
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
            {imageUrlOne ? (
              <img
                src={imageUrlOne}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>

          {/* <input
            type="file"
            accept="image/*"
            name="faceImage"
            onChange={handleChange}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          /> */}
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
    return (
      <div className="flex flex-col  py-10">
        <div className="row mt-3">
          <div className="text-sm font-medium text-gray-700 mb-2">
            ชื่อ-นามสกุล: {values.fullName}
          </div>
        </div>
        <p className="text-sm font-medium text-gray-700 mb-2">
          วันเกิด: {values.selectedDate && values.selectedDate.toDateString()}
        </p>
        <p className="text-sm font-medium text-gray-700 mb-2">
          Line ID: {values.lineId}
        </p>
        <p className="text-sm font-medium text-gray-700 mb-2">
          ประเภทงานที่รับ:{" "}
          {values.selectedJobs &&
            values.selectedJobs.map((job) => job.name).join(", ")}
        </p>
        <p className="text-sm font-medium text-gray-700 mb-2">
          อีเมล: {values.email}
        </p>
        <p className="text-sm font-medium text-gray-700 mb-2">
          ที่อยู่: {values.address}
        </p>
        <p className="text-sm font-medium text-gray-700 mb-2">
          รหัสบัตรประชาชน: {values.idCardNumber}
        </p>
        {/* แสดงรูปโปรไฟล์ */}
        {values.imageUrl && (
          <Image
            src={values.imageUrl}
            alt="Profile"
            width={200}
            className="mt-4"
          />
        )}

        {/* แสดงรูปบัตรประชาชน */}
        {values.imageUrltwo && (
          <Image
            src={values.imageUrltwo}
            alt="ID Card"
            width={200}
            className="mt-4"
          />
        )}

        {/* แสดงรูปหน้าจริง */}
        {values.imageUrlOne && (
          <Image
            src={values.imageUrlOne}
            alt="Face Image"
            width={200}
            className="mt-4"
          />
        )}

        <div className="flex mt-8">
          <button
            onClick={prevStep}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 mr-4"
          >
            ย้อนกลับ
          </button>
          <button
            // onClick={nextStep}
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
          ยืนยัน email
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
      fullName: "",
      jobTypes: [],
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

export default FormVerify;
