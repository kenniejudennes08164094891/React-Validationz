import React from 'react';
import styles from './Edit-profile.module.scss';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";  // npm i react-router-dom @types/react-router-dom
import axios from 'axios';    //npm i axios

function EditProfile() {
	const navigate = useNavigate();
	const baseUrl: string = "http://localhost:3007/posts";

  let [fullName, setFullName]: any | string = useState(localStorage.getItem('fullName'));
  let [phoneNumber, setPhoneNumber]: any | string = useState(localStorage.getItem('phoneNumberValue'));
  let [email, setEmail]: any | string = useState(localStorage.getItem('emailValue'));
  let [password, setPassord]: any | string = useState(localStorage.getItem('passwordValue'));
  let [confirmPassword, setConfirmPassord]: any | string = useState(localStorage.getItem('confirmPasswordValue'));

  let [validationMessageForFullName, setValidationMessageForFullName]: any | string = useState('');
  let [validationMessageForPhoneNumber, setValidationMessageForPhoneNumber]: any | string = useState('');
  let [validationMessageForEmail, setValidationMessageForEmail]: any | string = useState('');
  let [validationMessageForPassword, setValidationMessageForPassword]: any | string = useState('');
  let [validationMessageForConfirmPassword, setValidationMessageForConfirmPassword]: any | string = useState('');


  function SubmitButton(){
	if(fullName && phoneNumber && email && password && confirmPassword){
		return 	<button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
	}else{
		return 	<button disabled type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2" id={styles.disabled}>Login</button>
	}
  }

  const submitForm = (event: any) => {
    event.preventDefault();
    const profileId: any | string =  localStorage.getItem('id');
    const formPayload = {
      fullName: fullName,
      phoneNumberValue: phoneNumber,
      emailValue: email,
      passwordValue: password,
	  confirmPasswordValue: confirmPassword,
	  status: 'Active',
	  createdAt: new Date().toLocaleDateString('es-pa')
    }
	console.log('API payload>>', formPayload);
	const headers = {
		'Content-Type':'application/json',
		'method': 'PUT'
	};

	axios.put(`${baseUrl}/${profileId}`, formPayload, headers).then((response: any) => {
		console.log('response from PUT API>>', response.data);
		navigate('/table');
	}).catch((error: any) => {
		console.error('error from API>>>',  error);
	}).finally(() => {
		console.info('POST Request implementation!!')
	  })

    localStorage.clear();
  }

  const routeBack = () => {
    localStorage.clear();
    window.history.go(-1);
  }

//   const routeToTable = () => {
// 	navigate('/form');
//   }

  //validation listener on input change
  function handleChange(event:any){
	const {name, value} = event.target;
	switch(name){

		case 'fullName':

			//FullName Form validation
			const inputFullName = (document.getElementById('fullName') as HTMLInputElement).value;
			const fullNameArr = inputFullName.split("");
			if(fullNameArr.length < 5 && inputFullName !== ''){
				validationMessageForFullName = "minimum of five characters only";  //minLength
				setValidationMessageForFullName(validationMessageForFullName);
			}else if(fullNameArr.length > 9){
				validationMessageForFullName = "maximum of nine digits only";    //maxLength
				setValidationMessageForFullName(validationMessageForFullName);
			}else if(inputFullName === ''){
				validationMessageForFullName = "This is a required field";
				setValidationMessageForFullName(validationMessageForFullName);
			}else{
				validationMessageForFullName = " ";
				setValidationMessageForFullName(validationMessageForFullName);
			}
			break;

			
		case 'phoneNumber':

		//Phone number Form Validation
			const inputPhoneNumber = (document.getElementById('phoneNumber') as HTMLInputElement).value;
			let phoneNumArr = inputPhoneNumber.split("");
		     
			if(inputPhoneNumber === ''){
				validationMessageForPhoneNumber =  "This is a required field";
				setValidationMessageForPhoneNumber(validationMessageForPhoneNumber);
			}else{
				validationMessageForPhoneNumber = " ";
				setValidationMessageForPhoneNumber(validationMessageForPhoneNumber);
			}

			phoneNumArr.forEach((elem:any) => {
			if(
				elem === '+' || elem === '-' || elem === '0' || elem === '1' || elem === '2' ||
				elem === '3' || elem === '4' || elem === '5' || elem === '6' || elem === '7' ||
				elem === '8' || elem === '9'
				){
				validationMessageForPhoneNumber =  " ";
				setValidationMessageForPhoneNumber(validationMessageForPhoneNumber);	
			}else{
				validationMessageForPhoneNumber =  "invalid phone number";
				setValidationMessageForPhoneNumber(validationMessageForPhoneNumber);
			}
			})
			break;

		case 'email':

			//Email Form validation
			const inputEmail = (document.getElementById('emailAddress') as HTMLInputElement).value;
			let emailArr = inputEmail.split("");
			if(inputEmail === ''){
				validationMessageForEmail =  "This is a required field";
				setValidationMessageForEmail(validationMessageForEmail);
			}else{
				validationMessageForEmail = " ";
				setValidationMessageForEmail(validationMessageForEmail);
			}
			
			emailArr.forEach((elem: any) => {
				var theIndexOf = emailArr.indexOf("@");
				if(emailArr.length > theIndexOf && theIndexOf !== -1){
					validationMessageForEmail =  " ";
					setValidationMessageForEmail(validationMessageForEmail);
				}else{
					validationMessageForEmail =  "PLease Input a valid email address";
					setValidationMessageForEmail(validationMessageForEmail);
				}
			})
			break;

		case 'password':
			
		//Password Form validation
			const inputPassword = (document.getElementById('password') as HTMLInputElement).value;
			if(inputPassword === ''){
				validationMessageForPassword =  "This is a required field";
				setValidationMessageForPassword(validationMessageForPassword);
			}else{
				validationMessageForPassword = " ";
				setValidationMessageForPassword(validationMessageForPassword);
			}
			break;

		case 'confirmPassword':

		//confirmPassword Form Validation
		const inputSamePassword = (document.getElementById('confirmPassword') as HTMLInputElement).value;
		if(inputSamePassword === ''){
			validationMessageForConfirmPassword =  "This is a required field";
			setValidationMessageForConfirmPassword(validationMessageForConfirmPassword);
		}else if(inputSamePassword !== ''){
			validationMessageForConfirmPassword = " ";
			setValidationMessageForConfirmPassword(validationMessageForConfirmPassword);
		}
		
		if(inputSamePassword ===  (document.getElementById('password') as HTMLInputElement).value){
			validationMessageForConfirmPassword = "passwords match";
			setValidationMessageForConfirmPassword(validationMessageForConfirmPassword);
		}else{
			validationMessageForConfirmPassword = "passwords are not the same";
			setValidationMessageForConfirmPassword(validationMessageForConfirmPassword);
		}
		break;

		default:
			break;
	}
  }

  return (
    <div>
<div className="h-screen md:flex">
	<div
		className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
		<div>
			<h1 className="text-white font-bold text-4xl font-sans">GoFinance</h1>
			<p className="text-white mt-1">The most popular peer to peer lending at SEA</p>
			<button onClick={routeBack} type="submit" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Route Back</button>
		</div>
		<div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
	</div>
	<div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
		<form className="bg-white" onSubmit={submitForm}>
			<h1 className="text-gray-800 font-bold text-2xl mb-1">Edit Profile</h1>
			<p className="text-sm font-normal text-gray-600 mb-7"></p>
			<div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
					fill="currentColor">
					<path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
						clipRule="evenodd" />
				</svg>
				<input className="pl-2 outline-none border-none" type="text" onChangeCapture={handleChange} value={fullName} onChange={(elem:any) => setFullName(elem.target.value)} name="fullName" id="fullName" placeholder="Full name" />
      </div>
      <small className='text-red-500'>{validationMessageForFullName}</small>
				<div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
						viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
							d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
					</svg>
					<input className="pl-2 outline-none border-none" type="text" onChangeCapture={handleChange} value={phoneNumber} onChange={(elem:any) => setPhoneNumber(elem.target.value)} name="phoneNumber" id="phoneNumber" placeholder="Phone number" />
      </div>
	  <small className='text-red-500'>{validationMessageForPhoneNumber}</small>
					<div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
							viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
								d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
						</svg>
						<input className="pl-2 outline-none border-none" type="text" onChangeCapture={handleChange} value={email} onChange={(elem:any) => setEmail(elem.target.value)} name="email" id="emailAddress" placeholder="Email Address" />
      </div>
	  <small className='text-red-500'>{validationMessageForEmail}</small>
						<div className="flex items-center border-2 py-2 px-3 rounded-2xl">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
								fill="currentColor">
								<path fill-rule="evenodd"
									d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
									clipRule="evenodd" />
							</svg>
							<input className="pl-2 outline-none border-none" type="password" onChangeCapture={handleChange} value={password} onChange={(elem:any) => setPassord(elem.target.value)} name="password" id="password" placeholder="Password" />
      </div>
	  <small className='text-red-500'>{validationMessageForPassword}</small> <br/>
	  <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
								fill="currentColor">
								<path fill-rule="evenodd"
									d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
									clipRule="evenodd" />
							</svg>
							<input className="pl-2 outline-none border-none" type="password" onChangeCapture={handleChange} value={confirmPassword} onChange={(elem:any) => setConfirmPassord(elem.target.value)} name="confirmPassword" id="confirmPassword" placeholder="Confirm password" />
      </div>
	  <small className='text-red-500'>{validationMessageForConfirmPassword}</small>
							<SubmitButton/>
							<span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span>
		</form>
	</div>
</div>
    </div>
  )
}

export default EditProfile;
