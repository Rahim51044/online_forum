// import { useForm } from "react-hook-form";
// import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
// import { Link, useLocation, useNavigate } from "react-router";
// import useAuth from "../../hooks/useAuth";
// import GoogleLogin from "./googleLogin";

// const RegisterPage = () => {
//     const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/"; // default: home

// const {createUser, updateUserProfile} = useAuth()
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     console.log("Register data:", data);
//     console.log(createUser);
//     createUser(data.email, data.password)
//   .then(result => {
//     console.log(result.user);
//     const userProfile = {
//       displayName: data.name, // ✅ এই line ঠিক
//     };
//     updateUserProfile(userProfile)
//       .then(() => {
//         console.log('✅ profile name updated');
//         navigate(from, { replace: true });
//       })
//       .catch(error => console.error("❌ profile update error", error));
//   })
//   .catch(error => console.error("❌ registration error", error));


//   };

  
//   const password = watch("password");

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-base-200">
//       <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8">
//         <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Full Name */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Full Name</span>
//             </label>
//             <label className="input input-bordered flex items-center gap-2">
//               <FaUser />
//               <input
//                 type="text"
//                 placeholder="Your Full Name"
//                 {...register("name", { required: "Name is required" })}
//                 className="grow"
//               />
//             </label>
//             {errors.name && (
//               <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Email</span>
//             </label>
//             <label className="input input-bordered flex items-center gap-2">
//               <FaEnvelope />
//               <input
//                 type="email"
//                 placeholder="email@example.com"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^\S+@\S+$/i,
//                     message: "Enter a valid email",
//                   },
//                 })}
//                 className="grow"
//               />
//             </label>
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//             )}
//           </div>

//           {/* Password */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Password</span>
//             </label>
//             <label className="input input-bordered flex items-center gap-2">
//               <FaLock />
//               <input
//                 type="password"
//                 placeholder="Create Password"
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 6,
//                     message: "Must be at least 6 characters",
//                   },
//                   pattern: {
//                     value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
//                     message:
//                       "Must include both uppercase & lowercase letters",
//                   },
//                 })}
//                 className="grow"
//               />
//             </label>
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//             )}
//           </div>

//           {/* Confirm Password */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Confirm Password</span>
//             </label>
//             <label className="input input-bordered flex items-center gap-2">
//               <FaLock />
//               <input
//                 type="password"
//                 placeholder="Repeat Password"
//                 {...register("confirmPassword", {
//                   required: "Confirm your password",
//                   validate: (value) =>
//                     value === password || "Passwords do not match",
//                 })}
//                 className="grow"
//               />
//             </label>
//             {errors.confirmPassword && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.confirmPassword.message}
//               </p>
//             )}
//           </div>

//           <div className="form-control mt-6">
//             <button type="submit" className="btn btn-primary w-full">
//               Register
//             </button>
//           </div>

//           <p className="text-sm text-center">
//             Already have an account?{" "}
//             <Link to='/login' className="text-primary underline">Login</Link>
//           </p>
//         </form>
//         <GoogleLogin></GoogleLogin>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;







import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import GoogleLogin from "./googleLogin";
import useAxios from "../../hooks/useAxios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios()
  const from = location.state?.from?.pathname || "/";

  const { createUser, updateUserProfile } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(async(result) => {
        console.log(result.user);
        const userProfile = {
          displayName: data.name,
          photoURL: data.photoURL,
        };

        // update user info in the database
        const userInfo = {
          email: data.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString()
        }

        const userRes = await axiosInstance.post('/users', userInfo)
        console.log(userRes);



        // update user profile
        updateUserProfile(userProfile)
          .then(() => {
            console.log("✅ Profile updated!");
            navigate(from, { replace: true });
          })
          .catch((error) => {
            console.error("❌ Profile update error:", error);
          });
      })
      .catch((error) => {
        console.error("❌ Registration error:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <FaUser />
              <input
                type="text"
                placeholder="Your Full Name"
                {...register("name", { required: "Name is required" })}
                className="grow"
              />
            </label>
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <FaEnvelope />
              <input
                type="email"
                placeholder="email@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
                className="grow"
              />
            </label>
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Profile Picture */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Profile Photo URL</span>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <FaImage />
              <input
                type="text"
                placeholder="https://your-photo-url.com"
                {...register("photoURL", { required: "Photo URL is required" })}
                className="grow"
              />
            </label>
            {errors.photoURL && <p className="text-red-500 text-sm">{errors.photoURL.message}</p>}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <FaLock />
              <input
                type="password"
                placeholder="Create Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message: "Include upper & lowercase letters",
                  },
                })}
                className="grow"
              />
            </label>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <FaLock />
              <input
                type="password"
                placeholder="Repeat Password"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="grow"
              />
            </label>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          

          {/* Submit */}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </div>

          {/* Switch to Login */}
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-primary underline">
              Login
            </Link>
          </p>
        </form>

        {/* Google Login Button */}
        <div className="divider">or</div>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default RegisterPage;

