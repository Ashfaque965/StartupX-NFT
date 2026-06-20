import React from "react";
import { useAuthStore } from "../store";
import { kycAdmin, users } from "../utils/api";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/AdminPanel.css";

const AdminPanel = () => {
  const { user } = useAuthStore();
  const [kycRecords, setKycRecords] = React.useState([]);
  const [userList, setUserList] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState("kyc");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (user?.role !== "ADMIN") return;
    fetchData();
  }, [user, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "kyc") {
        const records = await kycAdmin.getAll();
        setKycRecords(records || []);
      } else {
        const userRecords = await users.getAll();
        setUserList(userRecords || []);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyKYC = async (kycId) => {
    try {
      await kycAdmin.verifyRecord(kycId);
      fetchData();
    } catch (err) {
      setError("Failed to verify KYC");
    }
  };

  const handleRejectKYC = async (kycId) => {
    try {
      await kycAdmin.deleteRecord(kycId);
      fetchData();
    } catch (err) {
      setError("Failed to reject KYC");
    }
  };

  const handleAssignRole = async (userId, role) => {
    try {
      await users.assignRole(userId, role);
      fetchData();
    } catch (err) {
      setError("Failed to assign role");
    }
  };

  if (user?.role !== "ADMIN") {
    return (
      <div className="admin-panel">
        <div className="access-denied">
          <h1>Access Denied</h1>
          <p>You do not have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-container">
        <h1>Admin Control Panel</h1>

        <div className="admin-tabs">
          <button
            className={`tab ${activeTab === "kyc" ? "active" : ""}`}
            onClick={() => setActiveTab("kyc")}
          >
            KYC Records
          </button>
          <button
            className={`tab ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <LoadingSpinner message="Loading data..." />
        ) : activeTab === "kyc" ? (
          <div className="records-section">
            <h2>KYC Verification Records ({kycRecords.length})</h2>
            <div className="records-table">
              {kycRecords.length === 0 ? (
                <p className="no-data">No KYC records found</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Status</th>
                      <th>Submission Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kycRecords.map((record) => (
                      <tr key={record._id}>
                        <td>{record._id.slice(0, 8)}...</td>
                        <td>
                          <span className={`status ${record.status}`}>
                            {record.status}
                          </span>
                        </td>
                        <td>{new Date(record.createdAt).toLocaleDateString()}</td>
                        <td className="actions">
                          {record.status === "PENDING" && (
                            <>
                              <button
                                className="btn-small btn-success"
                                onClick={() => handleVerifyKYC(record._id)}
                              >
                                Verify
                              </button>
                              <button
                                className="btn-small btn-danger"
                                onClick={() => handleRejectKYC(record._id)}
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ) : (
          <div className="records-section">
            <h2>Users ({userList.length})</h2>
            <div className="records-table">
              {userList.length === 0 ? (
                <p className="no-data">No users found</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((userRecord) => (
                      <tr key={userRecord._id}>
                        <td>{userRecord.email}</td>
                        <td>{userRecord.firstName || "-"}</td>
                        <td>{userRecord.lastName || "-"}</td>
                        <td>
                          <span className={`role ${userRecord.role}`}>
                            {userRecord.role}
                          </span>
                        </td>
                        <td className="actions">
                          <select
                            value={userRecord.role}
                            onChange={(e) =>
                              handleAssignRole(userRecord._id, e.target.value)
                            }
                          >
                            <option value="USER">User</option>
                            <option value="VERIFIER">Verifier</option>
                            <option value="ADMIN">Admin</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
