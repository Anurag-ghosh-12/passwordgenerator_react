import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState("Copy");
  const [color, setColor] = useState("black");
  // useref hook
  const passwordRef = useRef(null);

  // useCallback for optimising
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "1234567890";
    }
    if (charAllowed) {
      str = str + "_$#.";
      str = "#$%." + str;
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  // useEffect to regenerate password when dependencies change
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyPasswordClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 5);
    window.navigator.clipboard.writeText(password);
    setButtonText("Copied!");
  }, [password]);

  return (
    <div
      style={{ backgroundColor: color, minHeight: "100vh", paddingTop: "12px" }}
    >
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-4  text-orange-500 font-semibold bg-gray-900">
        <h1 className="text-white text-center my-3">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4 text-blue-900">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordClipboard}
            className="outline-none bg-blue-600 text-yellow-200 px-3 py-0.5 shrink-0"
          >
            {buttonText}
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
                setButtonText("Copy");
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
                setButtonText("Copy");
              }}
            />
            <label>Special Characters</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
                setButtonText("Copy");
              }}
            />
            <label>Numbers</label>
          </div>
        </div>
      </div>
      <div className="mx-auto fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2 font-semibold">
        <div className="flex flex-wrap justify-center gap-3 shadow-xl bg-gray-700 px-3 py-2 rounded-3xl">
          <h1 className="py-2 text-white">Themes:</h1>
          <button
            onClick={() => setColor("black")}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
            style={{ backgroundColor: "blue" }}
          >
            Dark
          </button>
          <button
            onClick={() => setColor("white")}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
            style={{ backgroundColor: "blue" }}
          >
            Light
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
