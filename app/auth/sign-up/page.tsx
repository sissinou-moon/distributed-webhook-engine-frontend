"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/lib/api";


export default function SignUn() {

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ip, setIP] = useState('')
    const [agent, setAgent] = useState('')

    useEffect(() => {
        fetch("/api/me")
            .then(r => r.json())
            .then(({ ip, userAgent }) => {
                setIP(ip)
                setAgent(userAgent)
            });
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await signup({ email, username, password, ip, agent });
        console.log(res)
        // redirect to OTP
    };

    return (
        <section className="flex h-screen w-screen items-center justify-center bg-[#F8F8F8] gap-15 px-5 ">
            <div className="flex flex-col items-start justify-center gap-2 w-[45%] px-30 ">
                <Image src="/assets/logo.png" alt="logo" width={50} height={50} />
                <h2 className="text-[#131313] font-semibold text-3xl">Create your account</h2>
                <h3 className="text-[#131313]/30 text-lg">Please fill your fields</h3>

                <div className="flex flex-col mt-5 w-full">
                    <label htmlFor="" className="text-[#131313]/60 text-sm">Username</label>
                    <div className="relative">
                        <Image src="/assets/User.png" alt="user" width={20} height={20} className="absolute left-2 top-[57%] -translate-y-1/2" />
                        <input type="text" onChange={(value) => setUsername(value.target.value)} placeholder="Input your username" className="border border-primary/25 rounded-lg p-2 mt-2 focus:border-[#131313] focus:ring-1 focus:ring-[#131313]/10 outline-none transition-all duration-300 text-md text-black pl-8 placeholder:text-black/35 w-full" />
                    </div>
                </div>

                <div className="flex flex-col mt-5 w-full">
                    <label htmlFor="" className="text-[#131313]/60 text-sm">Email</label>
                    <div className="relative">
                        <Image src="/assets/letter.png" alt="letter" width={20} height={20} className="absolute left-2 top-[57%] -translate-y-1/2" />
                        <input type="email" onChange={(value) => setEmail(value.target.value)} placeholder="Input your email" className="border border-primary/25 rounded-lg p-2 mt-2 focus:border-[#131313] focus:ring-1 focus:ring-[#131313]/10 outline-none transition-all duration-300 text-md text-black pl-8 placeholder:text-black/35 w-full" />
                    </div>
                </div>

                <div className="flex flex-col mt-5 w-full">
                    <label htmlFor="" className="text-[#131313]/60 text-sm">Password</label>
                    <div className="relative">
                        <Image src="/assets/Lock Keyhole.png" alt="lock" width={20} height={20} className="absolute left-2 top-[57%] -translate-y-1/2" />
                        <Image src={showPassword ? "/assets/Eye Closed.png" : "/assets/eye.png"} alt="eye" width={20} height={20} onClick={() => { setShowPassword(!showPassword) }} className="absolute right-2 top-[57%] -translate-y-1/2 cursor-pointer" />
                        <input type={showPassword ? "text" : "password"} onChange={(value) => setPassword(value.target.value)} placeholder="Input your password" className="border border-primary/25 rounded-lg p-2 mt-2 focus:border-[#131313] focus:ring-1 focus:ring-[#131313]/10 outline-none transition-all duration-300 text-md text-black pl-8 pr-8 placeholder:text-black/35 w-full" />
                    </div>
                </div>

                <div className="flex items-end justify-end w-full">
                    <button onClick={() => { }} className="text-primary text-xs text-medium cursor-pointer">Forgot Password!</button>
                </div>

                <div className="w-full">
                    <button onClick={handleSubmit} className="bg-primary border border-primary w-full h-10 rounded-lg text-white font-semibold text-sm cursor-pointer shadow-[inset_6px_6px_10px_#565657] mt-10">Sign Un</button>
                </div>

                <div className="flex justify-center items-center w-full mt-3">
                    <p className="text-primary/40 text-xs">Or Login With</p>
                </div>

                <div className="flex w-full justify-center items-center mt-5 border border-primary/30 py-2 rounded-lg cursor-pointer">
                    <Image src="/assets/google.png" alt="logo" width={25} height={25} className="mr-3" />
                    <button onClick={() => { }} className="text-primary text-sm font-semibold cursor-pointer">Sign in with google</button>
                </div>

                <div className="flex justify-center items-center w-full mt-3">
                    <button onClick={() => {
                        router.push("/auth/sign-in")
                    }} className="flex flex-row items-center justify-center gap-2">
                        <p className="text-primary/40 text-xs">You have an account?</p>
                        <p className="text-primary text-xs font-semibold cursor-pointer">Login</p>
                    </button>
                </div>

            </div>
            <div className="relative w-[50%] h-[95%] flex items-center justify-center bg-secondary/40 rounded-2xl my-5 overflow-hidden">
                <Image
                    src="/assets/Dashboard 1.png"
                    alt="background"
                    width={2500}
                    height={2000}
                    priority
                    className="absolute -right-10 -bottom-15 w-full h-full object-contain"
                />
            </div>
        </section>
    );
}