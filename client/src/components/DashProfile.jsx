import React, { use, useEffect, useRef, useState } from 'react'
import { Button, Avatar , Label, TextInput, Alert } from "flowbite-react";
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/store';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {app} from '../firebase';


import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashProfile = () => {
  const {currentUser} = useSelector(selectUser);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);

  const filePickerRef = useRef(null);

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
          console.log('File available at', downloadURL);
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

  const handleSubmitForm = (e) => {
    e.preventDefault();
  }



  return (
    <div className='max-w-full mx-auto p-3 w-full'>
      <h1 className='my-7 text-3xl font-semibold text-center'>Profile</h1>
      <form className='flex flex-col justify-center items-center gap-8' onSubmit={handleSubmitForm}>
        
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
          img={imageFileUrl || currentUser.user.profilePicture}
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
          <TextInput id="username" type="text" placeholder="username" defaultValue={currentUser.user.username}/>
        </div>

        {/* email */}
        <div className=' w-full md:w-4/12'>
          <div className="mb-2 block ">
            <Label htmlFor="email">Email</Label>
          </div>
          <TextInput id="email" type="text" placeholder="sample@gmail.com" defaultValue={currentUser.user.email}/>
        </div>

        {/* password */}
        <div className=' w-full md:w-4/12'>
          <div className="mb-2 block ">
            <Label htmlFor="password">password</Label>
          </div>
          <TextInput id="password" type="text" placeholder="**********" />
        </div>

        {/* Button Submit*/}
        <Button className='w-full md:w-4/12' type='submit'>Update</Button>
        <Button className='w-full md:w-4/12' color="red" type='button'>Delete Account</Button>

      </form>
    </div>
  )
}

export default DashProfile