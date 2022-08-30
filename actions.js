import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRoute, loginRoute } from "./utils/APIRoutes";

export const getPostAsync = createAsyncThunk("user/getPostAsync", async () => {
    const response = await axios.get(postRoute);
    console.log("response");
    if (response.status == 200) {
        const posts = await response.json();
        return { posts };
    }
});

export const getUerAsync = createAsyncThunk("user/getUserAsync", async () => {
    const response = await axios.get(loginRoute);
    if (response.status == 200) {
        const user = await response.json();
        return { user };
    }
});
