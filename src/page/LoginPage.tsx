import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import api from '../config/api';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

const LoginPage: React.FC = () => {
    const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: LoginFormValues) => {
    console.log("login values: ", values);
    const formData = {
  "email": values.email,
  "password": values.password
}
    try{
        const {data} = await api.post("/auth/login", formData);
        console.log(data);
        const token = data.result.token;
        localStorage.setItem("token", token);
        toast.success("login successfull!")
        nav("/");
    }catch(error){
        toast.error("login failed. please try again")
    }
    
  
  };

  const onFinishFailed = () => {
    message.error('Please check your form inputs');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-4">
              <LockOutlined className="text-3xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Please login to your account</p>
          </div>

          {/* Form */}
          <div className="ant-form-wrapper">
            <Form
              form={form}
              name="login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              size="large"
              className="space-y-2"
            >
            <Form.Item
              name="email"
              label={<span className="text-gray-700 font-semibold">Email</span>}
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="Enter your email"
                className="h-12 rounded-lg hover:border-purple-400 focus:border-purple-500"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="text-gray-700 font-semibold">Password</span>}
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter your password"
                className="h-12 rounded-lg hover:border-purple-400 focus:border-purple-500"
              />
            </Form.Item>

            <div className="flex items-center justify-between pt-2 pb-4">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="text-gray-600 font-medium">
                  Remember me
                </Checkbox>
              </Form.Item>
              <a 
                href="#" 
                className="text-purple-600 hover:text-purple-700 text-sm font-semibold transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0 rounded-lg text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Form.Item>
            </Form>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all duration-300">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-semibold text-gray-700">Google</span>
            </button>
            <button className="flex items-center justify-center px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all duration-300">
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-sm font-semibold text-gray-700">Facebook</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <a href="#" className="text-purple-600 hover:text-purple-700 font-semibold transition-colors">
              Sign up
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white text-sm mt-6 opacity-90">
          © 2025 Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;