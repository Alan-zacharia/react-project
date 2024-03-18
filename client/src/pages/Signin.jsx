import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [input, setInput] = useState({});
  const [error , setError] = useState(false);
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate()
  
  const handleForm = (e)=>{
    setInput({...input, [e.target.id] : e.target.value})
  }
  const handleFormLogin = async(e)=>{
    e.preventDefault();
    setError(false)
    setLoading(true);
    try{
    const data = await fetch('/api/login',{
      method:'POST',
      headers:{
        'Content-Type' : 'application/json',
      },
      body:JSON.stringify(input)
    })
    const res = await data.json();
    if(res.success == false){
      setError(true)
      return
    }
    setLoading(false);
    setError(false)
    navigate('/')
    }catch(err){
    setLoading(false);  
    setError(true)
    }
  }
  return (
    <div className="max-w-lg mx-auto text-center mt-16 ">
      <h1 className="text-3xl  text-center font-semibold my-7">Login</h1>
      <p className="text-red-500">{error && 'Invalid email or password'}</p>
      <form onSubmit={handleFormLogin} className="flex flex-col gap-4 ">
        <input
          type="text"
          className="bg-slate-100 rounded-lg p-3 "
          id="email"
          placeholder="Email"
          onChange={handleForm}
        />
        <input
          type="password"
          className="bg-slate-100 rounded-lg p-3 "
          id="password"
          placeholder="Password"
          onChange={handleForm}
        />
        <button disabled={loading} className="text-white bg-slate-700 p-3 rounded-lg">
          {loading ? 'Loading...' : 'LOGIN'}
        </button>
      </form>
      <div className="flex m-2 gap-2">
        <p> Don’t have an account?</p>
        <Link to="/sign-up">
          <span className="text-red-600">SIGN UP</span>
        </Link>
      </div>
    </div>
  );
};

export default Signin;
