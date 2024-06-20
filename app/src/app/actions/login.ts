"use server";

import { redirect } from "next/navigation";

const login = () => {
    redirect("/api/spotify/auth/login");
};

export default login;
