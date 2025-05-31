import { useRef, useState } from "react";
import { requestToGroq } from "../utils/groq";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = async (event?: React.FormEvent) => {
    event?.preventDefault();

    setIsLoading(true);
    const ai = await requestToGroq(inputRef.current?.value ?? "");
    setData(ai);
    setIsLoading(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-center font-bold text-3xl text-pink-500">LX | Ai</h1>
      <form
        onSubmit={handleClick}
        className="flex flex-col items-center justify-center gap-4 p-4 rounded-lg"
      >
        <input
          ref={inputRef}
          placeholder="Tanyakan apa mau mu..."
          className="py-4 px-8 text-md rounded-md shadow-md border text-black border-gray-300 focus:outline-none focus: ring-gray-400 focus:ring-gray-200 focus:border-transparent w-full max-w-md"
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleClick();
            }
          }}
        />
        <button
          onClick={handleClick}
          type="submit"
          className={`font-bold py-2 px-8 shadow-md rounded-md text-white flex items-center gap-2 ${
            isLoading ? "bg-pink-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700"
          }`}
          disabled={isLoading}
        >
          {isLoading && (
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
          )}
          {isLoading ? "Loading..." : "Tanyakan.."}
        </button>
        <div className="p-4 max-w-xl mx-auto bg-gray-100 rounded-lg shadow-md">
          <p className="text-gray-700 text-lg">{data}</p>
        </div>
      </form>
    </main>
  );
}

export default App;