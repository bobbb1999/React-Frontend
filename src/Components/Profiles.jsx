import React, { useState } from "react";
import { Form, Input, Button, Upload, Avatar, Select, message } from "antd";
import { Rating } from "primereact/rating";
// นำเข้า TailwindCSS สำหรับการตกแต่ง
import "tailwindcss/tailwind.css";

function Profiles() {
    
        // สร้าง state สำหรับเก็บข้อมูลของผู้ใช้
        const [user, setUser] = useState({
          profileImage: "", // ภาพโปรไฟล์
          name: "", // ชื่อผู้ใช้
          bio: "", // คำแนะนำตัวเอง
          jobType: "", // ประเภทที่รับงาน
          province: "", // จังหวัดที่รับงาน
          facebook: "", // facebook
          instagram: "", // instagram
          line: "", // line
          phone: "", // เบอร์โทรศัพท์
          rating: 0, // คะแนน
        });
        // สร้างฟังก์ชันสำหรับการอัปเดต state ของผู้ใช้
        const handleChange = (e) => {
          // ดึงชื่อและค่าของ input ที่เปลี่ยนแปลง
          const { name, value } = e.target;
          // อัปเดต state ของผู้ใช้
          setUser({ ...user, [name]: value });
        };
        // สร้างฟังก์ชันสำหรับการอัปโหลดภาพโปรไฟล์
        const handleUpload = (info) => {
          // ตรวจสอบสถานะของการอัปโหลด
          if (info.file.status === "done") {
            // แสดงข้อความเมื่ออัปโหลดสำเร็จ
            message.success(`${info.file.name} อัปโหลดสำเร็จ`);
            // อัปเดต state ของผู้ใช้
            setUser({ ...user, profileImage: info.file.response.url });
          } else if (info.file.status === "error") {
            // แสดงข้อความเมื่ออัปโหลดไม่สำเร็จ
            message.error(`${info.file.name} อัปโหลดไม่สำเร็จ`);
          }
        };
        // สร้างฟังก์ชันสำหรับการส่งข้อมูลผู้ใช้
        const handleSubmit = (e) => {
          // ป้องกันการรีเฟรชหน้า
          e.preventDefault();
          // ส่งข้อมูลผู้ใช้ไปยัง API หรือฐานข้อมูล
          // ใช้ axios หรือ fetch สำหรับการส่งข้อมูล
          // ตัวอย่าง: axios.post("/api/users", user);
          // แสดงข้อความเมื่อส่งข้อมูลสำเร็จ
          message.success("บันทึกข้อมูลสำเร็จ");
        };
        // สร้างตัวแปรสำหรับเก็บข้อมูลของภาพโปรไฟล์
        const profileImage = {
          // กำหนด URL ของภาพโปรไฟล์
          // ถ้ายังไม่มีภาพโปรไฟล์ ใช้ภาพเริ่มต้น
          url: user.profileImage || "https://via.placeholder.com/150",
          // กำหนดชื่อของภาพโปรไฟล์
          name: user.name || "Anonymous",
        };
        // สร้างตัวแปรสำหรับเก็บข้อมูลของประเภทที่รับงาน
        const jobTypes = [
          { label: "Web Developer", value: "Web Developer" },
          { label: "Graphic Designer", value: "Graphic Designer" },
          { label: "Content Writer", value: "Content Writer" },
          { label: "Translator", value: "Translator" },
          { label: "Other", value: "Other" },
        ];
        // สร้างตัวแปรสำหรับเก็บข้อมูลของจังหวัดที่รับงาน
        const provinces = [
          { label: "กรุงเทพมหานคร", value: "กรุงเทพมหานคร" },
          { label: "นนทบุรี", value: "นนทบุรี" },
          { label: "ปทุมธานี", value: "ปทุมธานี" },
          { label: "สมุทรปราการ", value: "สมุทรปราการ" },
          { label: "อื่นๆ", value: "อื่นๆ" },
        ];
        // สร้างตัวแปรสำหรับเก็บข้อมูลของไอคอนสำหรับการอัปโหลด
        const uploadIcon = (
          <div className="flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span className="text-gray-400">อัปโหลดภาพ</span>
          </div>
        );
    
  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-center mb-4">แก้ไขข้อมูลโปรไฟล์</h1>
    <Form layout="vertical" onFinish={handleSubmit}>
      <div className="flex flex-col items-center">
        <Avatar size={150} src={profileImage.url} />
        <Form.Item name="profileImage">
          <Upload
            name="profileImage"
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188" // URL สำหรับการอัปโหลดภาพ
            showUploadList={false} // ซ่อนรายการภาพที่อัปโหลด
            onChange={handleUpload} // เรียกฟังก์ชัน handleUpload เมื่อมีการเปลี่ยนแปลง
          >
            <Button icon={uploadIcon}>อัปโหลดภาพโปรไฟล์</Button>
          </Upload>
        </Form.Item>
      </div>
      {/* ส่วนของข้อมูลผู้ใช้ */}
      <Form.Item label="ชื่อผู้ใช้" name="name" rules={[{ required: true, message: 'กรุณากรอกชื่อผู้ใช้' }]}>
        <Input value={user.name} onChange={handleChange} />
      </Form.Item>
      <Form.Item label="คำแนะนำตัวเอง" name="bio">
        <Input.TextArea value={user.bio} onChange={handleChange} />
      </Form.Item>
      <Form.Item label="ประเภทที่รับงาน" name="jobType">
        <Select options={jobTypes} value={user.jobType} onChange={(value) => setUser({ ...user, jobType: value })} />
      </Form.Item>
      <Form.Item label="จังหวัดที่รับงาน" name="province">
        <Select options={provinces} value={user.province} onChange={(value) => setUser({ ...user, province: value })} />
      </Form.Item>
      <Form.Item label="Facebook" name="facebook">
        <Input value={user.facebook} onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Instagram" name="instagram">
        <Input value={user.instagram} onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Line" name="line">
        <Input value={user.line} onChange={handleChange} />
      </Form.Item>
      <Form.Item label="เบอร์โทรศัพท์" name="phone">
        <Input value={user.phone} onChange={handleChange} />
      </Form.Item>
      {/* ส่วนของคะแนน */}
      <Form.Item label="คะแนน" name="rating">
        <Rating value={user.rating} onChange={(e) => setUser({ ...user, rating: e.value })} />
      </Form.Item>
      {/* ปุ่มสำหรับ submit แบบฟอร์ม */}
      <Form.Item>
        <Button type="primary" htmlType="submit">บันทึกข้อมูล</Button>
      </Form.Item>
    </Form>
  </div>
  )
}

export default Profiles
