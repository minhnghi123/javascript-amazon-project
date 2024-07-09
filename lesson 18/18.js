// const xhr = new XMLHttpRequest();
// xhr.addEventListener("load", () => {
//   console.log(xhr.response);
// });
// xhr.open("GET", "http://supersimplebackend.dev");
// xhr.send();

// TODO: this code is used to handle the asynchronous  ;
// async function fun() {
//   const response = await fetch("http://supersimplebackend.dev");
//   const text = await response.text();
//   console.log(text);
// }
// fun();

// async function fun() {
//   const response = await fetch("https://supersimplebackend.dev/greeting", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name: "Nguyen Minh Nghi",
//     }),
//   });
//   const text = await response.text();
//   console.log(text);
// }
// fun();

// async function fun() {
//   try {
//     const response = await fetch("https://supersimplebackend.dev/greeting", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.status >= 400) {
//       throw response;
//     }

//     const text = await response.text();
//     console.log(text);
//   } catch (error) {
//     if (error.status === 400) {
//       const errorMessage = await error.json();
//       console.log(errorMessage);
//     } else {
//       console.log("Network error. Please try again later.");
//     }
//   }
// }
// fun();
