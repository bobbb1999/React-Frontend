import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin_AllUser = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(20);
    const token = localStorage.getItem("token");
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/admin/all-users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);

    // Logic for Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <div className='max-w-md w-full'>
                <input
                    type="text"
                    placeholder="Search by email..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 mb-4 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-md bg-white shadow-md rounded mb-4">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left p-3 px-5">ID</th>
                            <th className="text-left p-3 px-5">Email</th>
                            <th className="text-left p-3 px-5">Firstname</th>
                            <th className="text-left p-3 px-5">Lastname</th>
                            <th className="text-left p-3 px-5">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers
                            .filter(user =>
                                user.email.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map(user => (
                                <tr key={user.id} className="border-b hover:bg-orange-100 bg-gray-100">
                                    <td className="p-3 px-5">{user.id}</td>
                                    <td className="p-3 px-5">{user.email}</td>
                                    <td className="p-3 px-5">{user.firstname}</td>
                                    <td className="p-3 px-5">{user.lastname}</td>
                                    <td className="p-3 px-5">{user.role}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <ul className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map(
                    (item, index) => (
                        <li
                            key={index}
                            className="cursor-pointer mx-1 px-3 py-1 bg-blue-500 text-white rounded"
                            onClick={() => paginate(index + 1)}
                        >
                            {index + 1}
                        </li>
                    )
                )}
            </ul>
        </div>
    );
};

export default Admin_AllUser;

