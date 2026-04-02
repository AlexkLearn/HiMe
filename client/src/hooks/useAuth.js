/* eslint-disable no-unused-vars */
import API from "@services/api";
import { create } from "zustand";


const useAuth = create(
  (set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
      try {
        const res = await API.get('/auth/check')
        set({ authUser: res.data })
      }
      catch (e) {
        console.error(`Error checking auth: ${e.message}`);
        set({ authUser: null })
      }
      finally {
        set({ isCheckingAuth: false })
      }
    },

    signup: async (data) => {
      // to do
    }

  })
)

export default useAuth;