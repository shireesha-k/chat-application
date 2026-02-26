import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
    //we dont firstly if the user is authenticated or not that;s why null
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    //checking if he is authenticated or not when page is refreshed
    isCheckingAuth:true,

    checkAuth:async()=>{
        try{
            const res=await axiosInstance.get("/auth/check");
            set({authUser:res.data});
        }catch(error){
            console.log("Eroor in checkAuth",error);
            set({authUser:null});
        }finally{
            set({isCheckingAuth:false});
        }
    },
     
    // signup function is created
    signup:async(data)=>{
          set({isSigningUp:true});
           try{
             const res=await axiosInstance.post("/auth/signup",data);
             set({authUser:res.data});
             toast.success("Account created successfully");
           }catch(error){
            toast.error(error.response.data.message);
           }finally{
            set({isSigningUp:false});
           }
          
    },

    // a login function
                login: async (data) => {
            set({ isLoggingIng: true });
            try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast. success("Logged in successfully");
            } catch (error) {
            toast.error(error.response.data.message);
            } finally {
            set({ isLoggingIng: false });
            }
            },

    // now a logout secction
    logout: async () => {
      try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
            } catch (error) {
            toast.error(error.response.data.message);
            }
        },

    // To updat ean profile thsi function
        updateProfile: async (data) => {
            set({ isUpdatingProfile: true });
            try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
            I
            console. log("error in update profile:", error);
            toast.error(error. response.data.message);
            }finally {
            set({ isUpdatingProfile: false });
            }
            },
}));