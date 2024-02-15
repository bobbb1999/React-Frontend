import { React, useState, useEffect } from "react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "./AuthProvider";
import { Link } from "react-router-dom";
import { BsFillSunFill, BsMoonFill, BsCheck } from "react-icons/bs";

const navigation = [
  { name: "Photographer", to: "/Photograhper", roles: ["user", "photo", "rent","admin"] },
  { name: "Forrent", to: "/Forrent", roles: ["rent", "photo","admin"] },
  { name: "Admin", to: "/Admin", roles: ["admin"] },
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
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
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
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/Accounts"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 flex items-center"
                            )}
                          >
                            <UserCircleIcon className="h-5 w-5 mr-2" />
                            <span>โปรไฟล์</span>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => {
                          const role = localStorage.getItem("role");

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
                              {role === "photo" ? "ยืนยันตัวตน" : "ยืนยันตัวตน"}{" "}
                              {/* เปลี่ยนข้อความที่แสดงตาม role */}
                            </Link>
                          );
                        }}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => {
                          const role = localStorage.getItem("role");
                          let linkTo = "";
                          let displayText = "";

                          if (role === "photo") {
                            linkTo = "/UploadWorkings";
                            displayText = "อัพโหลดผลงาน";
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
                              <UserCircleIcon className="h-5 w-5 mr-2" />
                              <span>{displayText}</span>
                            </Link>
                          );
                        }}
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
