import React from 'react';
import styles from './user-profile.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";


function UserProfile() {
  let [userProfile , setUserProfile]: any = useState({});
  const baseUrl: string = "http://localhost:3007/posts";
  const navigate = useNavigate();

  useEffect(() => {
    const headers = {
      'Content-Type':'application/json',
      'method': 'GET-BY-ID'
    };
    const profileId:any = localStorage.getItem('id');
    axios.get(`${baseUrl}/${profileId}`, headers).then((response: any) => {
      // console.log("response>>", response.data);
      userProfile = response.data;
      setUserProfile(userProfile);
    }).catch((error: any) => {
      console.error("error from API>>", error);
    }).finally(() => {
      // console.info('Get Request by Id');
    })
  })

  const editUserProfile = (e: any) => {
    e.preventDefault();
    console.log('profile>>', userProfile);
    localStorage.setItem('id', userProfile.id);
    localStorage.setItem('fullName', userProfile.fullName);
    localStorage.setItem('phoneNumberValue', userProfile.phoneNumberValue);
    localStorage.setItem('emailValue', userProfile.emailValue);
    localStorage.setItem('passwordValue', userProfile.passwordValue);
    localStorage.setItem('confirmPasswordValue', userProfile.confirmPasswordValue);
    localStorage.setItem('status', userProfile.status);
    localStorage.setItem('createdAt', userProfile.createdAt);
  }

  const routeToProfilePage = () => {
    navigate('/editProfile')
  }

  const routeBack = () => {
    window.history.go(-1);
  }

  return (
    <div>
<body className="bg-gray-300 antialiased">
    <div className="container mx-auto my-60">
        <div>

            <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
                <div className="flex justify-center">
                        <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"/>
                </div>
                
                <div className="mt-16">
                    <h1 className="font-bold text-center text-3xl text-gray-900">User's Profile</h1>
                    <p className="text-center text-sm text-gray-400 font-medium">UI Components Factory</p>
                    <p>
                        <span>
                            
                        </span>
                    </p>
                    <div className="my-5 px-6" onClick={routeToProfilePage}>
                        <a onClick={e => editUserProfile(e)} className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white"><span className="font-bold">Edit Profile</span></a>
                    </div>

                    <div className="w-full">
                        <h3 id={styles.cursor} className="font-medium text-gray-900 text-left px-6" onClick={routeBack}>
                          <b>ROUTE BACK</b>
                        </h3>
                        <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                            <a  className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" className="rounded-full h-6 shadow-md inline-block mr-2" />
                                    <b>FULL NAME:</b> &nbsp;&nbsp;
                                    <span className="text-gray-500 text-xs">{userProfile.fullName}</span>
                            </a>

                            <a className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" className="rounded-full h-6 shadow-md inline-block mr-2" />
                                <b>EMAIL:</b> &nbsp;&nbsp;
                                    <span className="text-gray-500 text-xs">{userProfile.emailValue}</span>
                            </a>

                            <a className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" className="rounded-full h-6 shadow-md inline-block mr-2" />
                                <b>PHONE NUMBER:</b> &nbsp;&nbsp;
                                <span className="text-gray-500 text-xs">{userProfile.phoneNumberValue}</span>
                            </a>

                            <a className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" className="rounded-full h-6 shadow-md inline-block mr-2" />
                                <b>CREATED AT:</b> &nbsp;&nbsp;
                                <span className="text-gray-500 text-xs">{userProfile.createdAt}</span>
                            </a>

                            <a className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150 overflow-hidden">
                                <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" className="rounded-full h-6 shadow-md inline-block mr-2" />
                                <b>STATUS:</b> &nbsp;&nbsp;
                                <span className="text-green-400 text-xs">{userProfile.status}</span>
                            </a>
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</body>
    </div>
  )
}


export default UserProfile;
