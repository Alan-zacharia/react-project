import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({})
  const [error, errorSet] = useState(false)
  const [loading, loadingSet] = useState(false);
  const navigate =  useNavigate()
  const handleChange = (e)=>{
        setFormData({...formData , [e.target.id] : e.target.value})
  }
  const handleSubmit = async (e)=>{
   e.preventDefault();
   errorSet(false)
   try{
     loadingSet(true);
     const res = await  fetch("/api/signup",{
      method:'POST',
      headers:{
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(formData)
     });
     const data = await res.json();
     if(res.success == false){
      setError(true)
      return
    }
     loadingSet(false);
     errorSet(false)
     navigate('/login')
   }catch(error){
   loadingSet(false);
   errorSet(true)
   }
  }
  
  return (
    <div className="p-3 max-w-lg mx-auto mt-16">
      <h1 className="text-3xl text-center font-semibold my-7">Sign up</h1>
      <p className="text-red-500">{error && 'Something went wrong'}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : 'SIGN UP'}
        </button>
      </form>
      <div className="flex gap-2 mt-2">
        <p>Have an account ? </p>
        <Link to="/login">
          <span className="text-blue-500">login</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
