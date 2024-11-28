import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";


const Login = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try{
        const res = await axios.post(BASE_URL + "/login", {
            emailId,
            password,
        }, {withCredentials: true});

        //console.log(res);
        dispatch(addUser(res.data));
        navigate("/");
        } catch(err){
            setError(err?.response?.data || "Something went wrong");
        }
    }

    const handleSignUp = async () => {
        try{
            const res = axios.post(BASE_URL + "/signup", {firstName, lastName, emailId, password}, {withCredentials: true});
            dispatch(addUser(res.data.data));
            return navigate("/profile");
        } catch(err){
            setError(err?.response?.data || "Something went wrong");
        }
    }

    return (
        <div className="flex justify-center my-4">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Signup"}</h2>
                    <label className="form-control w-full max-w-xs my-1">
                    { !isLoginForm && (<>
                        <div className="label">
                            <span className="label-text">First Name </span>
                        </div>
                        <input type="text" value = {firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        className="input input-bordered w-full max-w-xs my-1" />
                    
                        <div className="label">
                            <span className="label-text">Last Name </span>
                        </div>
                        <input type="text" value = {lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                        className="input input-bordered w-full max-w-xs my-1" />
                        </>
                    )
                    }
                        <div className="label">
                            <span className="label-text">Email ID </span>
                        </div>
                        <input type="text" value = {emailId} 
                        onChange={(e) => setEmailId(e.target.value)} 
                        className="input input-bordered w-full max-w-xs my-1" />

                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input type="password" value = {password}
                        onChange = {(e) => setPassword(e.target.value)} 
                        className="input input-bordered w-full max-w-xs" />
                    </label>
                    <p className="text-red-500">{error}</p>
                    <div className="card-actions flex justify-center">
                        <button className="btn btn-primary " onClick= {isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "Signup"}</button>
                    </div>
                    <p className="m-auto cursor-pointer py-2" onClick={() => setIsLoginForm((value) => !value)}>
                        {isLoginForm ? "New User? Signup Here" : "Existing User? Login Here"}
                    </p>   
                </div>
            </div>
        </div>
    )
}

export default Login