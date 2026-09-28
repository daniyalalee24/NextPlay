import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/health`,
        );

        setMessage(response.data.message);
      } catch (error) {
        console.error("Server connection failed:", error);
      }
    };

    checkServer();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">NextPlay</h1>

      <p className="text-gray-400">{message}</p>
    </div>
  );
}

export default App;
