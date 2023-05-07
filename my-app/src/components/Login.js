import { useState } from "react"

const Login = () => {
    const [message, setMessage] = useState('Xin chào bạn')
    return (
        <div>
            <h1>{message}</h1>
            <button onClick={() => setMessage('Bạn đã đăng nhập thành công')}>Đăng Nhập</button>
        </div> 
    )
}
export default Login
