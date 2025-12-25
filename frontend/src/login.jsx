import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/auth.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch {
      setError("Something went wrong");
    }

  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="auth-btn" type="submit">
            Login
          </button>
        </form>

        <div className="auth-footer">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/")}>Register</span>
        </div>
        <div className="auth-footer">
          <span onClick={() => navigate("/forgot-password")}>
            Forgot password?
          </span>
        </div>

      </div>
    </div>
  );
}

export default Login;




// import { useState } from "react"
// import { useNavigate } from "react-router-dom"

// function Login(){
// const navigate=useNavigate()
//     const[form,setform]=useState({
//         email:"",
//         password:""
//     })

//     const[error,seterror]=useState("")

//     const handlechange=async(e)=>{
//         setform({...form,[e.target.name]:e.target.value})
//     }

//     const handlesubmit=async(e)=>{
//         e.preventDefault();
//         try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: form.email,
//           password: form.password,
//         }),
//       });

//       const data = await res.json(); // parse JSON backend response

//       if (!res.ok) {
//         // backend sent an error
//         seterror(data.message || "login failed!");
//         return;
//       }
//       localStorage.setItem("token", data.token);
//       alert("Account login successfully!");
//       navigate("/dashboard")
//       //navigate("/auth/login");
//     } catch (error) {
//       console.log(error);
//       seterror("Something went wrong!");
//     }
//     }

//     return(
//         <>
//         <form onSubmit={handlesubmit}>

//           <div style={{ marginBottom: "10px", maxWidth:"400px"}}>
//             <label>Email</label><br />
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handlechange}
//               required
//               style={{ width: "100%" ,padding: "8px" }}
//             />
//           </div>

//           <div style={{ marginBottom: "10px", maxWidth:"400px" }}>
//             <label>Password</label><br />
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handlechange}
//               required
//               minLength="6"
//               style={{ width: "100%", padding: "8px" }}
//             />
//           </div>
//            <button
//             type="submit"
//             style={{ width: "100%", padding: "10px", marginTop: "10px" ,maxWidth:"400px" }}
//           >
//             Login
//           </button>

//           </form>
//         </>
//     )
// }
// export default Login