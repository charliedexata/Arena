import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CONFIG } from "../config";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from "../Context/AuthContext";

export default function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const { auth, setAuth } = useContext(AuthContext);
/*
    useEffect(() => {
        var dataLayer = {
          "page_name" : "register",
          "page_type" : "Register",
          "page_section": "Register",
          "login_status": auth.loggedIn_status,
          "currency": "usd",
          "channel": "web",
        }
        auth.user_id && (dataLayer["customer_id"] = auth.user_id);
    }, []);
*/
useEffect(() => {
    window.adobeDataLayer.push({
      "event": "landed",
      "eventInfo": {
          "eventName": "landed"
      },
      "custData": {
          "custId": auth.user_id,
          "loginStatus":auth.loggedIn_status
      },
      "page": {
          "pageName": "register",
          "pageType": "Register",
          "viewName": "register"
      }
    });
    }, []);  

    /*
    if(window.alloy){
        window.alloy("sendEvent", {
          "renderDecisions": true,
          decisionScopes: ["__view__"],
          "xdm": {
            "web": {
              "webPageDetails": {
                "viewName": "register"
              }
            }
          }
        })
    }
*/
    const validationSchema = () => {
        return Yup.object().shape({
            fname: Yup.string().required('Name is required').min(3, 'Name must be at least 6 characters'),
            email: Yup.string()
                .required('Email is required')
                .email('Email is invalid'),
            password: Yup.string()
                .required('Password is required')
                .min(6, 'Password must be at least 6 characters')
                .max(40, 'Password must not exceed 40 characters'),
            confirmPassword: Yup.string()
                .required('Confirm Password is required')
                .oneOf([Yup.ref('password'), null], 'Confirm Password does not match')
        });
    }

    const initialValues = {
        fname: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            {error && <div className="bg-red-100 border w-1/2 my-2 mx-auto border-red-400 text-center text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{errorText}</span>
            </div>}
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                            Create your account
                        </h1>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={async (values) => {
                                await sleep(500);
                                setError(false);
                                var myHeaders = new Headers();
                                myHeaders.append("Content-Type", "text/plain");
                                var raw = JSON.stringify({
                                    "email": values.email,
                                    "password": values.password,
                                    "user_name": values.fname
                                });
                                var requestOptions = {
                                    method: 'POST',
                                    headers: myHeaders,
                                    body: raw,
                                    redirect: 'follow'
                                };
                                fetch(CONFIG.BASE_URL + CONFIG.REGISTER_USER, requestOptions)
                                    .then(response => response.json())
                                    .then(result => {
                                        if (result.status == 200) {
                                            navigate('/register-successful');
                                        } else if(result.status == 301) {
                                            setError(true);
                                            setErrorText(CONFIG.exceptionError);
                                        } else {
                                            setError(true);
                                            setErrorText('Email already exist, please enter valid email');
                                        }
                                    })
                                    .catch(error => console.log('error', error));
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form className="space-y-4 md:space-y-6">
                                    <div className="form-group">
                                        <Field
                                            name="fname"
                                            type="text"
                                            className={
                                                'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none' +
                                                (errors.fname && touched.fname ? ' is-invalid' : '')
                                            }
                                            placeholder="Enter your name"
                                        />
                                        <ErrorMessage
                                            name="fname"
                                            component="div"
                                            className="mt-1 text-sm text-red-800 dark:text-red-400"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <Field
                                            name="email"
                                            type="email"
                                            className={
                                                'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none' +
                                                (errors.email && touched.email ? ' is-invalid' : '')
                                            }
                                            placeholder="Enter your email"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="mt-1 text-sm text-red-800 dark:text-red-400"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <Field
                                            name="password"
                                            type="password"
                                            className={
                                                'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none' +
                                                (errors.password && touched.password ? ' is-invalid' : '')
                                            }
                                            placeholder="Enter password"
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="mt-1 text-sm text-red-800 dark:text-red-400"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <Field
                                            name="confirmPassword"
                                            type="password"
                                            className={
                                                'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none' +
                                                (errors.confirmPassword && touched.confirmPassword
                                                    ? ' is-invalid'
                                                    : '')
                                            }
                                            placeholder="Enter confirm password"
                                        />
                                        <ErrorMessage
                                            name="confirmPassword"
                                            component="div"
                                            className="mt-1 text-sm text-red-800 dark:text-red-400"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#0351aa] py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                            Create account
                                        </button>
                                    </div>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={(e) => {
                                            e.preventDefault();
                                            navigate('/login')
                                        }} >Login here</a>
                                    </p>
                                </Form>
                            )}
                        </Formik>
                        <div className="flex items-center bg-blue-500 text-white text-sm px-4 py-3" role="alert">
                            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
                            <p>Please don't enter your personal email</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
