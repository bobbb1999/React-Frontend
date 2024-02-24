import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalImage from "react-modal-image";

function Admin_VerifyPhoto() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:3001/api/getDataVerify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(result.data);
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:3001/api/UpdatePhotographerStatus/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Reload data after status update
      const result = await axios("http://localhost:3001/api/getDataVerify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(result.data);
    } catch (error) {
      console.error("Error updating status:", error);
      // Handle error
    }
  };
  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">รายการผู้ใช้ที่ยืนยันตัวตน</h1>
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
            {data.map((item, i) => (
              <tr key={i}>
                <td className="px-2 py-2 whitespace-nowrap">
                  {item.photographerVerify.fullName}
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                  {formatDate(item.photographerVerify.birthdate)}
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                  {item.photographerVerify.lineId}
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                  {item.photographerVerify.email}
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                  {item.photographerVerify.address}
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                  {item.photographerVerify.idCardNumber}
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
                    value={item.photographerVerify.status}
                    onChange={(e) => {
                      setSelectedStatus(e.target.value);
                      setSelectedId(item.photographerVerify.id); // Store id to update later
                    }}
                  >
                    <option value="success">Success</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleStatusChange(selectedId, selectedStatus)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin_VerifyPhoto;
