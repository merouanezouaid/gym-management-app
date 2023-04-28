// // ----------------------------------------------------------------------
// import Axios from "axios";
// import { useState, useEffect } from "react";

// export default function Account() {
//   const [user, setUser] = useState({
//     username: "demo",
//     email: "demo@demo.com",
//     photoURL: "/static/mock-images/avatars/avatar_default.jpg",
//   });

//   Axios.defaults.withCredentials = true;

//   useEffect(() => {
//     Axios.get(process.env.REACT_APP_API_URL + " /login").then((response) => {
//       console.log(response.data);
//       if (response.data.loggedIn === true) {
//         console.log(response.data.user[0].uname);
//         setUser({
//           ...user,
//           username: response.data.user[0].uname,
//           email: response.data.user[0].uname,
//         });
//       }
//     });
//   }, []);

//   // useEffect(()=> {
//   //   Axios.get(process.env.REACT_APP_API_URL + " /login").then((response) => {
//   //     console.log(response.data);
//   //     setUsername(response.data[0].uname);
//   //     console.log(response.data[0].email);
//   //   });
//   // }, [])

//   return {
//     uname: user.username,
//     mail: user.email,
//     picURL: user.photoURL,
//   };
// }
