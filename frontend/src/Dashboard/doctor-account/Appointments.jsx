/* eslint-disable react/prop-types */
// import { formateDate } from "../../utils/formateDate";
// import { useEffect, useCallback } from 'react'
// import { useNavigate } from 'react-router-dom'

// const Appointments = ({ appointments }) => {

//   useEffect(() => {
//     console.log(appointments);
//   }, ["Raju"]);

//   const navigate = useNavigate()

//   const handleJoin = useCallback(({ doctorId, userId }) => {
//     navigate(`/room/${doctorId}${userId}`);
//   }, [navigate]);

//   return (
//     <table className="w-full text-left text-sm text-gray-500">
//       <thead className="text-xs text-gary-700 uppercase bg-gray-50">
//         <tr>
//           <th scope="col" className="px-6 py-3">
//             Name
//           </th>
//           <th scope="col" className="px-6 py-3">
//             Gender
//           </th>
//           <th scope="col" className="px-6 py-3">
//             Payment
//           </th>
//           <th scope="col" className="px-6 py-3">
//             Price
//           </th>
//           <th scope="col" className="px-6 py-3">
//             Booked On
//           </th>
//           <th scope="col" className="px-6 py-3">
//             Call
//           </th>
//           <th scope="col" className="px-6 py-3">
//             Consulted
//           </th>
//         </tr>
//       </thead>

//       <tbody>
//         {appointments?.map((item) => (
//           <tr key={item._id}>
//             <th
//               scope="row"
//               className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
//             >
//               <img
//                 src={item.user.photo}
//                 className="w-10 h-10 rounded-full"
//                 alt=""
//               />
//               <div className="pl-3">
//                 <div className="text-base font-semibold">{item.user.name}</div>
//                 <div className="text-normal text-gray-500">
//                   {item.user.email}
//                 </div>
//               </div>
//             </th>
//             <td className="px-6 py-4">{item.user.gender}</td>
//             <td className="px-6 py-4">
//               {item.isPaid && (
//                 <div className="flex items-center">
//                   <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
//                   Paid
//                 </div>
//               )}
//               {!item.isPaid && (
//                 <div className="flex items-center">
//                   <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
//                   Unpaid
//                 </div>
//               )}
//             </td>
//             <td className="px-6 py-4">{item.ticketPrice}</td>
//             <td className="px-6 py-4">{formateDate(item.createdAt)}</td>
//             <td className="px-6 py-4">
//               <button className="px-2 py-2 rounded-md bg-green-500 text-white" onClick={() => handleJoin({ doctorId: item.doctor._id, userId: item.user._id })}>
//                 Call
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default Appointments;







// import { useState, useEffect, useCallback } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { formateDate } from "../../utils/formateDate";
// import { BASE_URL } from '../../../config';


// const Appointments = ({ appointments }) => {
//   const [consulted, setConsulted] = useState(() => {
//     const savedConsulted = localStorage.getItem('consulted');
//     return savedConsulted ? JSON.parse(savedConsulted) : {};
//   });

//   useEffect(() => {
//     console.log(appointments);
//   }, [appointments]);

//   const navigate = useNavigate();

//   const handleJoin = useCallback(({ doctorId, userId }) => {
//     navigate(`/room/${doctorId}${userId}`);
//   }, [navigate]);

//   const markConsulted = (id) => {
//     const updatedConsulted = {
//       ...consulted,
//       [id]: true,
//     };
//     setConsulted(updatedConsulted);
//     localStorage.setItem('consulted', JSON.stringify(updatedConsulted));
//   };

//   // const viewProfile = (userId) => {
//   //   navigate(`/profile/${userId}`);
//   // };

//   return (
//     <table className="w-full text-left text-sm text-gray-500">
//       <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//         <tr>
//           <th scope="col" className="px-6 py-3">Name</th>
//           <th scope="col" className="px-6 py-3">Gender</th>
//           <th scope="col" className="px-6 py-3">Payment</th>
//           <th scope="col" className="px-6 py-3">Price</th>
//           <th scope="col" className="px-6 py-3">Booked On</th>
//           <th scope="col" className="px-6 py-3">Call</th>
//           <th scope="col" className="px-6 py-3">Consulted</th>
//           {/* <th scope="col" className="px-6 py-3">Profile</th> */}
//         </tr>
//       </thead>
//       <tbody>
//         {appointments?.map((item) => (
//           <tr key={item._id}>
//            <Link to={`/users/profile/${item.user._id}`}>

