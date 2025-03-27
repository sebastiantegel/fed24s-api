import axios from "axios";
import "./style.css";

document
  .getElementById("registerForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userName = (document.getElementById("userName") as HTMLInputElement)
      .value;
    const userEmail = (document.getElementById("userEmail") as HTMLInputElement)
      .value;
    const userPassword = (
      document.getElementById("userPassword") as HTMLInputElement
    ).value;

    const response = await axios.post(
      "http://localhost:3000/register",
      {
        name: userName,
        email: userEmail,
        password: userPassword,
      },
      {
        withCredentials: true,
      }
    );
    console.log(response.data);

    location.href = "/";
  });
