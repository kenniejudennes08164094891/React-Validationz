import React from 'react';
import styles from './Table-page.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";

function TablePage() {
  let [userArray, setUserArray]: any = useState([]);
  let [search, setSearch] = useState('');
  const baseUrl: string = "http://localhost:3007/posts";
  const navigate = useNavigate();
  console.log("searched word>>", search);

  useEffect(() => {
    const headers = {
      'Content-Type':'application/json',
      'method': 'GET'
    };

    axios.get(baseUrl, headers).then((response: any) => {
       userArray = response.data;
      console.log('user Array>>>', userArray);
       setUserArray(userArray)
    }).catch((error: any) => {
      console.error('error from API>>', error);
    }).finally(() => {
      console.info('GET Request Implementation!!')
    })
  }, []);

  const editUserProfile = (e: any, item: any):any => {
    e.preventDefault();
    console.log('item to edit>>', item);
    localStorage.setItem('id', item.id);
    localStorage.setItem('fullName', item.fullName);
    localStorage.setItem('phoneNumberValue', item.phoneNumberValue);
    localStorage.setItem('emailValue', item.emailValue);
    localStorage.setItem('passwordValue', item.passwordValue);
    localStorage.setItem('confirmPasswordValue', item.confirmPasswordValue);
    localStorage.setItem('status', item.status);
    localStorage.setItem('createdAt', item.createdAt);
  }

  const routeToEdit = () => {
    navigate('/editProfile');
  }

  const viewUserProfile = (e: any, item: any) => {
    e.preventDefault();
    console.log('item>>', item.id);
    localStorage.setItem('id', item.id);
  }

  const routeToProfile = () => {
    navigate("/userProfile")
  }

  const deleteUser = (e: any, item: any) => {
    e.preventDefault();
    const headers = {
        'Content-Type':'application/json',
        'method': 'DELETE'
      }; 
      axios.delete(`${baseUrl}/${item.id}`, headers).then((response: any) => {
        console.log("response from API delete>>", response);
        console.log("deleted row>>", item);
        //window.location.reload();
      }).catch((error: any) => {
        console.error("error from API>>", error)
      }).finally(() => {
        console.info('Delete request!')
      })
  }

  const iterateUserArray = userArray.filter((item:any) => {
    return search.toLowerCase() === '' ? item : item.fullName.toLowerCase().includes(search) || 
    item.phoneNumberValue.toLowerCase().includes(search) || 
    item.emailValue.toLowerCase().includes(search) ||
    item.createdAt.toLowerCase().includes(search)
  }).map((item: any, index: number) => {
    return(
      <tbody className="bg-white">
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                        <div className="flex items-center">
                                            <div>
                                                <div className="text-sm leading-5 text-gray-800">{item.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                        <div className="text-sm leading-5 text-blue-900">{item.fullName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{item.emailValue}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{item.phoneNumberValue}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                        <span className="relative text-xs">{item.status}</span>
                                    </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">{item.createdAt}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5" onClick={routeToProfile}>
                                        <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none" onClick={e => viewUserProfile(e, item)}>View</button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5" onClick={routeToEdit}>
                                    <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none" onClick={e => editUserProfile(e, item)}>Edit</button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                                    <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none" onClick={e => deleteUser(e, item)}>Delete</button>
                                    </td>
                          </tr>
                              
                        </tbody>
    )
  })

  return (
    <div> 
<div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
                <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
                    <div className="flex justify-between">
                        <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
                            <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative">
                                <div className="flex">
                                    <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                                        <svg width="18" height="18" className="w-4 lg:w-auto" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M16.9993 16.9993L13.1328 13.1328" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </span>
                                </div>
                                <input type="text" onChange={e => setSearch(e.target.value)} className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin" placeholder="Search"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">ID</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Fullname</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Email</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Phone</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Status</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Created At</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300"></th>
                                <th className="px-6 py-3 border-b-2 border-gray-300"></th>
                                <th className="px-6 py-3 border-b-2 border-gray-300"></th>
                            </tr>
                        </thead>
                        {iterateUserArray}
                    </table>
                  <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
        <div>
            <p className="text-sm leading-5 text-blue-700">
                Showing
                <span className="font-medium">1</span>
                to
                <span className="font-medium">200</span>
                of
                <span className="font-medium">2000</span>
                results
            </p>
        </div>
        <div>
            <div className="relative z-0 inline-flex shadow-sm">
                <div	>
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Previous">
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                    </a>
                </div>
                <div>
                    <a href="#" className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-700 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
                        1
                    </a>
                  <a href="#" className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-600 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
                        2
                    </a>
                   <a href="#" className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-600 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
                        3
                    </a>
                </div>
               
            </div>
        </div>
    </div>
                </div>
            </div>
    </div>
  )
}


export default TablePage;