//               <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
//               <img src={item.user.photo} className="w-10 h-10 rounded-full" alt="" />
//               <div className="pl-3">
//                 <div className="text-base font-semibold">{item.user.name}</div>
//                 <div className="text-normal text-gray-500">{item.user.email}</div>
//               </div>
//             </th>
//             </Link>
            
//             <td className="px-6 py-4">{item.user.gender}</td>
//             <td className="px-6 py-4">
//               {item.isPaid ? (
//                 <div className="flex items-center">
//                   <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
//                   Paid
//                 </div>
//               ) : (
//                 <div className="flex items-center">
//                   <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
//                   Unpaid
//                 </div>
//               )}
//             </td>
//             <td className="px-6 py-4">{item.ticketPrice}</td>
//             <td className="px-6 py-4">{formateDate(item.createdAt)}</td>
//             <td className="px-6 py-4">
//               <button
//                 className="px-2 py-2 rounded-md bg-green-500 text-white"
//                 onClick={() => handleJoin({ doctorId: item.doctor._id, userId: item.user._id })}
//               >
//                 Call
//               </button>
//             </td>
//             <td className="px-6 py-4">
//               <button onClick={() => markConsulted(item._id)}>
//                 {consulted[item._id] ? '✔️' : '❌'}
//               </button>
//             </td>
//             {/* <td className="px-6 py-4">
//               <button
//                 className="px-2 py-2 rounded-md bg-blue-500 text-white"
//                 onClick={() => viewProfile(item.user._id)}
//               >
//                 View
//               </button>
//             </td> */}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default Appointments;







//yo code runn hudai xa

import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { formateDate } from "../../utils/formateDate";
import { BASE_URL } from '../../../config';

const Appointments = ({ appointments }) => {
  const [consulted, setConsulted] = useState(() => {
    const savedConsulted = localStorage.getItem('consulted');
    return savedConsulted ? JSON.parse(savedConsulted) : {};
  });

  useEffect(() => {
    console.log(appointments);
  }, [appointments]);

  const navigate = useNavigate();

  const markConsulted = useCallback((id) => {
    const updatedConsulted = {
      ...consulted,
      [id]: true,
    };
    setConsulted(updatedConsulted);
    localStorage.setItem('consulted', JSON.stringify(updatedConsulted));
  }, [consulted]);

  const handleJoin = useCallback(({ doctorId, userId, appointmentId }) => {
    navigate(`/room/${doctorId}${userId}`);
    markConsulted(appointmentId);
  }, [navigate, markConsulted]);

  return (
    <table className="w-full text-left text-sm text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">Name</th>
          <th scope="col" className="px-6 py-3">Gender</th>
          <th scope="col" className="px-6 py-3">Payment</th>
          <th scope="col" className="px-6 py-3">Price</th>
          <th scope="col" className="px-6 py-3">Booked On</th>
          <th scope="col" className="px-6 py-3">Call</th>
          <th scope="col" className="px-6 py-3">Consulted</th>
          {/* <th scope="col" className="px-6 py-3">Profile</th> */}
        </tr>
      </thead>
      <tbody>
        {appointments?.map((item) => (
          <tr key={item._id}>
            <Link to={`/users/profile/${item.user._id}`}>
              <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                <img src={item.user.photo} className="w-10 h-10 rounded-full" alt="" />
                <div className="pl-3">
                  <div className="text-base font-semibold">{item.user.name}</div>
                  <div className="text-normal text-gray-500">{item.user.email}</div>
                </div>
              </th>
            </Link>
            <td className="px-6 py-4">{item.user.gender}</td>
            <td className="px-6 py-4">
              {item.isPaid ? (
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                  Paid
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                  Unpaid
                </div>
              )}
            </td>
            <td className="px-6 py-4">{item.ticketPrice}</td>
            <td className="px-6 py-4">{formateDate(item.createdAt)}</td>
            <td className="px-6 py-4">
              <button
                className="px-2 py-2 rounded-md bg-green-500 text-white"
                onClick={() => handleJoin({ doctorId: item.doctor._id, userId: item.user._id, appointmentId: item._id })}
              >
                Call
              </button>
            </td>
            <td className="px-6 py-4">
              <button onClick={() => markConsulted(item._id)}>
                {consulted[item._id] ? '✔️' : '❌'}
              </button>
            </td>
            {/* <td className="px-6 py-4">
              <button
                className="px-2 py-2 rounded-md bg-blue-500 text-white"
                onClick={() => viewProfile(item.user._id)}
              >
                View
              </button>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Appointments;






