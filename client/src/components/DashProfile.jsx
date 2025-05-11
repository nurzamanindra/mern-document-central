import React, {  useEffect, useRef, useState } from 'react'
import { Button, Avatar , Label, TextInput, Alert, HelperText } from "flowbite-react";
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../redux/store';
import { z } from "zod";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {app} from '../firebase';

import { updateUserSuccess, updateUserFailure, updateUserStart, deleteUserStart, deleteUserSuccess, deleteUserFailure } from '../redux/user/userSlice';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Modal, ModalBody, ModalHeader } from "flowbite-react";

import { updateUserProfile, deleteUserProfile } from '../services/userService';
import { toast } from 'react-toastify';


const schema = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  profilePicture: z.string().optional()
})

const DashProfile = () => {

  const {register, handleSubmit, formState: {errors}} = useForm({resolver: zodResolver(schema)});

  const {currentUser} = useSelector(selectUser);
  const [imageFile, setImageFile] = useState(null);
  const [formError, setFormError] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [openModalConfirmationDelete, setOpenModalConfirmationDelete] = useState(false);



  const filePickerRef = useRef(null);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  }

  const uploadImage = async () => {
    //upload image to firebase storage
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name ;
    const storageRef = ref(storage, `images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    setImageFileUploading(true);
    setImageFileUploadError(null);


    uploadTask.on('state_changed', 
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the number of bytes total
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setImageFileUploadProgress(progress.toFixed(0));
      }, 
      (error) => {
        // Handle unsuccessful uploads
        setImageFileUploadError(
          'Failed to upload image, please try again'
        );
        console.error(error);
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      }, 
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log('File available at', downloadURL);
          //save downloadURL to database
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  }

  useEffect(() => {
    if(imageFile){
      uploadImage();
    }
  }, 
  [imageFile]);

  const handleSubmitForm = async (formData) => {
    //check if imageFileUrl is not null
    setFormError(null);
    dispatch(updateUserStart());
    try {
      if(imageFileUrl){
        formData.profilePicture = imageFileUrl;
      }
      //update user profile
      const data = await updateUserProfile(currentUser.user._id, formData);
      console.log(data);
      toast.success("Profile updated successfully");

      //update user in redux store
      dispatch(updateUserSuccess(data));
      
    } catch (error) {
      console.error(error);
      setFormError(error.message);
      toast.error(error.message);
      dispatch(updateUserFailure(error.message));

    }
  }

  const handleDeleteUser = async () => {
    setOpenModalConfirmationDelete(false);
    console.log('delete user');

    try {
      dispatch(deleteUserStart());
      const data = await deleteUserProfile(currentUser.user._id);
      dispatch(deleteUserSuccess(data));
      
      window.location = '/';
      
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      dispatch(deleteUserFailure(error.message));
      
    }

  }



  return (
    <div className='max-w-full mx-auto p-3 w-full'>
      <h1 className='my-7 text-3xl font-semibold text-center'>Profile</h1>
      <form className='flex flex-col justify-center items-center gap-8' onSubmit={handleSubmit(handleSubmitForm)}>
        
        {/* Image Upload */}
        <input type="file" accept="image/*" ref={filePickerRef} hidden onChange={handleImageChange}/>
        <div className='rounded-full cursor-pointer overflow-hidden self-center relative'>
        {imageFileUploading && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <Avatar 
          className={`${
            imageFileUploading &&
              'opacity-60'
            }`}
          img={imageFileUrl || currentUser.user?.profilePicture}
          alt="User profile"
          bordered color="gray"
          size="xl" 
          rounded
          onClick={() => filePickerRef.current.click()}/>


          {imageFileUploadError && (
            <Alert color='failure'>{imageFileUploadError}</Alert>
          )}
        </div>
        {/* text input */}
        {/* username */}
        <div className=' w-full md:w-4/12'>
          <div className="mb-2 block ">
            <Label htmlFor="username">Username</Label>
          </div>
          <TextInput required={false}  {...register("username")} id="username" type="text" placeholder="username" defaultValue={currentUser.user?.username}/>        
        </div>

        {/* email */}
        <div className=' w-full md:w-4/12'>
          <div className="mb-2 block ">
            <Label htmlFor="email">Email</Label>
          </div>
          <TextInput required={false} {...register("email")} id="email" type="text" placeholder="sample@gmail.com" defaultValue={currentUser.user?.email}/>
        </div>

        {/* password */}
        <div className=' w-full md:w-4/12'>
          <div className="mb-2 block ">
            <Label htmlFor="password">password</Label>
          </div>
          <TextInput required={false}  {...register("password")} id="password" type="text" placeholder="**********" />
        </div>
        {formError && <HelperText color='failure'> {formError}</HelperText>}

        {/* Button Submit*/}
        <Button className='w-full md:w-4/12' type='submit'>Update</Button>
        <Button onClick={() => setOpenModalConfirmationDelete(true)} className='w-full md:w-4/12' color="red" type='button'>Delete Account</Button>
        <ModalConfirmationDelete 
        openModalConfirmationDelete={openModalConfirmationDelete} 
        setOpenModalConfirmationDelete={setOpenModalConfirmationDelete}
        email={currentUser.user?.email}
        handleDeleteUser={handleDeleteUser}/>
      </form>
    </div>
  )
}

export default DashProfile


const ModalConfirmationDelete = ({openModalConfirmationDelete, setOpenModalConfirmationDelete, email, handleDeleteUser}) => {
  const [emailError, setEmailError] = useState(false);
  const [emailInput, setEmailInput] = useState('');


  const handleEmailInput = (e) => {
    setEmailInput(e.target.value);
  }

  const emailConfirmationHandler = () => {

    if(emailInput !== email){
      //set error
      setEmailError(true);
      
    }else{
      //delete account
      setEmailError(false);
      handleDeleteUser()
    }
  }
  return(
    <Modal show={openModalConfirmationDelete} size="md" popup onClose={() => setOpenModalConfirmationDelete(false)}>
        <ModalHeader />
        <ModalBody>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Delete Confirmation</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="emailDelete">{`Please type ${email}`}</Label>
              </div>
              <TextInput id="emailDelete" placeholder="name@company.com" required onChange={handleEmailInput}/>
            </div>
            {emailError && <HelperText color='failure'>Email is not correct</HelperText>}

            <div className="w-full mx-auto flex justify-center">
              <Button color="red" className='w-full' onClick={emailConfirmationHandler}>Confirm Delete</Button>
            </div>    
          </div>
        </ModalBody>
      </Modal>
  )
} 