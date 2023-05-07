import { useState } from "react";

const LoginHeader = () => {
  const headerStyle = {
    overflow: "hidden",
    background: "linear-gradient(to left, red , yellow)",
    display: "flex",
    justifyContent: "space-between"
  };
  const [message, setMessage] = useState("Xin chào bạn");
  return (
    <div style={headerStyle}>
      <h1>{message}</h1>
      <button onClick={() => setMessage("Bạn đã đăng nhập thành công")}>
        Đăng Nhập
      </button>
    </div>
  );
};
export default LoginHeader;
