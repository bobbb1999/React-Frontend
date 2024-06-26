import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Datepicker from "tailwind-datepicker-react";
import axios from "axios";
import { message } from "antd";
import PinModal from "./PinModal";
import "../App.css";

// สร้าง schema สำหรับ validate ข้อมูล
const schema = yup.object().shape({
  name: yup
    .string()
    .required("กรุณากรอกชื่อ-นามสกุล")
    .matches(/^[ก-๙\s]+$/, "กรุณากรอกเป็นภาษาไทยเท่านั้น"),
  birthday: yup
    .date()
    .required("กรุณาเลือกวันเกิด")
    .max(new Date(), "วันเกิดต้องไม่เกินวันปัจจุบัน"),
  lineId: yup.string().required("กรุณากรอก Line ID"),
  email: yup.string().required("กรุณากรอกอีเมล").email("รูปแบบอีเมลไม่ถูกต้อง"),
  address: yup.string().required("กรุณากรอกที่อยู่"),
  idCard: yup.string().required("กรุณากรอก รหัสบัตรประชาชน"),
  imgidCard: yup
    .mixed()
    .required("กรุณาอัปโหลดรูปภาพบัตรประชาชน")
    .test(
      "fileSize",
      "ไฟล์ใหญ่เกินไป (ขนาดสูงสุด 2 MB)",
      (value) => value && value[0].size <= 2000000
    )
    .test(
      "fileType",
      "รูปแบบไฟล์ไม่ถูกต้อง (ต้องเป็น JPG, JPEG หรือ PNG)",
      (value) =>
        value &&
        (value[0].type === "image/jpeg" ||
          value[0].type === "image/jpg" ||
          value[0].type === "image/png")
    ),
  face: yup
    .mixed()
    .required("กรุณาอัปโหลดรูปภาพหน้าจริง")
    .test(
      "fileSize",
      "ไฟล์ใหญ่เกินไป (ขนาดสูงสุด 2 MB)",
      (value) => value && value[0].size <= 2000000
    )
    .test(
      "fileType",
      "รูปแบบไฟล์ไม่ถูกต้อง (ต้องเป็น JPG, JPEG หรือ PNG)",
      (value) =>
        value &&
        (value[0].type === "image/jpeg" ||
          value[0].type === "image/jpg" ||
          value[0].type === "image/png")
    ),
});
// สร้างคอมโพเนนต์ Form
const Verifyphotograhper = () => {
  // ใช้ useForm hook และส่ง schema เข้าไป
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const handleChangeDate = (date) => {
    // ใช้ setValue เพื่อกำหนดค่าในฟอร์ม
    setValue("birthday", date);
  };
  const [pinModalVisible, setPinModalVisible] = useState(false);
  const togglePinModal = () => setPinModalVisible(!pinModalVisible);
  const handleCancel = () => {
    // Handle cancel action, e.g., close the modal
    setPinModalVisible(false);
  };
  const handleChange = (e) => {
    const { value } = e.target;
    if (value.length <= 6 && /^[0-9]*$/.test(value)) {
      setPinCode(value);
      if (value.length === 6) {
        // Auto submit when all 6 digits are entered
        onSubmit(value);
      }
    }
  };
  const [pinCode, setPinCode] = useState("");
  const [messages, setMessages] = useState("");
  const [email, setEmail] = useState("");
  const handleSendVerificationEmail = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/send-verification-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessages(data); // ข้อความที่ส่งกลับจาก API
      } else {
        throw new Error(data); // ข้อความผิดพลาดที่ส่งกลับจาก API
      }
    } catch (error) {
      setMessages(error.messages);
    }
    setPinModalVisible(true);
  };

  const handlePinSubmit = async (pinCode) => {
    try {
      const response = await fetch("http://localhost:3001/verify-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email, // อีเมลที่ใช้สำหรับการยืนยัน
          pin: pinCode, // รหัส PIN ที่ผู้ใช้ป้อน
        }),
      });

      const data = await response.text();

      if (response.ok) {
        console.log(data); // พิมพ์ 'Token verified successfully'
        message.success("ยืนยันอีเมลสำเร็จ");
        setVerifiedEmail("true");
        setPinModalVisible(false);
      } else {
        console.error(data); // พิมพ์ 'Invalid token or email' หรือ 'Token expired' หรือ 'Internal Server Error'
        message.error("PIN ไม่ถูกต้อง หรือ หมดอายุ");
      }
    } catch (error) {
      console.error("Error submitting PIN:", error);
    }
  };

  // สร้างฟังก์ชันสำหรับการ submit ข้อมูล
  const onSubmit = async (data) => {
    if (!verifiedEmail) {
    message.error("กรุณายืนยันอีเมลก่อนทำการยืนยันข้อมูล");
    return; // ไม่ทำการ submit ข้อมูลเมื่อยังไม่ได้ยืนยันอีเมล
  }
    try {
      const token = localStorage.getItem("token");
      // Prepare form data for file uploads
      const formData = new FormData();
      formData.append("imgFace", data.face[0]); // Assuming 'face' is the file input name
      formData.append("imgCardId", data.imgidCard[0]); // Assuming 'imgidCard' is the file input name

      // Add other form data fields
      formData.append("fullName", data.name);
      formData.append("email", data.email);
      formData.append("verified_email", verifiedEmail);
      formData.append("birthdate", data.birthday);
      formData.append("lineId", data.lineId);
      formData.append("address", data.address);
      formData.append("idCardNumber", data.idCard);

      // Make the POST request using Axios
      const response = await axios.post(
        "http://localhost:3001/api/VerifyPhotograhper",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Add your authentication token here
          },
        }
      );

      // Handle the response as needed
      console.log(response.data);
      message.success("ยืนยันตัวตนสำเร็จ");
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Reload after 1 second
    } catch (error) {
      // Handle errors
      console.error("Error submitting data:", error);
    }
  };
  // สร้างฟังก์ชันสำหรับแปลงไฟล์เป็น base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  // สร้างฟังก์ชันสำหรับแสดงรูปภาพที่อัปโหลด
  const showImage = async (e) => {
    const file = e.target.files[0];
    const image = await toBase64(file);
    e.target.nextElementSibling.src = image;
  };
  // สร้าง UI ของฟอร์ม
  const [userData, setUserData] = useState({});
  const [verified, setVerified] = useState(false);
  const [imgCardURL, setImgCardURL] = useState("");
  const [imgFaceURL, setImgFaceURL] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3001/api/getVerifyPhotographer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { photographerVerify, imgCardURL, imgFaceURL } = response.data;
        if (photographerVerify) {
          setVerified(true);
          setUserData(photographerVerify);
          setImgCardURL(imgCardURL);
          setImgFaceURL(imgFaceURL);
        }
      } catch (error) {
        console.error("Error fetching verification data:", error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (verified) {
    let statusMessage = "";
    let statusColor = "";

    switch (userData.status) {
      case "pending":
        statusMessage = "รอแอดมินอนุมัติการยืนยันตัวตน";
        statusColor = "text-yellow-600";
        break;
      case "success":
        statusMessage = "แอดมินอนุมัติเรียบร้อยแล้ว";
        statusColor = "text-green-600";
        break;
      case "rejected":
        statusMessage = "ไม่ผ่านการอนุมัติ";
        statusColor = "text-red-600";
        break;
      default:
        break;
    }
    return (
      <div className="container mx-auto p-6 max-w-screen-sm bg-white shadow-md rounded-lg">
        <h1 className="text-center text-3xl font-bold mb-4 text-blue-600">
          ข้อมูลการยืนยันตัวตน
        </h1>
        <div className="space-y-2">
          <p>
            <span className="font-bold">สถานะ :</span>{" "}
            <span className={statusColor}>{statusMessage}</span>
          </p>
          <p>
            <span className="font-bold">ชื่อ-นามสกุล :</span>{" "}
            {userData.fullName}
          </p>
          <p>
            <span className="font-bold">วันเกิด :</span>{" "}
            {formatDate(userData.birthdate)}
          </p>
          <p>
            <span className="font-bold">Line ID :</span> {userData.lineId}
          </p>
          <p>
            <span className="font-bold">อีเมล :</span> {userData.email}
          </p>
          <p>
            <span className="font-bold">ที่อยู่ :</span> {userData.address}
          </p>
          <p>
            <span className="font-bold">รหัสบัตรประชาชน :</span>{" "}
            {userData.idCardNumber}
          </p>
          <div className="flex space-x-2 mt-2">
            <img
              src={imgCardURL}
              alt="imgCard"
              className="w-36 h-36 rounded object-cover cursor-pointer border-2 border-blue-300"
            />
            <img
              src={imgFaceURL}
              alt="face"
              className="w-36 h-36 rounded object-cover cursor-pointer border-2 border-blue-300"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-screen-lg p-4 sm:p-6">
      <h1 className="text-center text-3xl font-bold mb-4 ">ยืนยันตัวตน</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-grow w-full">
        <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
          <div className="mb-4">
            <label htmlFor="name" className="block text-xl font-medium">
              ชื่อ-นามสกุล
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="เช่น สมชาย ใจดี"
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="birthday" className="block text-xl font-medium">
              วันเกิด
            </label>
            <Datepicker
              id="birthday"
              {...register("birthday")}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="เลือกวันเกิด"
              show={showDatepicker} // Pass the correct prop for managing visibility
              setShow={setShowDatepicker}
              onChange={handleChangeDate}
            />
            {errors.birthday && (
              <p className="text-red-600">{errors.birthday.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="lineId" className="block text-xl font-medium">
              Line ID
            </label>
            <input
              type="text"
              id="lineId"
              {...register("lineId")}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="เช่น line_id"
            />
            {errors.lineId && (
              <p className="text-red-600">{errors.lineId.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-xl font-medium">
              อีเมล
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="เช่น example@example.com"
            />
            <button
              className={`mt-3 justify-center ${
                verifiedEmail ? "bg-green-500" : "bg-blue-500"
              } text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300`}
              onClick={handleSendVerificationEmail}
              disabled={verifiedEmail}
            >
              {verifiedEmail ? "ยืนยันอีเมลแล้ว" : "ยืนยันอีเมล"}
            </button>

            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-xl font-medium">
              ที่อยู่ที่ติดต่อได้
            </label>
            <textarea
              id="address"
              {...register("address")}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="กรอกที่อยู่ของคุณที่นี่"
            ></textarea>
            {errors.address && (
              <p className="text-red-600">{errors.address.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="idCard" className="block text-xl font-medium">
              รหัสบัตรประชาชน
            </label>
            <input
              type="text"
              id="idCard"
              {...register("idCard")}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="0123456789101"
            />
            {errors.idCard && (
              <p className="text-red-600">{errors.idCard.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="imgidCard" className="block text-xl font-medium">
              รูปภาพบัตรประชาชน
            </label>
            <input
              type="file"
              id="imgidCard"
              accept="image/*"
              {...register("imgidCard")}
              onChange={(e) => {
                register("imgidCard").onChange(e);
                showImage(e);
              }}
              className="hidden"
            />
            <img
              src="https://via.placeholder.com/150"
              alt="imgidCard"
              className="w-36 h-36 rounded object-cover mt-2 cursor-pointer"
              onClick={() => document.getElementById("imgidCard").click()}
            />
            {errors.imgidCard && (
              <p className="text-red-600">{errors.imgidCard.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="face" className="block text-xl font-medium">
              รูปภาพหน้าจริง
            </label>
            <input
              type="file"
              id="face"
              accept="image/*"
              {...register("face")}
              onChange={(e) => {
                register("face").onChange(e);
                showImage(e);
              }}
              className="hidden"
            />
            <img
              src="https://via.placeholder.com/150"
              alt="face"
              className="w-36 h-36 rounded object-cover mt-2 cursor-pointer"
              onClick={() => document.getElementById("face").click()}
            />
            {errors.face && (
              <p className="text-red-600">{errors.face.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="justify-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            ยืนยันข้อมูล
          </button>
        </div>
      </form>
      {pinModalVisible && (
        <PinModal
          pinModalVisible={pinModalVisible}
          handleCancel={togglePinModal}
          handlePinSubmit={handlePinSubmit}
        />
      )}
    </div>
  );
};

export default Verifyphotograhper;
