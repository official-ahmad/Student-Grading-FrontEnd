import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaUserGraduate,
  FaChartLine,
  FaCalendarCheck,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaUserPlus,
  FaChartPie,
  FaMale,
  FaFemale,
  FaCheckCircle,
  FaHome,
  FaBell,
  FaCog,
  FaLightbulb,
} from "react-icons/fa";
import { HiAcademicCap, HiUserGroup } from "react-icons/hi";
import Recommendations from "./Recommendations";

const API_URL = "http://localhost:8000/api";

// Sidebar Component
const Sidebar = ({ activeNav, setActiveNav, isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", icon: FaHome },
    { name: "Students", icon: HiUserGroup },
    { name: "Attendance", icon: FaCalendarCheck },
    { name: "Recommendations", icon: FaLightbulb },
    { name: "Reports", icon: FaChartPie },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logged out successfully!", { autoClose: 1000 });
    navigate("/");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <HiAcademicCap className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-bold">GradeBook</h1>
              <p className="text-xs text-slate-400">Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <p className="text-xs text-slate-500 uppercase tracking-wider px-4 mb-4">
            Main Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.name;
            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveNav(item.name);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30"
                    : "hover:bg-slate-700/50"
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    isActive ? "text-white" : "text-slate-400"
                  }`}
                />
                <span
                  className={`font-medium ${
                    isActive ? "text-white" : "text-slate-300"
                  }`}
                >
                  {item.name}
                </span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-slate-700/50">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-700/30 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center font-bold">
              A
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Admin</p>
              <p className="text-xs text-slate-400">Super Admin</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white py-3 px-4 rounded-xl transition-all duration-300"
          >
            <FaSignOutAlt className="w-4 h-4" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

// Stats Card Component
const StatsCard = ({ title, value, icon: Icon, color, trend, trendValue }) => {
  const colorClasses = {
    blue: "from-blue-500 to-indigo-600",
    green: "from-emerald-500 to-teal-600",
    purple: "from-purple-500 to-pink-600",
    orange: "from-orange-500 to-red-600",
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
          {trend && (
            <div
              className={`flex items-center gap-1 mt-2 text-sm ${
                trend === "up" ? "text-emerald-600" : "text-red-500"
              }`}
            >
              <span>{trend === "up" ? "↑" : "↓"}</span>
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div
          className={`w-14 h-14 bg-gradient-to-br ${colorClasses[color]} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </div>
  );
};

