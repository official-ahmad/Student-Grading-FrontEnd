import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaExclamationCircle,
  FaCheckCircle,
  FaFilter,
  FaSync,
  FaChevronDown,
  FaTrophy,
  FaTimesCircle,
} from "react-icons/fa";

const API_URL = "http://localhost:8000/api";

const Recommendations = ({ adminToken }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!adminToken) {
      setError("No authentication token. Please login again.");
      setLoading(false);
      return;
    }
    fetchRecommendations();
    fetchSummary();
  }, [selectedRiskLevel, adminToken]);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = selectedRiskLevel ? { riskLevel: selectedRiskLevel } : {};
      const response = await axios.get(`${API_URL}/recommendations`, {
        headers: { Authorization: `Bearer ${adminToken}` },
        params,
      });
      const data = response.data.data || [];
      setRecommendations(data);
      if (data.length === 0) {
        toast.info("No students found with recommendations", { autoClose: 1000 });
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Failed to load recommendations";
      console.error("Recommendations error:", errorMsg);
      setError(errorMsg);
      toast.error(errorMsg, { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await axios.get(`${API_URL}/recommendations/summary/stats`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setSummary(response.data);
    } catch (error) {
      console.error("Summary error:", error.message);
    }
  };

  const getRiskLevelColor = (level) => {
    switch (level) {
      case "Critical":
        return "bg-red-100 border-red-300 text-red-800";
      case "High":
        return "bg-orange-100 border-orange-300 text-orange-800";
      case "Medium":
        return "bg-yellow-100 border-yellow-300 text-yellow-800";
      case "Low":
        return "bg-blue-100 border-blue-300 text-blue-800";
      case "Excellent":
        return "bg-green-100 border-green-300 text-green-800";
      default:
        return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  const getRiskLevelIcon = (level) => {
    switch (level) {
      case "Critical":
        return <FaTimesCircle className="w-5 h-5" />;
      case "High":
        return <FaExclamationCircle className="w-5 h-5" />;
      case "Excellent":
        return <FaTrophy className="w-5 h-5" />;
      default:
        return <FaCheckCircle className="w-5 h-5" />;
    }
  };

  const getRecommendationBgColor = (type) => {
    switch (type) {
      case "urgent":
        return "bg-red-50 border-l-4 border-red-500";
      case "subject-focus":
        return "bg-blue-50 border-l-4 border-blue-500";
      case "attendance":
        return "bg-orange-50 border-l-4 border-orange-500";
      case "consistency":
        return "bg-yellow-50 border-l-4 border-yellow-500";
      case "improvement":
        return "bg-purple-50 border-l-4 border-purple-500";
      case "excellence":
        return "bg-green-50 border-l-4 border-green-500";
      default:
        return "bg-gray-50 border-l-4 border-gray-500";
    }
  };

  if (!adminToken) {
    return (
      <div className="bg-red-50 border border-red-200 p-8 rounded-lg text-center">
        <p className="text-red-600 font-semibold">Authentication Error</p>
        <p className="text-red-500 text-sm">Please login again to access recommendations.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Student Recommendations</h2>
        <button
          onClick={() => {
            fetchRecommendations();
            fetchSummary();
          }}
          disabled={loading}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          <FaSync className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Error Message */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-sm opacity-90 font-semibold">Critical</p>
            <p className="text-3xl font-bold">{summary.byRiskLevel.Critical}</p>
            <p className="text-xs opacity-75 mt-1">Needs urgent attention</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-sm opacity-90 font-semibold">High</p>
            <p className="text-3xl font-bold">{summary.byRiskLevel.High}</p>
            <p className="text-xs opacity-75 mt-1">Needs monitoring</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-sm opacity-90 font-semibold">Medium</p>
            <p className="text-3xl font-bold">{summary.byRiskLevel.Medium}</p>
            <p className="text-xs opacity-75 mt-1">Can improve</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-sm opacity-90 font-semibold">Low</p>
            <p className="text-3xl font-bold">{summary.byRiskLevel.Low}</p>
            <p className="text-xs opacity-75 mt-1">Performing well</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-sm opacity-90 font-semibold">Excellent</p>
            <p className="text-3xl font-bold">{summary.byRiskLevel.Excellent}</p>
            <p className="text-xs opacity-75 mt-1">Top performers</p>
          </div>
        </div>
      )}

      {/* Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <FaFilter className="text-indigo-600 text-lg" />
          <h3 className="font-semibold text-gray-700 text-lg">Filter by Risk Level</h3>
        </div>
        <div className="flex gap-2 flex-wrap">
          {["", "Critical", "High", "Medium", "Low", "Excellent"].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedRiskLevel(level)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedRiskLevel === level
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {level || "All"}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading recommendations...</p>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 p-12 rounded-lg text-center">
            <FaCheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">No students found</p>
            <p className="text-gray-500 text-sm mt-1">Add students with marks to see recommendations</p>
          </div>
        ) : (
          recommendations.map((rec) => (
            <div key={rec.studentId} className="bg-white rounded-lg shadow hover:shadow-xl transition border border-gray-100">
              {/* Card Header */}
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 transition"
                onClick={() =>
                  setExpandedId(expandedId === rec.studentId ? null : rec.studentId)
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`w-14 h-14 rounded-lg flex items-center justify-center text-xl font-bold ${getRiskLevelColor(
                        rec.riskLevel
                      )}`}
                    >
                      {getRiskLevelIcon(rec.riskLevel)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg">{rec.name}</h3>
                      <p className="text-sm text-gray-600">
                        Roll No: {rec.rollNo} | Class: {rec.className}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-indigo-600">
                        {rec.percentage.toFixed(1)}%
                      </p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getRiskLevelColor(
                          rec.riskLevel
                        )}`}
                      >
                        {rec.riskLevel}
                      </span>
                    </div>
                  </div>
                  <FaChevronDown
                    className={`text-gray-400 transition-transform text-xl ${
                      expandedId === rec.studentId ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Expanded Content */}
              {expandedId === rec.studentId && (
                <div className="border-t border-gray-200 p-6 bg-gray-50 space-y-4">
                  {rec.recommendations.map((recItem, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg ${getRecommendationBgColor(
                        recItem.type
                      )}`}
                    >
                      <h4 className="font-bold mb-2 text-lg">{recItem.title}</h4>
                      <p className="text-sm mb-4 leading-relaxed">{recItem.message}</p>
                      <div className="space-y-2">
                        <p className="text-xs font-bold opacity-75 uppercase">📋 Action Items:</p>
                        <ul className="text-sm space-y-1 ml-2">
                          {recItem.actionItems.map((item, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="text-green-600 font-bold">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Recommendations;
