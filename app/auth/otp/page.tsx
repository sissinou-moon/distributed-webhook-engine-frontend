"use client"
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useRef, useState } from "react";
import { verifyOtp, access } from "@/lib/api";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function OTP() {

    const params = useSearchParams();
    const email = params.get("email");
    const user_id = params.get("user_id");
    const username = params.get("username");

    const router = useRouter()


    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (value: string, index: number) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // move to next
        if (value && index < 5) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: any, index: number) => {
        // backspace → go back
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const handleVerifyOTP = async (e: any) => {
        e.preventDefault();
        setLoading(true)
        const otpCode = otp.join("");
        const res = await verifyOtp({ email, otp: otpCode });
        if (res['success']) {
            console.log(res)
            handleAccess(e)
        } else {
            setLoading(false)
            setError(res['message'])
        }
    }

    const handleAccess = async (e: any) => {
        e.preventDefault();

        const res = await access({ id: user_id, email, username })

        if (res['success']) {
            setLoading(false)
            router.push("/dashboard")
        } else {
            setLoading(false)
            setError(res['message'])
        }

    }

    return (
        <section className="flex h-screen w-screen items-center justify-center bg-[#F8F8F8] gap-15 px-5 ">
            <div className="flex flex-col items-start justify-center gap-2 w-[45%] px-30 ">
                <Image src="/assets/logo.png" alt="logo" width={50} height={50} />
                <h2 className="text-[#131313] font-semibold text-3xl">Verify OTP</h2>
                <div className="flex flex-row gap-1">
                    <h3 className="text-[#131313]/30 text-lg">We sent a code to </h3>
                    <h3 className="text-[#131313]/70 text-lg font-semibold">{email}</h3>
                </div>

                <div className="flex flex-col mt-5 w-full">
                    <div className="flex justify-between">
                        {otp.map((digit, i) => (
                            <input
                                key={i}
                                ref={(el) => {
                                    inputs.current[i] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                className="w-12 h-14 text-center text-lg text-primary rounded-xl border border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                            />
                        ))}
                    </div>
                </div>

                <div className="w-full">
                    <button onClick={handleVerifyOTP} disabled={loading} className={` ${loading ? "bg-primary/50 cursor-not-allowed" : "bg-primary cursor-pointer"} border border-primary w-full h-10 rounded-lg text-white font-semibold text-sm shadow-[inset_6px_6px_10px_#565657] mt-10 flex items-center justify-center gap-2`}>
                        {loading ? <Loader2 width={18} height={18} className="text-white/70 animate-spin" /> : null}
                        Confirm
                    </button>
                </div>

                {
                    error !== '' ? (
                        <div className="flex w-full items-center justify-center">
                            <p className="text-error/80 text-xs">{error}</p>
                        </div>
                    ) : null
                }

                <button onClick={() => {
                    router.back()
                }} className="flex flex-row justify-center items-center w-full mt-10 gap-2 cursor-pointer">
                    <ArrowLeft width={18} height={18} className="text-primary/40" />
                    <p className="text-primary/40 text-sm cursor-pointer">Back</p>
                </button>

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
    )
}