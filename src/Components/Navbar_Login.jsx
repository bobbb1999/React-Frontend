import { React, useState, useEffect } from "react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  CheckBadgeIcon,
  BriefcaseIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "./AuthProvider";
import { Link } from "react-router-dom";
import { BsFillSunFill, BsMoonFill, BsCheck } from "react-icons/bs";

const navigation = [
  {
    name: "ช่างภาพ",
    to: "/Photograhper",
    roles: ["user", "photo", "rent", "admin"],
  },
  { name: "ผู้ให้เช่าอุปกรณ์", to: "/Forrent", roles: ["rent", "photo", "admin"] },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar_Login() {
  const { logout } = useAuth(); // เรียกใช้ฟังก์ชัน logout จาก useAuth
  const handleLogout = () => {
    logout();
    // ตัวอย่าง: ลบ token หรือข้อมูลการล็อกอินออกจาก localStorage
    // localStorage.removeItem("token");
    // localStorage.removeItem("role");
    // localStorage.removeItem("email");

    // หลังจากลบข้อมูลการล็อกอินแล้ว นำผู้ใช้ไปยังหน้าล็อกอิน (หรือหน้าหลังจากออกจากระบบ) ตามที่คุณต้องการ
    // ในกรณีนี้ จะนำผู้ใช้ไปยังหน้า "/home"
    window.location.href = "/";
  };

  const [theme, setTheme] = useState("light");

  // if local storage is empty save theme as light
  useEffect(() => {
    if (localStorage.getItem("theme") === null) {
      localStorage.setItem("theme", "light");
    }
  }, []);

  useEffect(() => {
    // select html elem
    const html = document.querySelector("html");
    if (localStorage.getItem("theme") === "dark") {
      html.classList.add("dark");
      setTheme("dark");
    } else {
      html.classList.remove("dark");
      setTheme("light");
    }
  }, [theme]);

  // handle switch theme
  const handleThemeSwitch = () => {
    if (localStorage.getItem("theme") === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  const [imageProfile, setImageProfile] = useState("");
  const token = localStorage.getItem("token");
  const iduser = localStorage.getItem("useridlogin");
  // ดึงข้อมูลโปรไฟล์เมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    // เรียกใช้ API เพื่อดึงข้อมูลโปรไฟล์
    fetchProfileImage();
  }, []);

  // ฟังก์ชันสำหรับเรียกใช้ API เพื่อดึงข้อมูลโปรไฟล์
  const fetchProfileImage = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/getImagePhotoProfile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // ใส่ token ที่ใช้ในการ authenticate
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setImageProfile(data.photographerProfile.imgProfileURL); // เซ็ต URL ของรูปโปรไฟล์
      } else {
        // กรณีที่เกิดข้อผิดพลาดในการดึงข้อมูลโปรไฟล์
        console.error("Failed to fetch profile image");
      }
    } catch (error) {
      console.error("Error fetching profile image:", error);
    }
  };

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleChangeOldPassword = (event) => {
    setOldPassword(event.target.value);
  };

  const handleChangeNewPassword = (event) => {
    setNewPassword(event.target.value);
  };
  const handleChangeConfirmNewPassword = (event) => {
    setConfirmNewPassword(event.target.value);
  };


  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      alert('รหัสผ่านใหม่และยืนยันรหัสผ่านใหม่ไม่ตรงกัน');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: iduser,
          oldPassword: oldPassword,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        // เมื่อเปลี่ยนรหัสผ่านสำเร็จ ล้างค่ารหัสผ่านเดิมและรหัสผ่านใหม่
        setOldPassword('');
        setNewPassword('');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน');
    }
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link
                    to="/Homepage"
                    className="py-4 sm:py-0 transition duration-300 hover:scale-105"
                  >
                    <span className="sr-only">Your Company</span>
                    <span className="text-2xl tracking-tighter font-black text-red-500">
                      Easy
                    </span>
                    <span className="text-2xl tracking-tighter font-black text-white dark:text-black">
                      Photo
                    </span>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => {
                      // เช็คว่าบทบาทของผู้ใช้ปัจจุบันสามารถเห็นเมนูนี้ได้หรือไม่
                      if (item.roles.includes(localStorage.getItem("role"))) {
                        return (
                          <Link
                            to={item.to}
                            key={item.name}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        );
                      } else {
                        return null; // ไม่แสดงเมนู
                      }
                    })}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  onClick={handleThemeSwitch}
                  className="p-3  text-black dark:text-white rounded-full w-12 h-8 flex justify-center items-center"
                >
                  {theme === "light" ? <BsMoonFill /> : <BsFillSunFill />}
                </button>
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={
                          imageProfile ||
                          "https://img2.pic.in.th/pic/Screenshot-2023-09-16-194045.png"
                        }
                        alt="imageProfile"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {localStorage.getItem("role") === "admin" && (
                        <div>
                          {/* ข้อมูลยืนยันตัวตนสำหรับช่างภาพ */}
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/Admin/VerifyPhotographer"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 flex items-center"
                                )}
                              >
                                <UserCircleIcon className="h-5 w-5 mr-2" />{" "}
                                <span>ข้อมูลยืนยันตัวตนสำหรับช่างภาพ</span>{" "}
                              </Link>
                            )}
                          </Menu.Item>

                          {/* ข้อมูลยืนยันตัวตนสำหรับผู้ให้เช่าอุปกรณ์ */}
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/Admin/VerifyEquipmentRental"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 flex items-center"
                                )}
                              >
                                <UserCircleIcon className="h-5 w-5 mr-2" />{" "}
                                <span>
                                  ข้อมูลยืนยันตัวตนสำหรับผู้ให้เช่าอุปกรณ์
                                </span>{" "}
                              </Link>
                            )}
                          </Menu.Item>
                          {/* ข้อมูลยืนยันตัวตนสำหรับผู้ให้เช่าอุปกรณ์ */}
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/Admin/AllUsers"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 flex items-center"
                                )}
                              >
                                <UserCircleIcon className="h-5 w-5 mr-2" />{" "}
                                <span>ข้อมูลผู้ใช้งาน</span>{" "}
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                      )}
                      <Menu.Item as="div">
                        {({ active }) => {
                          const role = localStorage.getItem("role");
                          if (role === "photo" || role === "rent") {
                            let profileLink =
                              role === "photo" ? "/Accounts" : "/Profilerent";
                            return (
                              <Link
                                to={profileLink}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 flex items-center"
                                )}
                              >
                                <UserCircleIcon className="h-5 w-5 mr-2" />
                                <span>โปรไฟล์</span>
                              </Link>
                            );
                          } else {
                            return null;
                          }
                        }}
                      </Menu.Item>

                      <Menu.Item as="div">
                        {({ active }) => {
                          const role = localStorage.getItem("role");
                          if (role === "photo" || role === "rent") {
                            let linkTo = "/VerifyPhotograhper";
                            if (role === "rent") {
                              linkTo = "/VerifyEquipmentRental";
                            }
                            return (
                              <Link
                                to={linkTo}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 flex items-center"
                                )}
                              >
                                {role === "photo" ? (
                                  <CheckBadgeIcon className="h-5 w-5 mr-2" />
                                ) : (
                                  <CheckBadgeIcon className="h-5 w-5 mr-2" />
                                )}
                                {role === "photo"
                                  ? "ยืนยันตัวตน"
                                  : "ยืนยันตัวตน"}{" "}
                              </Link>
                            );
                          } else {
                            return null;
                          }
                        }}
                      </Menu.Item>

                      <Menu.Item as="div">
                        {({ active }) => {
                          const role = localStorage.getItem("role");
                          if (role === "photo" || role === "rent") {
                            let linkTo = "";
                            let displayText = "";

                            if (role === "photo") {
                              linkTo = "/UploadWorkings";
                              displayText = "จัดการผลงาน";
                            } else if (role === "rent") {
                              linkTo = "/Product";
                              displayText = "จัดการสินค้า";
                            }

                            return (
                              <Link
                                to={linkTo}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 flex items-center"
                                )}
                              >
                                <CogIcon className="h-5 w-5 mr-2" />
                                <span>{displayText}</span>
                              </Link>
                            );
                          } else {
                            return null;
                          }
                        }}
                      </Menu.Item>
                      <Menu.Item as="div">
                        {({ active }) => {
                          const role = localStorage.getItem("role");
                          if (role === "photo") {
                            // เพิ่มเงื่อนไขสำหรับบทบาท "photo" เพื่อแสดงลิงก์ไปยังหน้า "JobHiring"
                            return (
                              <Link
                                to="/JobHiring" // กำหนด path ของหน้า "JobHiring" ที่ต้องการเชื่อมโยง
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 flex items-center"
                                )}
                              >
                                <BriefcaseIcon className="h-5 w-5 mr-2" />
                                <span>การรับงาน</span>{" "}
                                {/* เพิ่มข้อความที่ต้องการให้แสดง */}
                              </Link>
                            );
                          } else {
                            return null;
                          }
                        }}
                      </Menu.Item>
                      <Menu.Item as="div">
                        {({ active }) => (
                          <button
                            onClick={handleOpenModal}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700 flex items-center'
                            )}
                          >
                            <Cog6ToothIcon className="h-5 w-5 mr-2" />
                            <span>เปลี่ยนรหัสผ่าน</span>{" "}
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-red-500 flex items-center"
                            )}
                            onClick={handleLogout}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-5 w-5 mr-2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                              />
                            </svg>
                            <span>ออกจากระบบ</span>
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <Transition
            show={isModalOpen}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">เปลี่ยนรหัสผ่าน</h2>
                <div className="mb-4">
                  <input
                    type="password"
                    className="border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md p-2"
                    placeholder="รหัสผ่านเดิม"
                    value={oldPassword}
                    onChange={handleChangeOldPassword}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    className="border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md p-2"
                    placeholder="รหัสผ่านใหม่"
                    value={newPassword}
                    onChange={handleChangeNewPassword}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    className="border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md p-2"
                    placeholder="ยืนยันรหัสผ่านใหม่"
                    value={confirmNewPassword}
                    onChange={handleChangeConfirmNewPassword}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="mr-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={handleChangePassword}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    เปลี่ยนรหัสผ่าน
                  </button>
                </div>
              </div>
            </div>
          </Transition>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar_Login;
