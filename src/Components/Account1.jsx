import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import Select from "react-select";
import makeAnimated from "react-select/animated";

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

  const thaiProvinces = [
    { value: "Bangkok", label: "กรุงเทพมหานคร" },
    { value: "Samut Prakan", label: "สมุทรปราการ" },
    { value: "Nonthaburi", label: "นนทบุรี" },
    { value: "Pathum Thani", label: "ปทุมธานี" },
    { value: "Phra Nakhon Si Ayutthaya", label: "พระนครศรีอยุธยา" },
    { value: "Ang Thong", label: "อ่างทอง" },
    { value: "Lop Buri", label: "ลพบุรี" },
    { value: "Sing Buri", label: "สิงห์บุรี" },
    { value: "Chai Nat", label: "ชัยนาท" },
    { value: "Saraburi", label: "สระบุรี" },
    { value: "Chon Buri", label: "ชลบุรี" },
    { value: "Rayong", label: "ระยอง" },
    { value: "Chanthaburi", label: "จันทบุรี" },
    { value: "Trat", label: "ตราด" },
    { value: "Chachoengsao", label: "ฉะเชิงเทรา" },
    { value: "Prachin Buri", label: "ปราจีนบุรี" },
    { value: "Nakhon Nayok", label: "นครนายก" },
    { value: "Sa Kaeo", label: "สระแก้ว" },
    { value: "Nakhon Ratchasima", label: "นครราชสีมา" },
    { value: "Buri Ram", label: "บุรีรัมย์" },
    { value: "Surin", label: "สุรินทร์" },
    { value: "Si Sa Ket", label: "ศรีสะเกษ" },
    { value: "Ubon Ratchathani", label: "อุบลราชธานี" },
    { value: "Yasothon", label: "ยโสธร" },
    { value: "Chaiyaphum", label: "ชัยภูมิ" },
    { value: "Amnat Charoen", label: "อำนาจเจริญ" },
    { value: "Bueng Kan", label: "บึงกาฬ" },
    { value: "Nong Bua Lam Phu", label: "หนองบัวลำภู" },
    { value: "Khon Kaen", label: "ขอนแก่น" },
    { value: "Udon Thani", label: "อุดรธานี" },
    { value: "Loei", label: "เลย" },
    { value: "Nong Khai", label: "หนองคาย" },
    { value: "Maha Sarakham", label: "มหาสารคาม" },
    { value: "Roi Et", label: "ร้อยเอ็ด" },
    { value: "Kalasin", label: "กาฬสินธุ์" },
    { value: "Sakon Nakhon", label: "สกลนคร" },
    { value: "Nakhon Phanom", label: "นครพนม" },
    { value: "Mukdahan", label: "มุกดาหาร" },
    { value: "Chiang Mai", label: "เชียงใหม่" },
    { value: "Lamphun", label: "ลำพูน" },
    { value: "Lampang", label: "ลำปาง" },
    { value: "Uttaradit", label: "อุตรดิตถ์" },
    { value: "Phrae", label: "แพร่" },
    { value: "Nan", label: "น่าน" },
    { value: "Phayao", label: "พะเยา" },
    { value: "Chiang Rai", label: "เชียงราย" },
    { value: "Mae Hong Son", label: "แม่ฮ่องสอน" },
    { value: "Nakhon Sawan", label: "นครสวรรค์" },
    { value: "Uthai Thani", label: "อุทัยธานี" },
    { value: "Kamphaeng Phet", label: "กำแพงเพชร" },
    { value: "Tak", label: "ตาก" },
    { value: "Sukhothai", label: "สุโขทัย" },
    { value: "Phitsanulok", label: "พิษณุโลก" },
    { value: "Phichit", label: "พิจิตร" },
    { value: "Phetchabun", label: "เพชรบูรณ์" },
    { value: "Ratchaburi", label: "ราชบุรี" },
    { value: "Kanchanaburi", label: "กาญจนบุรี" },
    { value: "Suphan Buri", label: "สุพรรณบุรี" },
    { value: "Nakhon Pathom", label: "นครปฐม" },
    { value: "Samut Sakhon", label: "สมุทรสาคร" },
    { value: "Samut Songkhram", label: "สมุทรสงคราม" },
    { value: "Phetchaburi", label: "เพชรบุรี" },
    { value: "Prachuap Khiri Khan", label: "ประจวบคีรีขันธ์" },
    { value: "Nakhon Si Thammarat", label: "นครศรีธรรมราช" },
    { value: "Krabi", label: "กระบี่" },
    { value: "Phang Nga", label: "พังงา" },
    { value: "Phuket", label: "ภูเก็ต" },
    { value: "Surat Thani", label: "สุราษฎร์ธานี" },
    { value: "Ranong", label: "ระนอง" },
    { value: "Chumphon", label: "ชุมพร" },
    { value: "Songkhla", label: "สงขลา" },
    { value: "Satun", label: "สตูล" },
    { value: "Trang", label: "ตรัง" },
    { value: "Phatthalung", label: "พัทลุง" },
    { value: "Pattani", label: "ปัตตานี" },
    { value: "Yala", label: "ยะลา" },
    { value: "Narathiwat", label: "นราธิวาส" },
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

  return (
    <div className="mx-auto h-auto pt-20 px-20 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-start mb-4">แก้ไขข้อมูลโปรไฟล์</h1>
      <form>
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
                      // autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      // placeholder="janesmith"
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
              {/* <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon
                    className="h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Change
                  </button>
                </div>
              </div> */}

              {/* <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div> */}
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

              {/* <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div> */}

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

              {/* <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="region"
                    id="region"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div> */}
            </div>
          </div>

          {/* <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Notifications
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              We'll always let you know about important changes, but you pick
              what else you want to hear about.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        Candidates
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Offers
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  Push Notifications
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  These are delivered via SMS to your mobile phone.
                </p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-everything"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-everything"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Everything
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-email"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Same as email
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-nothing"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-nothing"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      No push notifications
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div> */}
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
