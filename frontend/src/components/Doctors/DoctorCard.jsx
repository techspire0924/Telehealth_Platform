/* eslint-disable react/prop-types */

// import starIcon from '../../assets/images/Star.png'
// import { Link } from 'react-router-dom'
// import { BsArrowRight } from 'react-icons/bs'
// import { useCallback, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// const DoctorCard = ({ doctor, user }) => {
//   const { name, avgRating, totalRating, photo, specialization, experiences, _id } = doctor

//   const navigate = useNavigate()

//   const handleJoin = useCallback(() => {
//     navigate(`/room/${_id}${user?._id}`)
//   }, [navigate, _id + user?._id])

//   return (
//     <div className='p-3 lg:p-5 bg-cyan-400'>
//       <div>
//         <img src={photo} className='w-full ' alt='' />
//       </div>

//       <h2
//         className='text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor
//        font-[700] mt-3 lg:mt-5'
//       >
//         {name}
//       </h2>

//       <div className='mt-2 lg:mt-4 flex items-center justify-between'>
//         <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded '>
//           {specialization}
//         </span>

//         <div className='flex items-center gap-[6px]'>
//           <span className='flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor'>
//             <img src={starIcon} alt='' />
//             {avgRating}
//           </span>
//           <span className='text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor'>
//             ({totalRating})
//           </span>
//         </div>
//       </div>

//       <div className='mt-[18px] lg:mt-5 flex items-center justify-between'>
//         <div>
//           {/* <h3 className="text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-headingColor">
//             +{totalPatients} patients
//           </h3> */}
//           <p className='text-[14px] leading-6 font-[400] text-textColor '>
//             At {experiences && experiences[0]?.hospital}
//           </p>
//         </div>

//         <Link
//           to={`/doctors/${doctor._id}`}
//           className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none'
//         >
//           <BsArrowRight className='group-hover:text-white w-6 h-5' />
//         </Link>
//       </div>
//       <div className='flex justify-center items-center'>
//         <button className='px-4 py-2 rounded-lg bg-blue-400 text-white' onClick={handleJoin}>
//           Consult Doctor
//         </button>
//       </div>
//     </div>
//   )
// }

// export default DoctorCard





import starIcon from '../../assets/images/Star.png';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000'); // Ensure the correct port is used

const DoctorCard = ({ doctor, user, showConsultButton }) => {
  const { name, avgRating, totalRating, photo, specialization, experiences, _id } = doctor;
  const navigate = useNavigate();

  const handleJoin = useCallback(() => {
    socket.emit('callDoctor', { doctorId: doctor._id, patientName: user?.name || 'Guest' });
    navigate(`/room/${_id}${user?._id}`);
  }, [navigate, doctor._id, user?._id]);

  return (
    <div className='p-3 lg:p-5 bg-cyan-400'>
      <div>
        <img src={photo} className='w-full ' alt='' />
      </div>

      <h2 className='text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5'>
        {name}
      </h2>

      <div className='mt-2 lg:mt-4 flex items-center justify-between'>
        <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded '>
          {specialization}
        </span>

        <div className='flex items-center gap-[6px]'>
          <span className='flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor'>
            <img src={starIcon} alt='' />
            {avgRating}
          </span>
          <span className='text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor'>
            ({totalRating})
          </span>
        </div>
      </div>

      <div className='mt-[18px] lg:mt-5 flex items-center justify-between'>
        <div>
          <p className='text-[14px] leading-6 font-[400] text-textColor '>
            At {experiences && experiences[0]?.hospital}
          </p>
        </div>

        <Link
          to={`/doctors/${doctor._id}`}
          className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none'
        >
          <BsArrowRight className='group-hover:text-white w-6 h-5' />
        </Link>
      </div>
      {showConsultButton && (
        <div className='flex justify-center items-center'>
          <button className='px-4 py-2 rounded-lg bg-blue-400 text-white' onClick={handleJoin}>
            Consult Doctor
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;
