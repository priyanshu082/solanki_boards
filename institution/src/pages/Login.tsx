import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import background from "../assets/bg.jpg";
import axios from "axios";
import { BACKEND_URL } from "@/Config";
import { User, KeyRound, Shield, Eye,EyeOff } from "lucide-react";

export enum alertTypeEnum {
    success = "success",
    error = "error",
    info = "info",
    warning = "warning",
}

interface LoginInput {
    registrationNumber: string;
    dateOfBirth: string;
}

export const Auth = () => {
    const navigate = useNavigate();
    const [loginInputs, setLoginInputs] = useState<LoginInput>({
        registrationNumber: "",
        dateOfBirth: "",
    });

    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<alertTypeEnum>();
    const [showPassword, setShowPassword] = useState(false); 

    async function sendRequest() {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/login`,
                loginInputs
            );

            const user = response.data.user;

            localStorage.setItem("id", user.id);
            localStorage.setItem("name", user.name);
            localStorage.setItem("role", user.role);

            setAlertMessage("Login Successful");
            setAlertType(alertTypeEnum.success);

            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (e: any) {
            setAlertMessage(e.response?.data?.message || "An error occurred");
            setAlertType(alertTypeEnum.error);
            console.error(e.message);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-950 relative  rounded-md">
            {/* Background Image */}
            <img
                src={background}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover ml-[-0.1vw]"
            />
            <div className="absolute inset-0 bg-opacity-0"></div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-6xl mx-auto rounded-lg shadow-lg  ">
                {/* Left Side */}
                <div className="hidden lg:flex w-1/2 bg-blue-950 bg-opacity-50 p-8 flex-col rounded-l-lg justify-center items-center">
                    <img
                        src={logo}
                        alt="School Logo"
                        className="h-24 w-auto mb-8"
                    />
                    <Shield className="h-16 w-16 text-yellow-400 mb-6" />
                    <h1 className="text-3xl font-bold text-yellow-400 mb-4">
                        Welcome to Institution Portal
                    </h1>
                    <p className="text-gray-100 text-lg text-center">
                        Secure access to your personalized dashboard.
                        Enter your LoginID number and Password to
                        continue.
                    </p>
                </div>

                {/* Right Side */}
                <div className="flex-1 bg-blue-950 p-6 lg:p-12 rounded-r-lg">
                    <div className="max-w-md mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-yellow-200">
                                Institute Login
                            </h2>
                            <p className="text-gray-400 mt-2 text-sm">
                                Enter your credentials to continue.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {/* Registration Number Input */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-yellow-200" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Login ID"
                                    className="w-full pl-10 pr-3 py-2 border border-blue-800 bg-blue-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                    value={loginInputs.registrationNumber}
                                    onChange={(e) =>
                                        setLoginInputs({
                                            ...loginInputs,
                                            registrationNumber: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            {/* Date of Birth Input */}
                            <div className="space-y-4">
  
    <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-yellow-200" />
        </div>
        <input
            type={showPassword ? "text" : "password"} // Toggle between text and password
            placeholder="Password"
            className="w-full pl-10 pr-10 py-2 border border-blue-800 bg-blue-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
            value={loginInputs.dateOfBirth} // Example field, replace with the correct password field
            onChange={(e) =>
                setLoginInputs({
                    ...loginInputs,
                    dateOfBirth: e.target.value, // Example, replace as necessary
                })
            }
        />
        <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)} // Toggle visibility
        >
            {showPassword ? (
                <EyeOff className="h-5 w-5 text-yellow-200" />
            ) : (
                <Eye className="h-5 w-5 text-yellow-200" />
            )}
        </div>
    </div>
</div>

                            {/* Login Button */}
                            <button
                                onClick={sendRequest}
                                className="w-full bg-yellow-300 text-blue-950 py-3 rounded-lg hover:bg-yellow-200 transition-all duration-300 flex items-center justify-center space-x-2 font-bold"
                            >
                                <KeyRound className="h-5 w-5" />
                                <span>Login</span>
                            </button>

                            {/* Alert Message */}
                            {alertMessage && (
                                <div
                                    className={`
                                        p-4 rounded-lg text-center text-sm
                                        ${
                                            alertType ===
                                            alertTypeEnum.success
                                                ? "bg-green-500 text-white"
                                                : "bg-red-500 text-white"
                                        }
                                    `}
                                >
                                    {alertMessage}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
