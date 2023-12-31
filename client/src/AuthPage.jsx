import { useState } from "react";
import axios from "axios";

const AuthPage = (props) => {
    const [username, setUsername] = useState("");
    const [secret, setSecret] = useState("");
    const [email, setEmail] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [isSigningUp, setIsSigningUp] = useState(false); // State to manage signup/login view
    const dotenv = import.meta.env;
    const backendUrl = dotenv.VITE_BACKEND_URL;

    // const onLogin = (e) => {
    //     e.preventDefault();
    //     axios
    //         .post("http://localhost:3001/authenticate", { username, secret })
    //         .then((r) => props.onAuth({ ...r.data, secret }))
    //         .catch((e) => console.log(JSON.stringify(e.response.data)));
    // };

    const onLogin = async (e) => {
        e.preventDefault();
        const userData = await saveUser({
            username,
            secret,
        });
        if (!userData) {
            alert("Error fetching user");
            return;
        }
        console.log(userData);
        props.onAuth({ ...userData, secret });
    };
    const onSignup = async (e) => {
        e.preventDefault();
        const userData = await loginUser({
            username,
            secret,
            email,
            first_name,
            last_name
        });
        if (!userData) {
            alert("Error saving user");
            return;
        }
        console.log(userData);
        props.onAuth({ ...userData, secret });
    };

    const saveUser = async (value) => {
        const { username, secret, email, first_name, last_name } = value;
        try {
            const response = await axios.post(
                `${backendUrl}/authenticate`,
                {
                    username,
                    secret,
                    email,
                    first_name,
                    last_name
                },
            );
            console.log(response.data);
            return response.data;
        } catch (e) {
            console.log(e);
            return false;
        }
    };
    const loginUser = async (value) => {
        const { username, secret } = value;
        try {
            const response = await axios.post(
                `${backendUrl}/authenticate`,
                {
                    username,
                    secret,
                },
            );
            console.log(response.data);
            return response.data;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    return (
        <div className="login-page">
            <div className="card">
                {!isSigningUp ? ( // Display login form if not signing up
                    <form onSubmit={onLogin}>
                        <div className="title">Login</div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            name="secret"
                            placeholder="Password"
                            onChange={(e) => setSecret(e.target.value)}
                        />
                        <button type="submit">LOG IN</button>
                        <p>
                            Don't have an account?{" "}
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsSigningUp(true);
                                }}
                                style={{ textDecoration: "underline", color: "#2f80ed", transition: "color 0.3s ease" }}
                                onMouseEnter={(e) => e.target.style.color = "#1e63cc"}
                                onMouseLeave={(e) => e.target.style.color = "#2f80ed"}
                            >
                                Sign Up
                            </a>
                        </p>
                    </form>
                ) : (
                    <form onSubmit={onSignup}>
                        <div className="title">Sign Up</div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            name="secret"
                            placeholder="Password"
                            onChange={(e) => setSecret(e.target.value)}
                        />
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="text"
                            name="first_name"
                            placeholder="First name"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Last name"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <button type="submit">SIGN UP</button>
                        <p>
                            Already have an account?{" "}
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsSigningUp(false);
                                }}
                                style={{ textDecoration: "underline", color: "#2f80ed", transition: "color 0.3s ease" }}
                                onMouseEnter={(e) => e.target.style.color = "#1e63cc"}
                                onMouseLeave={(e) => e.target.style.color = "#2f80ed"}
                            >
                                Login
                            </a>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AuthPage;
