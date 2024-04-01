import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalImage from "react-modal-image";

function Admin_VerifyRent() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, [searchStatus]);

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3001/api/getDataVerifyRentByStatus?status=${searchStatus}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(result.data);
      const initialSelectedStatus = {};
      result.data.forEach((item) => {
        initialSelectedStatus[item.EquipmentRentalVerify.id] =
          item.EquipmentRentalVerify.status;
      });
      setSelectedStatus(initialSelectedStatus);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(`ไม่มีผู้ใช้ในสถานะ ${searchStatus}`); // ตั้งข้อความข้อผิดพลาดจาก API response
      } else {
        console.error("Error fetching data:", error);
        setErrorMessage("Internal Server Error"); // ข้อผิดพลาดเซิร์ฟเวอร์ภายใน
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:3001/api/UpdateEquipmentRentalStatus/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Reload data after status update
      setData(data.map(item => {
        if (item.EquipmentRentalVerify.id === id) {
          return {
            ...item,
            EquipmentRentalVerify: {
              ...item.EquipmentRentalVerify,
              status: status
            }
          };
        }
        return item;
      }));
      // Update selectedStatus
      setSelectedStatus(prevState => ({
        ...prevState,
        [id]: status
      }));
    } catch (error) {
      console.error("Error updating status:", error);
      // Handle error
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4 text-center">รายชื่อผู้ให้เช่าที่ยืนยันตัวตน</h1>
      <div className="flex justify-center space-x-4 mb-4">
        {/* สร้างปุ่มสำหรับค้นหาแต่ละสถานะ */}
        <button
          className="text-white bg-blue-500 px-4 py-2 rounded-md"
          onClick={() => setSearchStatus("pending")}
        >
          Pending
        </button>
        <button
          className="text-white bg-green-500 px-4 py-2 rounded-md"
          onClick={() => setSearchStatus("success")}
        >
          Success
        </button>
        <button
          className="text-white bg-red-500 px-4 py-2 rounded-md"
          onClick={() => setSearchStatus("rejected")}
        >
          Rejected
        </button>
      </div>
      {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Birthdate
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Line ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Address
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID Card Number
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID Card Image
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Face Image
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item, i) => (
              <tr key={i}>
                <td className="px-2 py-2 whitespace-nowrap">
                  {item.EquipmentRentalVerify.fullName}
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                  {formatDate(item.EquipmentRentalVerify.birthdate)}
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                  {item.EquipmentRentalVerify.lineId}
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                  {item.EquipmentRentalVerify.email}
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                  {item.EquipmentRentalVerify.address}
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                  {item.EquipmentRentalVerify.idCardNumber}
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                  <ModalImage
                    small={item.imgCardURL}
                    large={item.imgCardURL}
                    alt="ImageCard"
                    className="w-24 h-auto cursor-pointer"
                  />
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                  <ModalImage
                    small={item.imgFaceURL}
                    large={item.imgFaceURL}
                    alt="ImageFace"
                    className="w-24 h-auto cursor-pointer"
                  />
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                <select
                  className="px-2 py-1 rounded-md"
                    value={selectedStatus[item.EquipmentRentalVerify.id] || ""}
                    onChange={(e) => {
                      const status = e.target.value;
                      setSelectedStatus(prevState => ({
                        ...prevState,
                        [item.EquipmentRentalVerify.id]: status
                      }));
                      setSelectedId(item.EquipmentRentalVerify.id); // Store id to update later
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="success">Success</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium">
                <button
                    onClick={() => handleStatusChange(selectedId, selectedStatus[selectedId])}
                    className="text-white hover:bg-indigo-700 bg-indigo-600 px-3 py-1 rounded-md"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 bg-gray-300 rounded-md"
          >
            ย้อนกลับ
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-2 bg-gray-300 rounded-md"
          >
            ถัดไป
          </button>
        </div>
    </div>
  );
}

export default Admin_VerifyRent;

