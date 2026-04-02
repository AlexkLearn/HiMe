/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";

import useAuth from "@hooks/useAuth";
import {
  MessageSquare, User, Mail,
  Lock, Eye, EyeOff, Loader2
} from "lucide-react";
import AuthImagePattern from "@components/AuthImagePattern";


export default function Signup () {
  const [ showPassword, setShowPassword ] = useState(false)
  const [ formData, setFormData ] = useState({
    fullname: "",
    email: "",
    password: ""
  })

  const { signup, isSigningUp } = useAuth()


  const validateForm = () => {
    // Todo
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // To do
  }


  return (
    <main className="min-h-screen grid lg:grid-cols-2">

      <section
        className="flex flex-col justify-center items-center p-6 sm:p-12"
      >
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 bg-primary/10 rounded-xl flex items-center group-hover:bg-primary/20 justify-center transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1
                className="text-2xl font-bold mt-2"
              >
                Create Account
              </h1>
              <p
                className="text-base-content/60"
              >
                Get started with your free account.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="John Smith"
                  value={formData.fullname}
                  onChange={
                    (e) => {
                      setFormData({
                        ...formData, fullname: e.target.value
                      })
                    }
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={
                    (e) => {
                      setFormData({
                        ...formData, email: e.target.value
                      })
                    }
                  }
                />
              </div>
            </div>   

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={ showPassword ? 'text' : 'password' }
                  className="input input-bordered w-full pl-10"
                  placeholder="*********"
                  value={formData.password}
                  onChange={
                    (e) => {
                      setFormData({
                        ...formData, password: e.target.value
                      })
                    }
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  aria-pressed={showPassword}
                  onClick={
                    () => setShowPassword(!showPassword)
                  }
                >
                  {
                    showPassword
                      ? <EyeOff className="size-5 text-base-content/40" />
                      : <Eye className="size-5 text-base-content/40" />
                  }
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {
                isSigningUp
                  ? (<>
                      <Loader2 className="size-5 animate-spin" />
                      Signing up...
                    </>)
                  : 'Create Account'
              }
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account? {" "}
              <Link to="/login" className="link-primary">
                Login
              </Link>
            </p>
          </div>

        </div>
      </section>

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />

    </main>
  );
}