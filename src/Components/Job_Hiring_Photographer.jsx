import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Job_Hiring_Photographer() {
  const [jobHirings, setJobHirings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByCreatedAtAsc, setSortByCreatedAtAsc] = useState(false); // เพิ่ม state สำหรับการเรียงลำดับ
  const itemsPerPage = 20;
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/api/jobhiring', {
          headers: {
            Authorization: `Bearer ${token}` // ส่ง Token ใน Header ของ Request
          }
        });
        setJobHirings(response.data);
      } catch (error) {
        console.error('Error fetching job hirings:', error);
      }
    }
    fetchData();
  }, []);

  const handleStatusUpdate = async (jobId, status) => {
    try {
        await axios.patch(`http://localhost:3001/api/status-Job_hiring/${jobId}`, { status }, {
            headers: {
              Authorization: `Bearer ${token}` // ส่ง Token ใน Header ของ Request
            }
          });
      // Refresh job hirings after update
      const response = await axios.get('http://localhost:3001/api/jobhiring', {
        headers: {
          Authorization: `Bearer ${token}` // ส่ง Token ใน Header ของ Request
        }
      });
      setJobHirings(response.data);
    } catch (error) {
      console.error('Error updating job status:', error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jobHirings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(jobHirings.length / itemsPerPage);

  // Function to sort job hirings by createdAt date
  const sortByCreatedAt = () => {
    const sortedJobs = [...jobHirings];
    if (sortByCreatedAtAsc) {
      sortedJobs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      sortedJobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setSortByCreatedAtAsc(!sortByCreatedAtAsc);
    setJobHirings(sortedJobs);
  };

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  
  
  return (
    <div className="w-full overflow-x-auto mt-4 ml-4">
      <h1 className="text-2xl font-bold mb-4">คำขอการจ้างงาน</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อผู้จ้าง</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">รายละเอียด</th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" 
              onClick={sortByCreatedAt}
            >
              วันที่
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">การรับงาน</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((job, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{job.user.firstname} {job.user.lastname}</td>
              <td className="px-6 py-4">{job.job_description}</td>
              <td className="px-6 py-4">{formatDate(job.createdAt)}</td>
              <td className="px-6 py-4">{job.status}</td>
              <td className="px-6 py-4">
                <button 
                  onClick={() => handleStatusUpdate(job.id, 'accepted')} 
                  disabled={job.status === 'accepted'}
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 ${job.status === 'accepted' ? 'disabled:bg-gray-400' : ''}`}
                >
                  Accept
                </button>
                <button 
                  onClick={() => handleStatusUpdate(job.id, 'cancelled')} 
                  disabled={job.status === 'accepted'} 
                  className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${job.status === 'accepted' ? 'disabled:bg-gray-400' : ''}`}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Job_Hiring_Photographer;
