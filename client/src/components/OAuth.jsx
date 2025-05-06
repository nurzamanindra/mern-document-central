import { Button } from 'flowbite-react'
import React from 'react'
import { FaGoogle } from "react-icons/fa";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from '../firebase';
import { continueWithGoogle } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {signStart, signSuccess, signFailure} from '../redux/user/userSlice'

const OAuth = ({text}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    
    provider.setCustomParameters({
      prompt: "select_account"
    });

    const auth = getAuth(app);

    const result = await signInWithPopup(auth, provider)
    // .then((result) => {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   // const credential = GoogleAuthProvider.credentialFromResult(result);
    //   // const token = credential.accessToken;
    //   // The signed-in user info.
    const user = result.user;
    // console.log("user.accessToken", user.accessToken);
    //   //consume API Backend Continue with google
    try {
        dispatch(signStart());

        const data = await continueWithGoogle(user.accessToken);

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
    <Button onClick={handleGoogleClick} className='text-white text-sm' color='red'>
      <FaGoogle className='h-4 w-4 mr-2'/>
      {text}
    </Button>
  )
}

export default OAuth