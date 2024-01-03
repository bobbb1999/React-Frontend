import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Image } from 'primereact/image';


function User_list() {
    const [users, setUsers] = useState([]);

  useEffect(() => {
    
    // ดึงข้อมูลผู้ใช้ที่ผ่านการ verify จาก Express server
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getVerifiedUsers');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
  }, []);
  
  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">รายการผู้ใช้ที่ยืนยันตัวตน</h1>
      

      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Role
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Email
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {users.map(user => (
          <tr key={user.id}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
            <Image className="h-10 w-10 rounded-full" src={user.imageProfile} alt="imageProfile" />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {user.fullName}
              </div>
            </div>
          </div>
        </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {user.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {user.role}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {user.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
              <span className="ml-2 text-red-600 hover:text-red-900">Delete</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>

    
  )
}

export default User_list
