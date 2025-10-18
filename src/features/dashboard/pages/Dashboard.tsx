import React from "react";
import "../styles/Dashboard.css";

const Dashboard: React.FC = () => {
  return (
    <div className="wrapper d-flex align-items-stretch">
      

      <div id="content" className="p-4 p-md-5 pt-5 flex-grow-1">
        <h2 className="mb-4">Dashboard (Sidebar #05)</h2>
        <p>
          This dashboard uses the <strong>Colorlib Sidebar #05</strong> layout.
          It includes a smooth toggle button, responsive layout, and newsletter
          form.
        </p>
        <p>
          Built using <strong>React + Bootstrap 5 + React Icons</strong> — no
          jQuery required.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
