// const initFetch = () => {
//     let token
//     const createFetch = async(...params) => {
//       if (!token) {
//         const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//     });
//     if (!response.ok) {
//         throw new Error('Failed to login', response);
//     }
//     token = await response.text();
//       }
//       params[1].headers.Authorization = token
//       return fetch(...params)
//     }
//     return createFetch
//   }

//   const myFetch = initFetch()

//   export default myFetch