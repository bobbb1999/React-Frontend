import React from "react";

function Account() {
  return (
    <section className=" md-auto h-auto pt-20 dark:bg-black">
      <div className="flex flex-col mx-20 lg:flex-row gap-6 mb-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg lg:w-2/4 dark:border-gray-600 h-32 md:h-80 flex-grow">
          <div className="relative -mt-20 justify-center mb-8">
            <div className="text-center">
              <div className="relative w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] mx-auto mb-4">
                <img
                  className="bg-white/10 w-full h-full object-cover rounded-full"
                  src="https://cdn.pic.in.th/file/picinth/Screenshot_2023-09-16_194045-transformed.png"
                  alt="user_profile"
                />
                {/* <img src="https://cdn.pic.in.th/file/picinth/Easyphoto.jpeg" alt="Screenshot_2023-09-16_194045-transformed.png" border="0" /> */}
                <div className="absolute bottom-3 right-3">
                  <div className="relative flex justify-center items-center w-[35px] h-[35px] rounded-full bg-white/10 border border-white/10 backdrop-blur-sm overflow-hidden transition duration-300 hover:bg-white/20">
                    <p className="text-xs">
                      <i className="far fa-upload"></i>
                    </p>
                    <input type="file" className="opacity-0 absolute" />
                  </div>
                </div>
              </div>
              <form className="flex justify-center items-center space-x-2">
                <h1 className="text-3xl font-semibold w-fit mb-1 border border-transparent bg-gradient-to-tr from-blue-500 to-sky-200 bg-clip-text text-transparent">
                  popeye2546
                </h1>
                <button
                  type="button"
                  className="h-fit border bg-white/10 border-white/10 text-white hover:bg-white/20 w-[30px] text-center py-0.5 text-[10px] rounded-md transition duration-300"
                >
                  <i className="far fa-edit"></i>
                </button>
              </form>
              <p className="text-xs">ezdn.app/popeye2546</p>
            </div>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-3">
            <div className="text-center py-6 lg:py-0 border-b sm:border-b-0 sm:border-r border-white/10">
              <p className="text-xs text-white/40 mb-2">การยืนยัน</p>
              <div className="flex flex-col items-center space-y-1">
                <a className="block w-fit bg-white/10 transition duration-300 px-4 rounded-lg">
                  <i className="far fa-times"></i>&nbsp;&nbsp;ยังไม่ยืนยันอีเมล
                </a>
                <a className="block w-fit bg-white/10 transition duration-300 px-4 rounded-lg">
                  <i className="far fa-times"></i>&nbsp;&nbsp;ยังไม่ยืนยันเบอร์
                </a>
              </div>
            </div>
            <div className="text-center py-6 lg:py-0 border-b sm:border-b-0 sm:border-r border-white/10">
              <p className="text-xs text-white/40 mb-1">
                เข้าร่วมกับเราตั้งแต่
              </p>
              <h1 className="text-xl font-semibold">8/9/2566</h1>
              <p className="text-sm -mt-1">4 วัน</p>
            </div>
            <div className="text-center py-6 lg:py-0">
              <p className="text-xs text-white/40 mb-2">เข็มกลัด</p>
              <div className="flex justify-center space-x-2"></div>
            </div>
          </div>
        </div>
        <div className="border-2 border-dashed rounded-lg border-gray-300 p-6 dark:border-gray-600 h-32 md:h-80 flex-grow">
          <p className="mb-6 underline underline-offset-2 decoration-sky-500 ">
            จัดการบัญชี
          </p>
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-xs dark:text-white/40">อีเมล</p>
              <h1>
                popeye2546@gmail.com
                <a className="text-xs px-2.5 bg-black/40 dark:whitespace-nowrap dark:bg-white/40 rounded-lg">
                  ยังไม่ยืนยัน
                </a>
              </h1>
            </div>
            <div>
              <p className="text-xs dark:text-white/40">เบอร์โทรศัพท์</p>
              <h1>
                {" "}
                0845675752
                <a className="text-xs px-2.5 bg-black/40 dark:whitespace-nowrap dark:bg-white/40 rounded-lg">
                  <i className="far fa-times"></i> ยังไม่ยืนยัน
                </a>
              </h1>
            </div>
            <button type="button" className="w-full bg-white/10 p-2.5 rounded-xl transition duration-300 hover:bg-white/20"><i className="far fa-envelope"></i> ยืนยันอีเมล</button>
            <button type="button" className="w-full bg-white/10 p-2.5 rounded-xl transition duration-300 hover:bg-white/20"><i className="far fa-phone-alt"></i> ยืนยันเบอร์</button>
          </div>
        </div>
      </div>
      {/* <div
        className="mx-20 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"
      ></div> */}
      <div className="grid grid-cols-2  gap-4 mb-4">
        <div className="mx-20 border-2 border-dashed p-6 rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-96">
          <form className="" data-gtm-form-interact-id="0">
            <p className="mb-6 underline underline-offset-2 decoration-sky-500">
              ตั้งค่าข้อมูลผู้ใช้งาน
            </p>
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-2">
                <div className="relative">
                  <p className="absolute left-4 top-2 text-white/40 text-[10px]">
                    คำนำหน้า
                  </p>
                  <select
                    name="nametitle"
                    className="w-full bg-white/5 pt-6 pb-2 px-4 rounded-xl h-full"
                    required=""
                  >
                    <option defaultValue="">นาย</option>
                    <option>นาง</option>
                    <option>นางสาว</option>
                    <option>เด็กชาย</option>
                    <option>เด็กหญิง</option>
                    <option>ศาสตราจารย์</option>
                    <option>ผู้ช่วยศาสตราจารย์</option>
                    <option>รองศาสตราจารย์</option>
                  </select>
                </div>
                <div className="relative">
                  <p className="absolute left-4 top-2 text-white/40 text-[10px]">
                    ชื่อจริง
                  </p>
                  <input
                    type="text"
                    name="first_name"
                    className="w-full bg-white/5 pt-6 pb-2 px-4 rounded-xl"
                    required=""
                    data-gtm-form-interact-field-id="0"
                  />
                </div>
                <div className="relative">
                  <p className="absolute left-4 top-2 text-white/40 text-[10px]">
                    นามสกุล
                  </p>
                  <input
                    type="text"
                    name="last_name"
                    className="w-full bg-white/5 pt-6 pb-2 px-4 rounded-xl"
                    required=""
                  />
                </div>
              </div>
              <div className="relative">
                <p className="absolute left-4 top-2 text-white/40 text-[10px]">
                  วัน/เดือน/ปี เกิด
                </p>
                <input
                  type="date"
                  name="birthday"
                  className="w-full bg-white/5 pt-6 pb-2 px-4 rounded-xl"
                  required=""
                />
              </div>
              <div className="relative">
                <p className="absolute left-4 top-2 text-white/40 text-[10px]">
                  เลขบัตรประชาชน 13 หลัก
                </p>
                <input
                  type="password"
                  name="citizen_id"
                  className="w-full bg-white/5 pt-6 pb-2 px-4 rounded-xl"
                  required=""
                  max="13"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-2 -translate-y-1/2 w-[40px] h-[40px]"
                >
                  <i className="far fa-eye"></i>
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="px-8 py-2.5 bg-white text-black rounded-xl transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/40"
            >
              <i className="far fa-edit"></i> บันทึกการตั้งค่า
            </button>
          </form>
        </div>
        <div className="mx-20 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-96">
          <form className="h-fit p-6 ">
            <p className="mb-6 underline underline-offset-2 decoration-sky-500">
              ตั้งค่าข้อมูลที่อยู่
            </p>
            <div className="space-y-4 mb-6">
              <div className="relative">
                <p className="absolute left-4 top-2 text-white/40 text-[10px]">
                  ที่อยู่
                </p>
                <input
                  type="text"
                  name="address_line1"
                  className="w-full bg-white/5 pt-6 pb-2 px-4 rounded-xl h-32"
                  required=""
                />
              </div>
              {/* <div className="relative">
                <p className="absolute left-4 top-2 text-white/40 text-[10px]">
                  ที่อยู่ บรรทัดที่ 2
                </p>
                <input
                  type="text"
                  name="address_line2"
                  className="w-full bg-white/5 pt-6 pb-2 px-4 rounded-xl"
                  required=""
                />
              </div> */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-2">
                <div className="relative">
                  <p className="absolute left-4 top-2 text-white/40 text-[10px]">
                    อำเภอ / เขต
                  </p>
                  <input
                    type="text"
                    name="address_district"
                    className="w-full bg-white/5 pt-6 pb-2 px-4 rounded-xl"
                    required=""
                  />
                </div>
                <div className="relative">
                  <p className="absolute left-4 top-2 text-white/40 text-[10px]">
                    จังหวัด
                  </p>
                  <input
                    type="text"
                    name="address_province"
                    className="w-full bg-white/5 pt-6 pb-2 px-4 rounded-xl"
                    required=""
                  />
                </div>
                <div className="relative">
                  <p className="absolute left-4 top-2 text-white/40 text-[10px]">
                    รหัสไปรษณีย์
                  </p>
                  <input
                    type="text"
                    name="address_zip"
                    className="w-full bg-white/5 pt-6 pb-2 px-4 rounded-xl"
                    required=""
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="px-8 py-2.5 bg-white text-black rounded-xl transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/40"
            >
              <i className="far fa-edit"></i> บันทึกการตั้งค่า
            </button>
          </form>
        </div>
        <div className="mx-20 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
        <div className="mx-20 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
      </div>
      <div className="mx-20 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="mx-20 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
        <div className="mx-20 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
        <div className="mx-20 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
        <div className="mx-20 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
      </div>
    </section>
  );
}

export default Account;
