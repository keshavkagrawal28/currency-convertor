import { HiOutlineStar, HiStar } from 'react-icons/hi2';

const Dropdown = ({
  currencies,
  currency,
  setCurrency,
  favourites,
  handleFavourites,
  title = '',
}) => {
  const isFavourite = (curr) => favourites.includes(curr);

  return (
    <div>
      <label
        htmlFor={title}
        className='block text-sm font-medium text-gray-700'
      >
        {title}
      </label>
      <div className='mt-1 relative'>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
        >
          {favourites?.map((currency) => {
            return (
              <option
                className='bg-gray-200'
                value={currency}
                key={`${title}-${currency}`}
              >
                {' '}
                {currency}
              </option>
            );
          })}
          <hr />
          {currencies
            ?.filter((i) => !favourites.includes(i))
            .map((currency) => {
              return (
                <option value={currency} key={`${title}-${currency}`}>
                  {' '}
                  {currency}
                </option>
              );
            })}
        </select>
        <button
          className='absolute inset-y-0 right-0 mr-5 flex items-center text-sm leading-5'
          onClick={() => handleFavourites(currency)}
        >
          {isFavourite(currency) ? <HiStar /> : <HiOutlineStar />}
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
