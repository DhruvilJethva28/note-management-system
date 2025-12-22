import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/auth.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      navigate("/login");
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Register</h2>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

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
            Register
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </div>
      </div>
    </div>
  );
}

export default Register;






// import { useState } from "react"
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// function Register() {
//   //const navigate = useNavigate();

//   const [form, setform] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmpass: ""
//   })
//   const [error, seterror] = useState("")

//   const handlechange = (e) => {
//     setform({ ...form, [e.target.name]: e.target.value })
//   }

//   const handlesubmit = async (e) => {
//     e.preventDefault();
//     seterror("")

//     if (form.password != form.confirmpass) {
//       seterror("password doesnt match")
//       return;
//     }

//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: form.name,
//           email: form.email,
//           password: form.password,
//         }),
//       });

//       const data = await res.json(); // parse JSON backend response

//       if (!res.ok) {
//         // backend sent an error
//         seterror(data.message || "Registration failed!");
//         return;
//       }

//       alert("Account created successfully!");
//       //navigate("/auth/login");
//     } catch (error) {
//       console.log(error);
//       seterror("Something went wrong!");
//     }
//   }







//   return (
//     <>

//       <div style={{ maxWidth: "400px", margin: "50px auto" }}>
//         <h2>Register</h2>

//         {/* Error message */}
//         {error && (
//           <p style={{ color: "red", marginBottom: "10px" }}>
//             {error}
//           </p>
//         )}

//         <form onSubmit={handlesubmit}>
//           <div style={{ marginBottom: "10px" }}>
//             <label>Name</label><br />
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handlechange}
//               required
//               style={{ width: "100%", padding: "8px" }}
//             />
//           </div>

//           <div style={{ marginBottom: "10px" }}>
//             <label>Email</label><br />
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handlechange}
//               required
//               style={{ width: "100%", padding: "8px" }}
//             />
//           </div>

//           <div style={{ marginBottom: "10px" }}>
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

//           <div style={{ marginBottom: "10px" }}>
//             <label>Confirm Password</label><br />
//             <input
//               type="password"
//               name="confirmpass"
//               value={form.confirmpass}
//               onChange={handlechange}
//               required
//               minLength="6"
//               style={{ width: "100%", padding: "8px" }}
//             />
//           </div>

//           <button
//             type="submit"
//             style={{ width: "100%", padding: "10px", marginTop: "10px" }}
//           >
//             Register
//           </button>
//         </form>

//         <p style={{ marginTop: "10px" }}>
//           Already have an account?{" "}
//           <Link to="/login" style={{ color: "blue" }}>
//             Login
//           </Link>
//         </p>

//       </div>
//     </>
//   )
// }

// export default Register
