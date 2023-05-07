import React, { Component } from 'react';

class LoginClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Xin chào bạn'
        }
    }
    
    render() {
        return (
            <div>
                <h1>{this.state.message}</h1>
                <button onClick={() => this.setState({message:'Bạn đã đăng nhập thành công'})}>Đăng Nhập</button>
            </div>
        );
    }
}

export default LoginClass;
