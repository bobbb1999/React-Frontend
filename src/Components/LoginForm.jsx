import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ใช้ useHistory สำหรับการ redirect
import axios from "axios"; // นำเข้า Axios
import Swal from "sweetalert2";
import { useAuth } from "./AuthProvider";
import jwt_decode from "jwt-decode";




export default function LoginForm() {
    
    const Navigate = useNavigate(); // เรียกใช้ useHistory
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // ส่งข้อมูลการล็อกอินไปยัง API endpoint ของคุณ
            const response = await axios.post("http://localhost:3001/login", formData);

            if (response.status === 200) {
                           
                    Swal.fire({
                    icon: 'success',
                    title: 'ล็อคอินสำเร็จ',
                    showConfirmButton: false,
                    timer: 2000
                });
                const token = response.data.token;
                
                const decoded = jwt_decode(token);
                const role = decoded.role;
                const UserId = decoded.id
                console.log(decoded);
                // console.log(role)
                
                login(token, role);
                localStorage.setItem("token", token);
                localStorage.setItem("useridlogin", UserId);

                
                // Redirect ไปที่หน้า Homepage
                Navigate("/Photograhper");

            } else {

                // ถ้าการล็อกอินไม่สำเร็จ
                console.error("ล็อคอินไม่สำเร็จ");
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'ล็อคอินไม่สำเร็จ',
                showConfirmButton: false,
                timer: 2000
            });
            console.error("Error:", error);
        }
    };

    return (
        
        <section className="bg-gray-50 dark:bg-black">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt="Night"
                        src="https://source.unsplash.com/random?s/photos/len"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="hidden lg:relative lg:block lg:p-12">
                        <a className="block text-white" href="/">
                            <span className="sr-only">Home</span>
                            <svg
                                className="h-8 sm:h-10"
                                viewBox="0 0 28 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </a>

                        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl dark:text-white">
                            Welcome to EasyPhoto 📸
                        </h2>

                        <p className="mt-4 leading-relaxed text-white/90 dark:text-white">
                        ค้นหาช่างภาพที่ถูกใจและใกล้คุณ
                        </p>
                    </div>
                </section>

                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">
                        <div className="relative -mt-16 block lg:hidden">
                            <a
                                className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
                                href="/"
                            >
                                <span className="sr-only">Home</span>
                                <svg
                                    className="h-8 sm:h-10"
                                    viewBox="0 0 28 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </a>

                            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                                Welcome to EasyPhoto 📸
                            </h1>

                            <p className="mt-4 leading-relaxed text-gray-500 dark:text-white">
                                ค้นหาช่างภาพที่ถูกใจและใกล้คุณ
                            </p>
                        </div>
                        <div className="mb-8">
                            <h1 className="text-5xl py-1 font-black w-fit bg-gradient-to-tr from-red-700 to-black-500 bg-clip-text text-transparent ">
                                Login
                            </h1>
                            <p className="text-black mb-2 dark:text-white">
                                มาเริ่มต้นสัมผัสประสบการณ์ใหม่ไปกับเราสิ
                            </p>
                            <p className="text-[10px] text-black/40 dark:text-white/60">
                                หรือยังไม่มีบัญชีเลย ?	&#8196;
                                <a
                                    className="text-black underline underline-offset-1 dark:text-white"
                                    href="/Register"
                                >
                                    สร้างบัญชี
                                </a>
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
                            <div className="relative col-span-6">
                                <p className="absolute left-4 top-2 dark:text-white/60 text-[10px]">
                                    Email / อีเมล
                                </p>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white/10 pt-6 pb-2 px-4 rounded-xl dark:text-white"
                                    required=""
                                />

                            </div>
                            <div className="relative col-span-6">
                                <p className="absolute left-4 top-2 dark:text-white/60 text-[10px]">
                                    Password / รหัสผ่าน
                                </p>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-white/10 pt-6 pb-2 px-4 rounded-xl dark:text-white"
                                    required=""
                                />
                            </div>
                            
                            <div className="col-span-6">
                                <a href="/ForgotPassword" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password ?</a>
                            </div>
                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button type="submit" className="inline-block shrink-0 rounded-md border border-black bg-black px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-blue-500 dark:inline-block shrink-0 rounded-md border dark:border-white dark:bg-white px-12 py-3 text-sm font-medium dark:text-black transition dark:hover:bg-transparent dark:hover:text-white focus:outline-none focus:ring active:text-blue-500">
                                    เข้าสู่ระบบ
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </section>


        // <section className="bg-gray-50 dark:bg-black">
        //     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        //         <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        //             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        //                 <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        //                     Sign in to your account
        //                 </h1>
        //                 <form className="space-y-4 md:space-y-6" action="#">
        //                     <div>
        //                         <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        //                         <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
        //                     </div>
        //                     <div>
        //                         <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        //                         <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
        //                     </div>
        //                     <div className="flex items-center justify-between">
        //                         <div className="flex items-start">
        //                             <div className="flex items-center h-5">
        //                                 <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
        //                             </div>
        //                             <div className="ml-3 text-sm">
        //                                 <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
        //                             </div>
        //                         </div>
        //                         <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
        //                     </div>
        //                     <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
        //                     <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        //                         Don’t have an account yet? <Link to="/Register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
        //                     </p>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        // </section>
    );
}