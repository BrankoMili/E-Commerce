import instance from "./api";

let myHeaders = new Headers();
myHeaders.set("Content-Type", "application/json");

const isAuthenticated = () => {
  instance
    .post("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: "mor_2314",
        password: "83r5^_"
      })
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => {
      console.error(err);
    });
};

export default isAuthenticated;
