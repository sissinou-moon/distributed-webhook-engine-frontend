import { signin, signup, verifyOtp, verifyUsername } from "@/lib/api";

export const useAuth = () => ({
    signin,
    signup,
    verifyOtp,
    verifyUsername,
});