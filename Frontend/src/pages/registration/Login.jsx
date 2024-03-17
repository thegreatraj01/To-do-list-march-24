import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, Bounce } from 'react-toastify';
import open_eye from '../../images/open-eye.png';
import close_eye from '../../images/close-eye.png';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/UserSlice';
import Mycontext from '../../context/data/Mycontext';
import Layout from '../../components/layout/Layout';

function Login() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();

    const handleUserLogin = (user, token) => {
        dispatch(userLogin({ user, token }));
    }

    const context = useContext(Mycontext)
    const { mode } = context

    const initialValues = {
        email: '',
        password: '',
        confirm_password: '',
        terms: false
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
        terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions')
    });

    const url = import.meta.env.VITE_REACT_APP_API_URL;

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        };
        try {
            const response = await fetch(`${url}/signup`, requestOptions);
            const data = await response.json();

            if (response.status === 201) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', data.user);
                handleUserLogin(data.user, data.token);

                toast.success('🦄 User login successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });

                navigate('/');
            }
            if (!response.ok) {
                toast.error(`🦄 ${data.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        } catch (error) {
            console.log('There was a problem with your fetch operation:', error);
        } finally {
            setSubmitting(false);
            resetForm();
        };
    }

    return (
        <Layout>
            <section className="" style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 44, 52)' : '', color: mode === 'dark' ? 'white' : '', }}>
                <div className="flex flex-col items-center justify-center px-6 mt-8 mx-auto  lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 44, 52)' : '', color: mode === 'dark' ? 'white' : '', }}>
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8" style={{ backgroundColor: mode === 'dark' ? '#1F1F1F' : '', color: mode === 'dark' ? 'white' : '', }}>
                            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl" style={{ color: mode === 'dark' ? 'white' : '', }}>
                                Login/Signup
                            </h1>

                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form className="space-y-4 md:space-y-2" style={{ backgroundColor: mode === 'dark' ? '#1F1F1F' : '', color: mode === 'dark' ? 'white' : '', }}>
                                        <div>
                                            <label style={{ color: mode === 'dark' ? 'white' : '', }} htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                            <Field type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required />
                                            <ErrorMessage name="email" component="div" className="text-red-600" />
                                        </div>
                                        <div className='relative'>
                                            <label style={{ color: mode === 'dark' ? 'white' : '', }} htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                            <Field type={open ? 'password' : 'text'} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10" required />
                                            <ErrorMessage name="password" component="div" className="text-red-600" />
                                            {!open ? <img onClick={() => setOpen(true)} className='absolute right-2 top-8 cursor-pointer' src={open_eye} alt="eye" /> :
                                                <img onClick={() => setOpen(false)} className='absolute right-2 top-8 cursor-pointer ' src={close_eye} alt="eye" />
                                            }
                                        </div>
                                        <div>
                                            <label style={{ color: mode === 'dark' ? 'white' : '', }} htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                                            <Field type="password" name="confirm_password" id="confirm_password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                                            <ErrorMessage name="confirm_password" component="div" className="text-red-600" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <Field type="checkbox" name="terms" id="terms" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 focus:border-primary-600" required />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label htmlFor="terms" className="text-gray-500">I agree to the <Link to="#" className="text-primary-600 hover:underline">Terms and Conditions</Link></label>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="w-ful bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled={isSubmitting}>Continue </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>

    );
}

export default Login;
