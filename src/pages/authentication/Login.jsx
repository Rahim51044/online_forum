// import { useForm } from "react-hook-form";
// import { FaUser, FaLock } from "react-icons/fa";
// import { Link, useLocation, useNavigate } from "react-router";
// import GoogleLogin from "./googleLogin";
// import useAuth from "../../hooks/useAuth";

// const Login = () => {
//     const {signIn} = useAuth()
//  const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/"; 
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     console.log("Login Data:", data);
//       signIn(data.email, data.password)
//       .then(result => {
//         console.log(result.user);
//         navigate(from, { replace: true });
//       })
//       .catch(error => {
//         console.log(error);
//       })
    
      
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-base-200">
//       <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8">
//         <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Email Field */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Email</span>
//             </label>
//             <label className="input input-bordered flex items-center gap-2">
//               <FaUser />
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

//           {/* Password Field */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Password</span>
//             </label>
//             <label className="input input-bordered flex items-center gap-2">
//               <FaLock />
//               <input
//                 type="password"
//                 placeholder="Your Password"
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 6,
//                     message: "Must be at least 6 characters",
//                   },
//                   pattern: {
//                     value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
//                     message: "Must include both uppercase & lowercase letters",
//                   },
//                 })}
//                 className="grow"
//               />
//             </label>
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//             )}
//           </div>

//           <div className="form-control mt-6">
//             <button type="submit" className="btn btn-primary w-full">
//               Login
//             </button>
//           </div>

//           <p className="text-sm text-center">
//             Don’t have an account?{" "}
//             <Link to='/register' className="text-primary underline">Register</Link>
//           </p>
//         </form>
//         <GoogleLogin></GoogleLogin>
//       </div>
//     </div>
//   );
// };

// export default Login;





import { useForm } from "react-hook-form";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "./googleLogin";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        Swal.fire({
          title: "Login Successful 🎉",
          text: `Welcome back, ${result.user.displayName || "User"}!`,
          icon: "success",
          confirmButtonColor: "#2563eb",
          confirmButtonText: "Continue",
        }).then(() => {
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Login Failed",
          text: error.message,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <FaUser />
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
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <FaLock />
              <input
                type="password"
                placeholder="Your Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message: "Must include both uppercase & lowercase letters",
                  },
                })}
                className="grow"
              />
            </label>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </div>

          <p className="text-sm text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-primary underline">
              Register
            </Link>
          </p>
        </form>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Login;
