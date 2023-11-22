import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../configurations/firebase_config';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';

const Home = () => {
	const initialFormState = {
		mobileNumber: "",
		email: "",
		slider1Title: "",
		slider2Title: "",
		slider3Title: "",
		slider1Desc: "",
		slider2Desc: "",
		slider3Desc: "",
		aboutus: "",
		instagram: "",
		facebook: "",
		twitter: "",
		youtube: "",
	}
	const [formState, setFormState] = useState(initialFormState)

	const handleChange = (e) => {
		setFormState({
			...formState,
			[e.target.id]: e.target.value
		})
	}
	const uploadFiles = (file, stateSetter, path) => {
		const storageRef = ref(storage, path);
		const uploadTask = uploadBytesResumable(storageRef, file);
		uploadTask.on('state_changed',
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				switch (snapshot.state) {
					case 'paused':
						break;
					case 'running':
						break;
				}
			},
			(error) => {
				alert(error.message)
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					stateSetter(downloadURL)
				});
			}
		);
	}

	useEffect(() => {
		const unsub = onSnapshot(doc(db, "home", "data"), (doc) => {
			setFormState(doc.data());
		});
	}, []);

	const handleHome = async () => {
		await setDoc(doc(db, "home", "data"), formState)
		.then(() => {
			alert("Submitted")
		})
		.catch((err) => {
			alert(err.message)
		})
	}

	return (
		<>
			<Navbar />
			<section className='p-10 custom-width min-h-screen dark:bg-gray-800 dark:border-gray-700'>
				<h1 className='font-bold text-3xl'>Home</h1>
				<div className='py-8'>
					<section className="dark:bg-gray-900">
						<h1 className='text-xl font-semibold'>Contact</h1>
						<div className="grid grid-cols-2 p-4 gap-4">
							<div>
								<label htmlFor="mobileNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile Number</label>
								<input onChange={handleChange} value={formState?.mobileNumber} type="text" name="mobileNumber" id="mobileNumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Mobile Number" required="" />
							</div>
							<div>
								<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
								<input onChange={handleChange} value={formState?.email} type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Email Address" required="" />
							</div>
						</div>
					</section>
					<section className="mt-3 dark:bg-gray-900">
						<h1 className='text-xl font-semibold'>About Us</h1>
						<div className="grid grid-cols-1 p-4 gap-4">
							<div>
								<label htmlFor="slider1Title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">1st Slider Title </label>
								<input onChange={handleChange} value={formState?.slider1Title} type="text" name="slider1Title" id="slider1Title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1st Slider Title" required="" />
							</div>
							<div>
								<label htmlFor="slider1Desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">1st Slider Description</label>
								<textarea onChange={handleChange} value={formState?.slider1Desc} type="text" name="slider1Desc" id="slider1Desc" className="h-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1st Slider Description" required=""></textarea>
							</div>
						</div>
						<div className="mt-2 grid grid-cols-1 p-4 gap-4">
							<div>
								<label htmlFor="slider2Title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">2nd Slider Title </label>
								<input onChange={handleChange} value={formState?.slider2Title} type="text" name="slider2Title" id="slider2Title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="2nd Slider Title" required="" />
							</div>
							<div>
								<label htmlFor="slider2Desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">2nd Slider Description</label>
								<textarea onChange={handleChange} value={formState?.slider2Desc} type="text" name="slider2Desc" id="slider2Desc" className="h-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="2nd Slider Description" required=""></textarea>
							</div>
						</div>
						<div className="mt-2 grid grid-cols-1 p-4 gap-4">
							<div>
								<label htmlFor="slider3Title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">3rd Slider Title </label>
								<input onChange={handleChange} value={formState?.slider3Title} type="text" name="slider3Title" id="slider3Title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="3rd Slider Title" required="" />
							</div>
							<div>
								<label htmlFor="slider3Desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">3rd Slider Description</label>
								<textarea onChange={handleChange} value={formState?.slider3Desc} type="text" name="slider3Desc" id="slider3Desc" className="h-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="3rd Slider Description" required=""></textarea>
							</div>
						</div>
					</section>
					<section className="mt-3 dark:bg-gray-900">
						<h1 className='text-xl font-semibold'>About Us</h1>
						<div className="grid grid-cols-1 p-4 gap-4">
							<div>
								<label htmlFor="aboutus" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About Us</label>
								<textarea onChange={handleChange} value={formState?.aboutus} type="text" name="aboutus" id="aboutus" className="h-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="About Us" required=""></textarea>
							</div>
						</div>
					</section>
					<section className="mt-3 dark:bg-gray-900">
						<h1 className='text-xl font-semibold'>Social Handles</h1>
						<div className="grid grid-cols-2 p-4 gap-4">
							<div>
								<label htmlFor="facebook" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Facebook</label>
								<input onChange={handleChange} value={formState?.facebook} type="text" name="facebook" id="facebook" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Facebook" required="" />
							</div>
							<div>
								<label htmlFor="instagram" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instagram</label>
								<input onChange={handleChange} value={formState?.instagram} type="text" name="instagram" id="instagram" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Instagram" required="" />
							</div>
							<div>
								<label htmlFor="twitter" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Twitter</label>
								<input onChange={handleChange} value={formState?.twitter} type="text" name="twitter" id="twitter" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Twitter" required="" />
							</div>
							<div>
								<label htmlFor="youtube" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Youtube</label>
								<input onChange={handleChange} value={formState?.youtube} type="text" name="youtube" id="youtube" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Youtube" required="" />
							</div>
						</div>
					</section>
					<button onClick={handleHome} type="button" className=" inline-flex items-center px-5 py-2.5 mt-[3.5rem] text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
						Submit
					</button>
				</div>
			</section>
		</>
	)
}

export default Home
