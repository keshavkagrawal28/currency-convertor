import { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import { HiArrowsRightLeft } from 'react-icons/hi2';

const CurrencyConvertor = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem('favourite')) || ['INR', 'EUR', 'USD']
  );

  const fetchCurrencies = async () => {
    try {
      const res = await fetch('https://api.frankfurter.app/currencies');
      const data = await res.json();

      setCurrencies(Object.keys(data));
    } catch (err) {
      console.err('Error fetching currencies:', err);
    }
  };

  const currencyConvert = async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency] + ' ' + toCurrency);
    } catch (err) {
      console.error('Error during conversion:', err);
    } finally {
      setConverting(false);
    }
  };

  const handleFavourite = (curr) => {
    let updatedFavourites = [...favourites];
    if (favourites.includes(curr)) {
      updatedFavourites = updatedFavourites.filter((fav) => fav !== curr);
    } else {
      updatedFavourites.push(curr);
    }
    setFavourites(updatedFavourites);
    localStorage.setItem('favourite', JSON.stringify(updatedFavourites));
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return (
    <div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
      <h2 className='mb-5 text-2xl font-semibold text-gray-700'>
        Currency Convertor
      </h2>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'>
        <Dropdown
          currencies={currencies}
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          title='From:'
          favourites={favourites}
          handleFavourites={handleFavourite}
        />
        {/* <button> to swap currencies</button> */}
        <div className='flex justify-center -mb-5 sm:mb-0'>
          <button
            onClick={swapCurrencies}
            className='p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300'
          >
            <HiArrowsRightLeft className='text-xl text-gray-700' />
          </button>
        </div>
        <Dropdown
          currencies={currencies}
          currency={toCurrency}
          setCurrency={setToCurrency}
          title='To:'
          favourites={favourites}
          handleFavourites={handleFavourite}
        />
      </div>
      <div>
        <label
          htmlFor='amount'
          className='block text-sm font-medium text-gray-700'
        >
          Amount:
        </label>
        <input
          type='number'
          className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1'
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
      </div>
      <div className='flex justify-end mt-6'>
        <button
          className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            converting ? 'animate-pulse' : ''
          }`}
          onClick={currencyConvert}
        >
          Convert
        </button>
      </div>

      {convertedAmount && (
        <div className='mt-4 text-lg font-medium text-right text-green-600'>
          Converted Amount: {convertedAmount}
        </div>
      )}
    </div>
  );
};

export default CurrencyConvertor;
