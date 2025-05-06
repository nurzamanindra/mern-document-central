import React from 'react'

import logo from '../assets/images/logo-chatgpt-light-mode.png'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Label, TextInput, HelperText, Spinner } from "flowbite-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signin } from '../services/userService';
import {useDispatch, useSelector} from 'react-redux';
import {signStart, signSuccess, signFailure} from '../redux/user/userSlice'
import {selectUser} from '../redux/store'
import OAuth from '../components/OAuth';

const schema = z.object({
  email: z.string().email().min(3),
  password: z.string().min(6)
})




const LeftSignupComponent = ()=> {

  return (
    <div className=''>
      <Link to="/sign-up">
      <div className='flex flex-col justify-center items-center'>
        <img src={logo} className="mb-1 h-16" alt="Central Doc" />
        <span className="text-3xl font-semibold dark:text-white">
          Central Doc
        </span>
      </div>
      </Link>
    </div>
  )
}



const SignIn = () => {
  const {register, handleSubmit, formState: {errors}} = useForm({resolver: zodResolver(schema)});
 
  const {loading: isLoading, error: formError, currentUser: user} = useSelector(selectUser);
  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  const onSubmitForm = async (formData) => {
    try {
      dispatch(start());
      const data = await signStart(formData);

      if(data && data.success === true){

        dispatch(signSuccess(data));

        navigate("/");
      } else {
        dispatch(signFailure(data.message))
      }

    } catch (err) {
      let errMessage;
      console.log(err)
      if(err.response){
        // setFormError(err.response.data.message);
        errMessage = err.response.data.message;
      } else {
        // setFormError(err.message);
        errMessage = err.message;
      }
      dispatch(signFailure(errMessage));

    }
  }
  return (
    <div className='min-h-10/12 mt-7 p-20  md:container md:mx-auto md:max-w-screen-md'>
        {/* signup form container */}
        <div className='border-gray-400 shadow-2xl 
        rounded-xl flex flex-col gap-y-5 
        mx-auto p-0 py-14 md:px-10 justify-center items-center hover:scale-[1.01] duration-200 '>
          {/* left side */}
          <LeftSignupComponent/>


          {/* right side */}
          <form className="flex w-9/12 md:w-full md:px-16 flex-col gap-4" onSubmit={handleSubmit(onSubmitForm)}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email">Email</Label>
              </div>
              <TextInput {...register("email")}  id="email" type="email" placeholder="name@yourmail.com" required shadow />
              {errors.email && <HelperText color='failure'> {errors.email.message}</HelperText>}

            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password">Password</Label>
              </div>
              <TextInput {...register("password")}  id="password" type="password" placeholder="*******" required shadow />
              {errors.password && <HelperText color='failure'> {errors.password.message}</HelperText>}
            </div>
            <Button className='mt-3' type="submit">
            {
             isLoading ? 
             <>
              <Spinner aria-label="Alternate spinner button example" size="sm" />
              <span className="pl-3">Loading...</span>
             </> : 'Sign In'
            }
            </Button>
            <OAuth text="Continue with Google"/>
            
            {formError && <HelperText color='failure'> {formError}</HelperText>}

            <div className="flex items-center gap-2">
              <Label htmlFor="agree" className="flex gap-2">
                Don't have an account?
                <Link to="/sign-up" className="text-cyan-600 hover:underline dark:text-cyan-500">
                  Sign Up
                </Link>
              </Label>
            </div>
          </form>
          </div>

    </div>
  )
}

export default SignIn