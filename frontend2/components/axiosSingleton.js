import axios from "axios";

// Use your local IP address here for physical devices or emulators
const baseURL = "http://localhost:5000"; // Replace with your machine's IP address

class AxiosSingleton {
  constructor() {
    if (!AxiosSingleton.instance) {
      this.axiosInstance = axios.create({
        baseURL: baseURL, // The base URL now points to your machine's local IP
      });
      AxiosSingleton.instance = this;
    }

    return AxiosSingleton.instance;
  }

  getInstance() {
    return this.axiosInstance;
  }
}

const instance = new AxiosSingleton();
Object.freeze(instance);

export default instance.getInstance();
