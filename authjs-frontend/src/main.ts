import axios from "axios";
import "./style.css";

document.getElementById("login")?.addEventListener("click", async () => {
  const csrfResponse = await axios.get("http://localhost:3000/csrf-token", {
    withCredentials: true,
  });

  console.log("Setting csrf:", csrfResponse.data);

  const response = await axios.get("http://localhost:3000/auth/signin");

  document.body.innerHTML = response.data;
});

document.getElementById("session")?.addEventListener("click", async () => {
  const response = await axios.get("http://localhost:3000", {
    withCredentials: true,
  });

  const container = document.createElement("div");
  const name = document.createElement("h4");
  const imgContainer = document.createElement("div");
  const image = document.createElement("img");

  container.className = "user";
  name.innerHTML = response.data.user.name;
  image.src = response.data.user.image;
  imgContainer.appendChild(image);
  imgContainer.className = "avatar";

  container.appendChild(name);
  container.appendChild(imgContainer);

  document.getElementById("app")!.appendChild(container);
});
