import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { db } from '../configurations/firebase_config'
import { collection, doc, onSnapshot, query, updateDoc } from 'firebase/firestore'
import { BsEye } from 'react-icons/bs'
import moment from 'moment/moment'
import UserModal from '../Components/UserModal'

const Users = () => {
	const [searchUser, setSearchUser] = useState([])
	const [users, setUsers] = useState([])
	const [showModal, setShowModal] = useState({show:false, data:undefined})

	useEffect(() => {
		const q = query(collection(db, "Users"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const users = [];
			querySnapshot.forEach((doc) => {
				users.push({ ...doc.data(), id: doc.id });
			});
			setUsers(users);
		});
	}, []);

	const handleSearch = (e) => {
		if (e.target.value.length === 0) {
			setSearchUser(users);
		} else {
			setSearchUser(users?.filter((data) => {
				return data?.name.toLowerCase().includes(e.target.value.toLowerCase()) || data?.email.toLowerCase().includes(e.target.value.toLowerCase())
			}))
		}
	}

	useEffect(() => {
		setSearchUser(users);
	}, [users]);

	const handleActive = (id, status) => {
		const docRef = doc(db, "Users", id);
		updateDoc(docRef, {
			active: !status
		})
			.then((data) => {
				alert("User Updated");
			})
	}


	return (
		<>
			<Navbar />
			<section className='p-10 custom-width min-h-screen dark:bg-gray-800 dark:border-gray-700'>
				<h1 className='font-bold text-3xl'>Users</h1>
				<div className="mx-auto max-w-screen-xl px-4 lg:px-12">
					<div className=" dark:bg-gray-800 relative sm:rounded-lg overflow-hidden">
						<div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 py-4">
							<div className="w-full md:w-1/2">
								<form className="flex items-center">
									<label htmlFor="simple-search" className="sr-only">Search</label>
									<div className="relative w-full">
										<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
											<svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
												<path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
											</svg>
										</div>
										<input onChange={handleSearch} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required="" />
									</div>
								</form>
							</div>
						</div>
						<div className="shadow-xl">
							<table className="border-gray-400 rounded-lg overflow-hidden w-full text-sm text-left text-gray-500 dark:text-gray-400">
								<thead className="rounded -t-lg text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<tr>
										<th scope="col" colSpan={1} className="px-4 py-3">Name</th>
										<th scope="col" colSpan={1} className="px-4 py-3">Email</th>
										<th scope="col" colSpan={5} className="px-4 py-3">Plan Start Date</th>
										<th scope="col" colSpan={1} className="px-4 py-3">Action</th>
										<th scope="col" colSpan={1} className="px-4 py-3">View</th>
									</tr>
								</thead>
								<tbody>
									{
										searchUser && searchUser.map((data) => {
											return <tr key={data?.id} className="bg-gray-200 border-b dark:border-gray-700">
												<th colSpan={1} scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data?.name}</th>
												<td colSpan={1} className="px-4 py-3">{data?.email}</td>
												<td colSpan={5} className="px-4 py-3" >{moment(data?.plan_start_date).format('Do 	MMM, YYYY')}</td>
												<td colSpan={1} className="px-4 py-3"><button className='text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={() => handleActive(data?.id, data?.active)}>{data.active ? "Disable" : "Enable"}</button></td>
												<td colSpan={1} onClick={() => setShowModal({show:true, data:data})} className="px-4 py-3 text-blue-500  cursor-pointer"><BsEye /></td>
											</tr>
										})

									}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>
			<UserModal showModal={showModal} setShowModal={setShowModal} />
		</>
	)
}

export default Users
