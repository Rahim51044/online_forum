





// import { useForm } from "react-hook-form";
// import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
// import { Link, useLocation, useNavigate } from "react-router";
// import useAuth from "../../hooks/useAuth";
// import GoogleLogin from "./googleLogin";
// import useAxios from "../../hooks/useAxios";

// const RegisterPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const axiosInstance = useAxios()
//   const from = location.state?.from?.pathname || "/";

//   const { createUser, updateUserProfile } = useAuth();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const password = watch("password");

//   const onSubmit = (data) => {
//     createUser(data.email, data.password)
//       .then(async(result) => {
//         console.log(result.user);
//         const userProfile = {
//           displayName: data.name,
//           photoURL: data.photoURL,
//         };

//         // update user info in the database
//         const userInfo = {
//           email: data.email,
//           name: data.name,
//           role: "user",
//           created_at: new Date().toISOString(),
//           last_log_in: new Date().toISOString()
//         }

//         const userRes = await axiosInstance.post('/users', userInfo)
//         console.log(userRes);



//         // update user profile
//         updateUserProfile(userProfile)
//           .then(() => {
//             console.log("✅ Profile updated!");
//             navigate(from, { replace: true });
//           })
//           .catch((error) => {
//             console.error("❌ Profile update error:", error);
//           });
//       })
//       .catch((error) => {
//         console.error("❌ Registration error:", error);
//       });
//   };

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
//             {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
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
//             {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//           </div>

//           {/* Profile Picture */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Profile Photo URL</span>
//             </label>
//             <label className="input input-bordered flex items-center gap-2">
//               <FaImage />
//               <input
//                 type="text"
//                 placeholder="https://your-photo-url.com"
//                 {...register("photoURL", { required: "Photo URL is required" })}
//                 className="grow"
//               />
//             </label>
//             {errors.photoURL && <p className="text-red-500 text-sm">{errors.photoURL.message}</p>}
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
//                   minLength: { value: 6, message: "Minimum 6 characters" },
//                   pattern: {
//                     value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
//                     message: "Include upper & lowercase letters",
//                   },
//                 })}
//                 className="grow"
//               />
//             </label>
//             {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
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
//               <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
//             )}
//           </div>

          

//           {/* Submit */}
//           <div className="form-control mt-6">
//             <button type="submit" className="btn btn-primary w-full">
//               Register
//             </button>
//           </div>

//           {/* Switch to Login */}
//           <p className="text-sm text-center">
//             Already have an account?{" "}
//             <Link to="/login" className="text-primary underline">
//               Login
//             </Link>
//           </p>
//         </form>

//         {/* Google Login Button */}
//         <div className="divider">or</div>
//         <GoogleLogin />
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;




import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import GoogleLogin from "./googleLogin";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();
  const from = location.state?.from?.pathname || "/";
  const { createUser, updateUserProfile } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      // Upload profile image to imgbb
      const imageFile = data.photo[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: "POST",
        body: formData,
      });

      const imageData = await res.json();
      const imageUrl = imageData.data.url;

      // Create Firebase user
      const result = await createUser(data.email, data.password);
      const userProfile = {
        displayName: data.name,
        photoURL: imageUrl,
      };

      // Save to your backend database
      const userInfo = {
        email: data.email,
        name: data.name,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      await axiosInstance.post("/users", userInfo);

      // Update Firebase user profile
      await updateUserProfile(userProfile);

      // ✅ Show SweetAlert success message
      Swal.fire({
        title: "Registration Successful!",
        text: "Welcome to the community 🎉",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      // ⏳ Wait then redirect to home
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    } catch (error) {
      console.error("❌ Registration error:", error);

      // ❌ Show error alert
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Something went wrong!",
      });
    }
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

          {/* Profile Photo Upload */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Profile Photo</span>
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("photo", { required: "Photo is required" })}
              className="file-input file-input-bordered w-full"
            />
            {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
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

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </div>

          {/* Link to Login */}
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-primary underline">
              Login
            </Link>
          </p>
        </form>

        {/* Google Login */}
        <div className="divider">or</div>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default RegisterPage;
