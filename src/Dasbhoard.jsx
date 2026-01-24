import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar - Modern Dark Look */}
      <div className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
        <div className="p-6 text-2xl font-bold border-b border-slate-700 text-center">
          Admin <span className="text-blue-400">Pro</span>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-4">
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 bg-blue-600 text-white"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-800 hover:text-white"
          >
            Students List
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-800 hover:text-white"
          >
            Attendance
          </a>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-300 shadow-md"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">
              Student Overview
            </h1>
            <p className="text-gray-500">
              Welcome back, manage your students easily.
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transform transition hover:scale-105">
            + Add Student
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500">
            <p className="text-sm text-gray-500 uppercase font-bold">
              Total Students
            </p>
            <p className="text-3xl font-black text-gray-800">1,250</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
            <p className="text-sm text-gray-500 uppercase font-bold">
              Pass Rate
            </p>
            <p className="text-3xl font-black text-gray-800">94.2%</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-purple-500">
            <p className="text-sm text-gray-500 uppercase font-bold">
              Average GPA
            </p>
            <p className="text-3xl font-black text-gray-800">3.8</p>
          </div>
        </div>

        {/* Modern Table Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-left text-sm uppercase font-bold">
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Roll No</th>
                <th className="px-6 py-4">Marks</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="flex items-center">
                    <div className="text-sm font-semibold text-gray-900">
                      Muhammad Ahmed
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">CS-2024-01</td>
                <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                  88 / 100
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs font-bold leading-tight text-green-700 bg-green-100 rounded-full">
                    Passed
                  </span>
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 font-bold">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900 font-bold">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
