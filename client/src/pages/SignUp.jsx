import React, { useState } from 'react'

import logo from '../assets/images/logo-chatgpt-light-mode.png'
import { Link, Navigate } from 'react-router-dom'
import { Button, Label, TextInput, HelperText, Spinner } from "flowbite-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup } from '../services/userService';


const schema = z.object({
  username: z.string().min(6),
  email: z.string().email().min(3),
  password: z.string().min(6),
  repeatPassword: z.string()
})
.refine(data => data.password === data.repeatPassword,
  {
      message: "Confirmed Password does not match with Password",
      path: ["repeatPassword"]
  }
)



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



const SignUp = () => {
  const {register, handleSubmit, formState: {errors}} = useForm({resolver: zodResolver(schema)});
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const onSubmitForm = async (formData) => {
    try {
      setIsLoading(true);
      const data = await signup(formData);
      setIsLoading(false);

      if(data && data.success === true){
        window.location="/";
      }

    } catch (err) {

      if(err.response){
        setFormError(err.response.data.message);

      } else if(err){
        setFormError(err.message);
      }
      setIsLoading(false);

    }
  }
  return (
    <div className='min-h-10/12 mt-7 p-20  md:container md:mx-auto md:max-w-screen-md'>
        {/* signup form container */}
        <div className='border-gray-400 shadow-2xl 
        rounded-xl flex flex-col gap-y-5 
        mx-auto p-0 py-14 md:px-10 justify-center items-center hover:scale-[1.05] duration-500 '>
          {/* left side */}
          <LeftSignupComponent/>


          {/* right side */}
          <form className="flex w-9/12 md:w-full md:px-16 flex-col gap-4" onSubmit={handleSubmit(onSubmitForm)}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username">Username</Label>
              </div>
              <TextInput {...register("username")} id="username" type="text" placeholder="username" required shadow />
              {errors.username && <HelperText color='failure'> {errors.username.message}</HelperText>}
            </div>
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
              <TextInput {...register("password")}  id="password" type="password" required shadow />
              {errors.password && <HelperText color='failure'> {errors.password.message}</HelperText>}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="repeatPassword">Repeat password</Label>
              </div>
              <TextInput {...register("repeatPassword")}  id="repeatPassword" type="password" required shadow />
              {errors.repeatPassword && <HelperText color='failure'> {errors.repeatPassword.message}</HelperText>}

            </div>
            <Button className='mt-3' type="submit">
            {
             isLoading ? 
             <>
              <Spinner aria-label="Alternate spinner button example" size="sm" />
              <span className="pl-3">Loading...</span>
             </> : 'Register new account'
            }
            </Button>
            {formError && <HelperText color='failure'> {formError}</HelperText>}

            <div className="flex items-center gap-2">
              <Label htmlFor="agree" className="flex gap-2">
                Have an account?
                <Link to="/sign-in" className="text-cyan-600 hover:underline dark:text-cyan-500">
                  Sign In
                </Link>
              </Label>
            </div>
          </form>
          </div>

    </div>
  )
}

export default SignUp