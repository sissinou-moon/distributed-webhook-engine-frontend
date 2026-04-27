const BASE = "http://localhost:8000";

export const signin = (data: any) =>
    fetch(`${BASE}/auth/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then(r => r.json());

export const signup = (data: any) =>
    fetch(`${BASE}/auth/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then(r => r.json());

export const verifyOtp = (data: any) =>
    fetch(`${BASE}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then(r => r.json());

export const verifyUsername = (data: any) =>
    fetch(`${BASE}/auth/verify-username`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then(r => r.json());

export const access = (data: any) =>
    fetch(`${BASE}/auth/access`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    }).then(r => r.json());