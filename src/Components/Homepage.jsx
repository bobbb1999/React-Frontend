import React from "react";

export default function Homepage() {
  return (
    <section className="lg:mx-auto dark:bg-black">
      <div className="lg:mx-auto max-w-6xl py-32 sm:py-48 lg:py-56">
        {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Announcing our next round of funding.{" "}
            <a href="#" className="font-semibold text-indigo-600">
              <span className="absolute inset-0" aria-hidden="true" />
              Read more <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div> */}
        <div className="text-center">
          <h1 className="text-lg font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-200">
            เว็บไซต์สำหรับหาช่างภาพหรือหาเช่าอุปกรณ์ถ่ายภาพ
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200">
            เว็บไซต์ของเรามีไว้สำหรับคนที่ต้องการหาช่างภาพไปถ่ายงาน และเป็นช่องทางหางานสำหรับช่างภาพด้วย และยังมีผู้ให้เช่าอุปกรณ์ถ่ายภาพ
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/Register"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              สมัครสมาชิก
            </a>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              อ่านข้อมูลเพิ่มเติม <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="relative py-24">
            <div className="mx-auto myContainer">
              <h1
                className="text-center text-2xl dark:text-gray-200 sm:text-3xl font-semibold mb-16 aos-init aos-animate"
                data-aos="zoom-in"
              >
                ทำไมต้องใช้
                <span className="font-inter-bold">
                  <span className="text-red-500">Easy
                  </span>
                  Photo
                </span>{" "}
                ?
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-16 mb-16">
                <div data-aos="fade-up" className="aos-init aos-animate">
                  <h1 className="text-xl mb-2">
                    <span className="text-red-500">Easy
                    </span>
                    <span className="dark:text-gray-200">ToUse</span>
                  </h1>
                  <p className="text-xs dark:text-gray-200">
                    เว็บไซต์ใช้งานง่าย อินเตอร์เฟซของเว็บไซต์ที่ออกแบบมาเพื่อความใช้งานง่าย ทำให้ผู้ใช้สามารถนำเสนอและเข้าใจข้อมูลได้อย่างรวดเร็ว.
                  </p>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="aos-init aos-animate"
                >
                  <h1 className="text-xl mb-2">
                    <span className="text-red-500">Easy</span>
                    <span className="dark:text-gray-200">Manage</span>
                  </h1>
                  <p className="text-xs dark:text-gray-200">
                    แก้ไข, จัดการ โปรไฟล์ของคุณอย่างง่ายดายในหน้าจัดการของคุณเอง
                    การจัดการข้อมูลส่วนตัวทั้งหมดที่เกี่ยวข้องกับโปรไฟล์, เช่น ที่อยู่, เบอร์โทรศัพท์, หรือข้อมูลทางการเงิน ให้ผู้ใช้มีความสะดวกในการตรวจสอบและอัปเดตข้อมูล. การแก้ไขข้อมูลในโปรไฟล์, ทำให้ผู้ใช้สามารถปรับปรุงข้อมูลส่วนตัว, รูปภาพ, หรือข้อมูลอื่น ๆ ได้อย่างรวดเร็ว.
                    
                    
                  </p>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="aos-init aos-animate"
                >
                  <h1 className="text-xl mb-2">
                    <span className="text-red-500">Easy</span>
                    <span className="dark:text-gray-200">Secure</span>
                  </h1>
                  <p className="text-xs dark:text-gray-200">
                    ไว้วางใจได้กับการคำนึงถึงความปลอดภัยทุกขั้นตอนของระบบหลังบ้าน
                    ด้วยนักพัฒนาที่เชี่ยวชาญและมืออาชีพ ที่วางระบบไว้อย่างดี
                    มีทีมงานคอยซัพพอร์ตตลอด ปลอดภัยทุกข้อมูลแน่นอน
                  </p>
                </div>
              </div>
              {/* <div
                className="relative w-full sm:w-[540px] mx-auto p-6 bg-gradient-to-tr from-blue-500 to-sky-200 rounded-2xl aos-init"
                data-aos="zoom-out-up"
              >
                <div>
                  <p className="text-2xl font-semibold">และที่สำคัญ</p>
                  <p className="text-base mb-4">เราหักค่าบริการจากเงินที่คุณได้</p>
                  <h1 className="text-6xl font-bold text-white">0%</h1>
                </div>
                <div
                  className="w-[200px] sm:w-[300px] absolute -right-2 sm:-right-4 bottom-4 bg-white text-black p-4 rounded-2xl aos-init"
                  data-aos="fade-left"
                  data-aos-delay="500"
                >
                  <p className="text-xs sm:text-base mb-1">
                    รับเงินโดเนทจากผู้ติดตามของคุณ
                  </p>
                  <h1 className="text-xl sm:text-3xl font-bold bg-gradient-to-tr from-blue-500 to-sky-200 bg-clip-text text-transparent">
                    ไปเต็มๆ ได้เลย!
                  </h1>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
