import axios from "axios";
import "./style.css";
import { SecretResponse } from "./models/secretResponse";

document
  .getElementById("getSecretButton")
  ?.addEventListener("click", async () => {
    const response = await axios.get<SecretResponse>(
      "http://localhost:3000/secret",
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      const heading = document.createElement("h2");
      heading.innerHTML = response.data.message;

      document.getElementById("app")?.appendChild(heading);
    }
  });
