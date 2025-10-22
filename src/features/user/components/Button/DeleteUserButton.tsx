import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiTrash2, FiAlertTriangle, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../api/userApi";
import { getCurrentUserId } from "../../../../utils/tokenUtils";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../user/styles/DeleteUserButton.css";

interface DeleteUserButtonProps {
  userId: string;
  fullName: string;
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({ userId, fullName }) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentUserId = getCurrentUserId();
  const isSelf = currentUserId === userId; // ✅ kiểm tra có phải đang xóa chính mình không

  const handleDelete = async () => {
    if (isSelf) return; // ✅ Ngăn không cho xóa bản thân
    if (!userId) return alert("Không tìm thấy User ID!");
    if (!window.confirm("⚠️ Bạn có chắc chắn muốn XÓA VĨNH VIỄN người dùng này?")) return;

    try {
      setIsDeleting(true);
      await userApi.deleteUserPermanently(userId);
      alert("✅ Tài khoản đã bị xóa vĩnh viễn khỏi hệ thống!");
      navigate("/UserManagement");
    } catch (error: any) {
      alert(error?.response?.data?.message || "❌ Không thể xóa tài khoản. Vui lòng thử lại!");
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
        className={`btn-delete ${isSelf ? "disabled" : ""}`}
        onClick={() => !isSelf && setShowConfirm(true)}
        whileHover={!isSelf ? { scale: 1.02 } : {}}
        whileTap={!isSelf ? { scale: 0.98 } : {}}
        disabled={isDeleting || isSelf}
        title={isSelf ? "Không thể tự xóa tài khoản của chính bạn" : "Xóa tài khoản"}
      >
        {isSelf ? <FiLock size={18} /> : <FiTrash2 size={18} />}
        {isSelf ? "Không thể tự xóa" : "Delete Account"}
      </motion.button>

      {/* 🔹 Modal xác nhận */}
      {showConfirm && !isSelf && (
        <div className="delete-modal-overlay" onClick={() => setShowConfirm(false)}>
          <motion.div
            className="delete-modal-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="delete-modal-icon">
              <FiAlertTriangle size={64} color="#ef4444" />
            </div>

            <h3 className="delete-modal-title">Xác nhận xóa tài khoản</h3>

            <p className="delete-modal-message">
              Bạn có chắc chắn muốn xóa tài khoản <strong>{fullName || "người dùng này"}</strong>?
              <br />
              <span className="delete-modal-warning">⚠️ Hành động này không thể hoàn tác!</span>
            </p>

            <div className="delete-modal-actions">
              <button
                className="btn btn-secondary me-2"
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
              >
                Hủy
              </button>

              <button className="btn btn-danger" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
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
