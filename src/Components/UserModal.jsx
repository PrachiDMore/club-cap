import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../configurations/firebase_config';
import moment from 'moment';

const UserModal = ({ showModal, setShowModal }) => {
const initialdata = {
  description:"",
  image:"",
  months:0,
  discount:"",
  price:""
}
  const [planData, setPlanData] = useState(initialdata)
  useEffect(() => {
    if(showModal?.data?.plan_id){
      const unsub1 = onSnapshot(doc(db, "Package", showModal?.data?.plan_id), (doc) => {
        // console.log("Current data: ", doc.data());
        setPlanData({ ...doc.data(), id:doc.id })
      });
    }
  }, [showModal]);


  return (
    <div className={showModal.show ? 'bg-black/40 duration-300 w-screen h-screen z-40 fixed top-0 left-0 flex justify-center items-center opacity-100' : 'bg-black/40 duration-300 w-screen h-screen z-40 fixed top-0 left-0 flex justify-center items-center opacity-0 pointer-events-none'}>

      <div className="relative w-[50%] bg-white rounded-lg shadow ">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
          <h3 className="text-lg font-semibold text-gray-900 ">
            View User
          </h3>
          <button onClick={() => setShowModal({ show: false, data: undefined })} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form className="p-4 md:p-5">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2 sm:col-span-1">
              <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
              <input value={showModal?.data?.name} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " readOnly placeholder="User name" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label for="price" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
              <input value={showModal?.data?.email} type="email" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " readOnly placeholder="User email" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label for="price" className="block mb-2 text-sm font-medium text-gray-900 ">Plan start date</label>
              <input value={moment(showModal?.data?.plan_start_date).format('Do	MMM, YYYY')} type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Plan start date" readOnly />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label for="price" className="block mb-2 text-sm font-medium text-gray-900 ">Months</label>
              <input value={planData?.months} type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Months" readOnly />
            </div>
            <div className="col-span-2">
              <label for="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
              <textarea value={planData?.description} id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none" placeholder="Description" readOnly ></textarea>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label for="price" className="block mb-2 text-sm font-medium text-gray-900 ">Discount</label>
              <input value={planData?.discount} type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Discount" readOnly />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label for="price" className="block mb-2 text-sm font-medium text-gray-900 ">Price</label>
              <input value={planData?.price} type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Price"  readOnly />
            </div>
          </div>
          {/* <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
            Add new product
          </button> */}
        </form>
      </div>
    </div>

  )
}

export default UserModal
