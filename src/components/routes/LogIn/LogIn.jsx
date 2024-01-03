// import React from 'react'
// import myFetch from '../../../api/fetch'

//  const logIn = async ({ email, password }) => {
//     const response = await myFetch('http://localhost:8080/api/v1/auth/authenticate', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//     });
//     if (!response.ok) {
//         throw new Error('Failed to login', response);
//     }
//     return await response.text();
// };

// const Home = () => {
//     const onLogIn = () => logIn({
//         "email": "raczkowski.bartek@gmail.com",
//         "password":"Hasl0123"
//     })

//     return (
//         <div className='home-route'>
//             <h1>homepage</h1>
//             <div>
//                 <a onClick={onLogIn}>login</a>
//             </div>
//         </div>
//     )
// }
//  export default Home