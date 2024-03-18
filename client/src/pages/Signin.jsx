import {Link} from 'react-router-dom'

const Signin = () => {
  return (
    <div className='max-w-lg mx-auto text-center mt-16'>
      <h1 className='text-3xl  text-center font-semibold my-7'>Login</h1>
      <form action="" className='flex flex-col gap-4 '>
      <input type="text" className='bg-slate-100 rounded-lg p-3 ' id='email'  placeholder='Email' />
      <input type="password" className='bg-slate-100 rounded-lg p-3 ' id='password'  placeholder='Password' />
      <button className='text-white bg-slate-700 p-3 rounded-lg'>LOGIN</button>
      </form>
      <div className="flex m-2 gap-2">
       <p> Don’t have an account?</p>
      <Link to='/sign-up'><span className='text-red-600'>SIGN UP</span></Link> 
      </div>
    </div>
  )
}

export default Signin
