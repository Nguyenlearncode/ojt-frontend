import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiTrash2, FiAlertTriangle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../user/api/userApi"; // ⚠️ chỉnh lại nếu API bạn nằm ở nơi khác
import "bootstrap/dist/css/bootstrap.min.css";
import "../../user/styles/DeleteUserButton.css"; // bạn có thể tạo file CSS riêng nếu muốn

interface DeleteUserButtonProps {
  userId: string;
  fullName: string;
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({ userId, fullName }) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (!userId) {
      alert("Không tìm thấy User ID!");
      return;
    }

    setIsDeleting(true);
    try {
      await userApi.deleteUser(userId);
      alert("Đã xóa tài khoản thành công!");
      navigate("/UserManagement");
    } catch (error) {
      alert("Không thể xóa tài khoản. Vui lòng thử lại!");
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      {/* 🔹 Nút Xóa */}
      <motion.button
        type="button"
        className="btn-delete"
        onClick={() => setShowConfirm(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FiTrash2 size={18} />
        Delete Account
      </motion.button>

      {/* 🔹 Modal xác nhận */}
      {showConfirm && (
        <div
          className="delete-modal-overlay"
          onClick={() => setShowConfirm(false)}
        >
          <motion.div
            className="delete-modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="delete-modal-icon">
              <FiAlertTriangle size={64} color="#ef4444" />
            </div>

            <h3 className="delete-modal-title">Xác nhận xóa tài khoản</h3>

            <p className="delete-modal-message">
              Bạn có chắc chắn muốn xóa tài khoản{" "}
              <strong>{fullName || "người dùng này"}</strong>?
              <br />
              <span className="delete-modal-warning">
                ⚠️ Hành động này không thể hoàn tác!
              </span>
            </p>

            <div className="delete-modal-actions">
              <button
                className="btn btn-secondary me-2"
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
              >
                Hủy
              </button>

              <button
                className="btn btn-danger"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Đang xóa...
                  </>
                ) : (
                  <>
                    <FiTrash2 size={16} className="me-2" />
                    Xác nhận xóa
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default DeleteUserButton;
