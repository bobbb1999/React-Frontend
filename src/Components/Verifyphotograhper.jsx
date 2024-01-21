import React , { useState } from 'react'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Datepicker from "tailwind-datepicker-react"
import axios from 'axios';



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
  const handleChangeDate = (date) => {
    // ใช้ setValue เพื่อกำหนดค่าในฟอร์ม
    setValue('birthday', date);
  };

  // สร้างฟังก์ชันสำหรับการ submit ข้อมูล
  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      // Prepare form data for file uploads
      const formData = new FormData();
      formData.append('imgFace', data.face[0]); // Assuming 'face' is the file input name
      formData.append('imgCardId', data.imgidCard[0]); // Assuming 'imgidCard' is the file input name

      // Add other form data fields
      formData.append('fullName', data.name);
      formData.append('email', data.email);
      formData.append('birthdate', data.birthday);
      formData.append('lineId', data.lineId);
      formData.append('address', data.address);
      formData.append('idCardNumber', data.idCard);

      // Make the POST request using Axios
      const response = await axios.post('http://localhost:3001/api/VerifyPhotograhper', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Add your authentication token here
        },
      });

      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error('Error submitting data:', error);
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
  return (
    <div className="container mx-auto p-4 max-w-screen-sm ">
      <h1 className="text-center text-3xl font-bold mb-4 ">ยืนยันตัวตน</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-xl font-medium">
            ชื่อ-นามสกุล
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="w-full border border-gray-300 rounded-lg p-2 mt-2"
            placeholder="เช่น สมชาย ใจดี"
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="birthday" className="block text-xl font-medium">
            วันเกิด
          </label>
          <Datepicker
            id="birthday"
            {...register("birthday")}
            className="w-full border border-gray-300 rounded-lg p-2 mt-2"
            placeholder="เลือกวันเกิด"
            show={showDatepicker}  // Pass the correct prop for managing visibility
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
            className="w-full border border-gray-300 rounded-lg p-2 mt-2"
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
            className="w-full border border-gray-300 rounded-lg p-2 mt-2"
            placeholder="เช่น example@example.com"
          />
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
            className="w-full border border-gray-300 rounded-lg p-2 mt-2"
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
            className="w-full border border-gray-300 rounded-lg p-2 mt-2"
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
          {errors.face && <p className="text-red-600">{errors.face.message}</p>}
        </div>

        <button
          type="submit"
          className="justify-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          ยืนยันข้อมูล
        </button>
      </form>
    </div>
  );
};

export default Verifyphotograhper;