// Student Modal (Create/Edit)
const StudentModal = ({ isOpen, onClose, student, onSave, isLoading }) => {
  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
    fatherName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "Male",
    address: "",
    className: "",
    section: "A",
    session: "",
    subjects: [
      { name: "Mathematics", totalMarks: 100, obtainedMarks: 0 },
      { name: "English", totalMarks: 100, obtainedMarks: 0 },
      { name: "Science", totalMarks: 100, obtainedMarks: 0 },
      { name: "Urdu", totalMarks: 100, obtainedMarks: 0 },
      { name: "Computer", totalMarks: 100, obtainedMarks: 0 },
    ],
  });

  useEffect(() => {
    if (student) {
      setFormData({
        ...student,
        dateOfBirth: student.dateOfBirth
          ? new Date(student.dateOfBirth).toISOString().split("T")[0]
          : "",
      });
    } else {
      setFormData({
        rollNo: "",
        name: "",
        fatherName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "Male",
        address: "",
        className: "",
        section: "A",
        session: new Date().getFullYear().toString(),
        subjects: [
          { name: "Mathematics", totalMarks: 100, obtainedMarks: 0 },
          { name: "English", totalMarks: 100, obtainedMarks: 0 },
          { name: "Science", totalMarks: 100, obtainedMarks: 0 },
          { name: "Urdu", totalMarks: 100, obtainedMarks: 0 },
          { name: "Computer", totalMarks: 100, obtainedMarks: 0 },
        ],
      });
    }
  }, [student, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index][field] = field === "name" ? value : Number(value);
    setFormData({ ...formData, subjects: newSubjects });
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [
        ...formData.subjects,
        { name: "", totalMarks: 100, obtainedMarks: 0 },
      ],
    });
  };

  const removeSubject = (index) => {
    const newSubjects = formData.subjects.filter((_, i) => i !== index);
    setFormData({ ...formData, subjects: newSubjects });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FaUserPlus className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {student ? "Edit Student" : "Add New Student"}
                </h2>
                <p className="text-indigo-200 text-sm">
                  Fill in the student details
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]"
        >
          {/* Basic Info */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 text-sm font-bold">
                1
              </span>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Roll Number *
                </label>
                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="e.g., 2024-CS-001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Father's Name *
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Father's Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="03XX-XXXXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Full Address"
                />
              </div>
            </div>
          </div>

          {/* Academic Info */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 text-sm font-bold">
                2
              </span>
              Academic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class *
                </label>
                <select
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Class</option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                  <option value="5th">5th</option>
                  <option value="6th">6th</option>
                  <option value="7th">7th</option>
                  <option value="8th">8th</option>
                  <option value="9th">9th</option>
                  <option value="10th">10th</option>
                  <option value="11th">11th</option>
                  <option value="12th">12th</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section
                </label>
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                  <option value="D">Section D</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Session
                </label>
                <input
                  type="text"
                  name="session"
                  value={formData.session}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="e.g., 2024"
                />
              </div>
            </div>
          </div>

          {/* Subjects */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-sm font-bold">
                  3
                </span>
                Subjects & Marks
              </h3>
              <button
                type="button"
                onClick={addSubject}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl hover:bg-emerald-200 transition-colors"
              >
                <FaPlus className="w-3 h-3" />
                Add Subject
              </button>
            </div>
            <div className="space-y-3">
              {formData.subjects.map((subject, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl"
                >
                  <input
                    type="text"
                    value={subject.name}
                    onChange={(e) =>
                      handleSubjectChange(index, "name", e.target.value)
                    }
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Subject Name"
                  />
                  <input
                    type="number"
                    value={subject.totalMarks}
                    onChange={(e) =>
                      handleSubjectChange(index, "totalMarks", e.target.value)
                    }
                    className="w-24 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Total"
                  />
                  <input
                    type="number"
                    value={subject.obtainedMarks}
                    onChange={(e) =>
                      handleSubjectChange(
                        index,
                        "obtainedMarks",
                        e.target.value,
                      )
                    }
                    className="w-24 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Obtained"
                  />
                  {formData.subjects.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSubject(index)}
                      className="w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </span>
              ) : student ? (
                "Update Student"
              ) : (
                "Add Student"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// View Student Modal
const ViewStudentModal = ({ isOpen, onClose, student }) => {
  if (!isOpen || !student) return null;

  const calculatePercentage = () => {
    if (!student.subjects || student.subjects.length === 0) return 0;
    const totalObtained = student.subjects.reduce(
      (sum, sub) => sum + sub.obtainedMarks,
      0,
    );
    const totalMarks = student.subjects.reduce(
      (sum, sub) => sum + sub.totalMarks,
      0,
    );
    return totalMarks > 0 ? ((totalObtained / totalMarks) * 100).toFixed(2) : 0;
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: "A+", color: "text-emerald-600" };
    if (percentage >= 80) return { grade: "A", color: "text-emerald-500" };
    if (percentage >= 70) return { grade: "B", color: "text-blue-600" };
    if (percentage >= 60) return { grade: "C", color: "text-yellow-600" };
    if (percentage >= 50) return { grade: "D", color: "text-orange-600" };
    return { grade: "F", color: "text-red-600" };
  };

  const percentage = calculatePercentage();
  const { grade, color } = getGrade(percentage);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-bold">
                {student.name?.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{student.name}</h2>
                <p className="text-indigo-200">{student.rollNo}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-2xl text-center">
              <p className="text-gray-500 text-sm">Percentage</p>
              <p className="text-2xl font-bold text-indigo-600">
                {percentage}%
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-2xl text-center">
              <p className="text-gray-500 text-sm">Grade</p>
              <p className={`text-2xl font-bold ${color}`}>{grade}</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-2xl text-center">
              <p className="text-gray-500 text-sm">Status</p>
              <p
                className={`text-2xl font-bold ${
                  percentage >= 50 ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {percentage >= 50 ? "Pass" : "Fail"}
              </p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 uppercase">Father's Name</p>
              <p className="font-semibold text-gray-800">
                {student.fatherName}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 uppercase">Class</p>
              <p className="font-semibold text-gray-800">
                {student.className} - {student.section}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 uppercase">Gender</p>
              <p className="font-semibold text-gray-800">{student.gender}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 uppercase">Session</p>
              <p className="font-semibold text-gray-800">{student.session}</p>
            </div>
            {student.email && (
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 uppercase">Email</p>
                <p className="font-semibold text-gray-800">{student.email}</p>
              </div>
            )}
            {student.phone && (
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 uppercase">Phone</p>
                <p className="font-semibold text-gray-800">{student.phone}</p>
              </div>
            )}
          </div>

          {/* Subjects */}
          {student.subjects && student.subjects.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Subject Marks
              </h3>
              <div className="space-y-3">
                {student.subjects.map((subject, index) => {
                  const subPercent =
                    subject.totalMarks > 0
                      ? (subject.obtainedMarks / subject.totalMarks) * 100
                      : 0;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <span className="font-medium text-gray-800 w-32">
                        {subject.name}
                      </span>
                      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            subPercent >= 50
                              ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                              : "bg-gradient-to-r from-red-500 to-orange-500"
                          }`}
                          style={{ width: `${subPercent}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-600 w-24 text-right">
                        {subject.obtainedMarks} / {subject.totalMarks}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Delete Confirmation Modal
const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  studentName,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTrash className="w-7 h-7 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Delete Student
          </h3>
          <p className="text-gray-500 mb-6">
            Are you sure you want to delete <strong>{studentName}</strong>? This
            action cannot be undone.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="px-6 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    maleStudents: 0,
    femaleStudents: 0,
    passRate: 0,
    averagePercentage: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem("adminToken");
  const headers = { Authorization: `Bearer ${token}` };

  // Fetch students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/students`, {
        headers,
        params: {
          search: searchTerm,
          className: selectedClass,
          page: currentPage,
          limit: 10,
        },
      });
      setStudents(response.data.students);
      setTotalPages(response.data.pagination.pages);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/students/stats`, {
        headers,
      });
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchStats();
  }, [searchTerm, selectedClass, currentPage]);

  // CRUD Operations
  const handleSaveStudent = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selectedStudent) {
        await axios.put(
          `${API_URL}/students/${selectedStudent._id}`,
          formData,
          {
            headers,
          },
        );
        toast.success("Student updated successfully!", { autoClose: 2000 });
      } else {
        await axios.post(`${API_URL}/students`, formData, { headers });
        toast.success("Student added successfully!", { autoClose: 2000 });
      }
      setIsModalOpen(false);
      setSelectedStudent(null);
      fetchStudents();
      fetchStats();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!", {
        autoClose: 1000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteStudent = async () => {
    setIsSubmitting(true);
    try {
      await axios.delete(`${API_URL}/students/${selectedStudent._id}`, {
        headers,
      });
      toast.error("Student deleted successfully!", { autoClose: 1000 });
      setIsDeleteModalOpen(false);
      setSelectedStudent(null);
      fetchStudents();
      fetchStats();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete student!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const openViewModal = (student) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };

  const openDeleteModal = (student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  // Dashboard Content
  const renderDashboard = () => (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Students"
          value={stats.totalStudents}
          icon={HiUserGroup}
          color="blue"
          trend="up"
          trendValue="+12%"
        />
        <StatsCard
          title="Active Students"
          value={stats.activeStudents}
          icon={FaUserGraduate}
          color="green"
        />
        <StatsCard
          title="Pass Rate"
          value={`${stats.passRate}%`}
          icon={FaCheckCircle}
          color="purple"
          trend="up"
          trendValue="+5%"
        />
        <StatsCard
          title="Average %"
          value={`${stats.averagePercentage}%`}
          icon={FaChartLine}
          color="orange"
        />
      </div>

      {/* Gender Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Students
          </h3>
          {students.length > 0 ? (
            <div className="space-y-4">
              {students.slice(0, 5).map((student) => (
                <div
                  key={student._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold ${
                        student.gender === "Male"
                          ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                          : "bg-gradient-to-br from-pink-500 to-rose-600"
                      }`}
                    >
                      {student.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {student.name}
                      </p>
                      <p className="text-sm text-gray-500">{student.rollNo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">
                      {student.className}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        student.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {student.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <HiUserGroup className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No students found. Add your first student!</p>
            </div>
          )}
        </div>

        {/* Gender Distribution Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Gender Distribution
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FaMale className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Male
                  </span>
                  <span className="text-sm font-bold text-gray-800">
                    {stats.maleStudents}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        stats.totalStudents > 0
                          ? (stats.maleStudents / stats.totalStudents) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                <FaFemale className="w-6 h-6 text-pink-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Female
                  </span>
                  <span className="text-sm font-bold text-gray-800">
                    {stats.femaleStudents}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        stats.totalStudents > 0
                          ? (stats.femaleStudents / stats.totalStudents) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Students List Content
  const renderStudents = () => (
    <>
      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          >
            <option value="">All Classes</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
            <option value="5th">5th</option>
            <option value="6th">6th</option>
            <option value="7th">7th</option>
            <option value="8th">8th</option>
            <option value="9th">9th</option>
            <option value="10th">10th</option>
          </select>
          <button
            onClick={() => {
              setSelectedStudent(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
          >
            <FaPlus className="w-4 h-4" />
            Add Student
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading students...</p>
          </div>
        ) : students.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left py-4 px-6 font-semibold text-gray-600 uppercase text-sm">
                      Student
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-600 uppercase text-sm">
                      Roll No
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-600 uppercase text-sm">
                      Class
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-600 uppercase text-sm">
                      Percentage
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-600 uppercase text-sm">
                      Status
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-600 uppercase text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {students.map((student) => (
                    <tr
                      key={student._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold ${
                              student.gender === "Male"
                                ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                                : "bg-gradient-to-br from-pink-500 to-rose-600"
                            }`}
                          >
                            {student.name?.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {student.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {student.fatherName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-mono text-gray-600">
                        {student.rollNo}
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium">
                          {student.className} - {student.section}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                student.percentage >= 50
                                  ? "bg-emerald-500"
                                  : "bg-red-500"
                              }`}
                              style={{ width: `${student.percentage || 0}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {student.percentage || 0}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            student.result === "Pass"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {student.result || "N/A"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openViewModal(student)}
                            className="w-9 h-9 flex items-center justify-center text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            title="View"
                          >
                            <FaEye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openEditModal(student)}
                            className="w-9 h-9 flex items-center justify-center text-amber-600 hover:bg-amber-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(student)}
                            className="w-9 h-9 flex items-center justify-center text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between p-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiUserGroup className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No students found
            </h3>
            <p className="text-gray-500 mb-4">
              Get started by adding your first student
            </p>
            <button
              onClick={() => {
                setSelectedStudent(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              <FaPlus className="w-4 h-4" />
              Add Student
            </button>
          </div>
        )}
      </div>
    </>
  );

  // Attendance Content (Placeholder)
  const renderAttendance = () => (
    <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FaCalendarCheck className="w-10 h-10 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Attendance Module
      </h3>
      <p className="text-gray-500">
        Coming soon! This feature is under development.
      </p>
    </div>
  );

  // Reports Content (Placeholder)
  const renderRecommendations = () => (
    <Recommendations adminToken={token} />
  );

  const renderReports = () => (
    <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
      <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FaChartPie className="w-10 h-10 text-purple-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Reports Module
      </h3>
      <p className="text-gray-500">
        Coming soon! This feature is under development.
      </p>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans">
      {/* Sidebar */}
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <FaBars className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {activeNav}
                </h1>
                <p className="text-sm text-gray-500">
                  Welcome back! Here's what's happening today.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-xl transition-colors relative">
                <FaBell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                <FaCog className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeNav === "Dashboard" && renderDashboard()}
          {activeNav === "Students" && renderStudents()}
          {activeNav === "Attendance" && renderAttendance()}
          {activeNav === "Recommendations" && renderRecommendations()}
          {activeNav === "Reports" && renderReports()}
        </div>
      </main>

      {/* Modals */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
        onSave={handleSaveStudent}
        isLoading={isSubmitting}
      />
      <ViewStudentModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedStudent(null);
        }}
        onConfirm={handleDeleteStudent}
        studentName={selectedStudent?.name}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default Dashboard;
