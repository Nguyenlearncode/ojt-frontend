import { motion } from "framer-motion";

export const EmptyState = ({ message = "No users found" }) => (
  <motion.div className="empty-state" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <div className="empty-icon">👥</div>
    <h3>{message}</h3>
    <p>Thử điều chỉnh tìm kiếm hoặc bộ lọc của bạn</p>
  </motion.div>
);
