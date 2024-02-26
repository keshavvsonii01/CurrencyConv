import { useState } from "react";
import "./App.css";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import InputBox from "./components/InputBox";
import Footer from "./components/Footer";

function App() {
  const [amount, setAmount] = useState(null);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <>
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://wallpapercave.com/wp/wp2970123.jpg)",
        }}
      >
        <div className="w-full mt-10">
          <div className="w-full max-w-md mx-auto border border-gray-70 rounded-lg p-5 backdrop-blur-sm bg-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <div className="w-full mb-1">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  onAmountChange={(amount) => setAmount(amount)}
                  selectedCurrency={from}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  onClick={swap}
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-black/75 text-white px-2 py-0.5"
                >
                  Swap
                </button>
              </div>
              <div className="w-full mb-1">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  amountDisabled
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectedCurrency={to}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black/80 text-white px-4 py-3 rounded-lg"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
     
    </>
  );
}

export default App;
