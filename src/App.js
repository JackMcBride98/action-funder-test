import testFundsData from './testFunds.json';
import greeneKingLogo from './images/Greene-King.jpg';
import { BackpackIcon, Crosshair2Icon, ValueIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

function sortFunds(funds, sortBy) {
  let sortedFunds;
  switch (sortBy) {
    case 'priceLH':
      sortedFunds = funds.sort((a, b) => a.amount - b.amount);
      break;
    case 'priceHL':
      sortedFunds = funds.sort((a, b) => b.amount - a.amount);
      break;
    case 'alphaAZ':
      sortedFunds = funds.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'alphaZA':
      sortedFunds = funds
        .sort((a, b) => a.name.localeCompare(b.name))
        .reverse();
      break;
    default:
      sortedFunds = funds.sort((a, b) => a.id - b.id);
      break;
  }
  return [...sortedFunds];
}

function App() {
  const [funds, setFunds] = useState(testFundsData);

  return (
    <div className="w-full flex flex-col p-4 space-y-4">
      <div className="flex flex-col md:flex-row justify-between">
        <h1 className="font-semibold text-2xl">ActionFunder funds</h1>
        <div className="flex items-center space-x-2 pr-2">
          <label className="text-xl">
            Sort by:
            <select
              className="border-slate-300 border rounded-md p-2"
              onChange={(e) => {
                if (Array.isArray(funds)) {
                  setFunds(sortFunds(funds, e.target.value));
                }
              }}
            >
              <option value="none">-- select an option --</option>
              <option value="priceLH">Price: Low to High</option>
              <option value="priceHL">Price: High to Low</option>
              <option value="alphaAZ">Alphabetically: A to Z</option>
              <option value="alphaZA">Alphabetically: Z to A</option>
            </select>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
        {funds && funds.map((fund) => <FundCard key={fund.id} {...fund} />)}
      </div>
    </div>
  );
}

const FundCard = ({ id, name, amount }) => (
  <div className="border border-slate-300 rounded-md shadow-md p-4 flex flex-col h-full justify-between w-full">
    <div className="w-full h-20 bg-indigo-900 rounded-md mb-8 flex justify-between">
      <img
        src={greeneKingLogo}
        alt="company logo"
        className="rounded-full flex w-16 h-16 p-1 mt-10 bg-white"
      />
      <p className="bg-white/70 p-2 h-fit text-blue-500 rounded-bl-md">Live</p>
    </div>

    <div className="flex">
      <p data-testid="fund-name" className="text-xl font-semibold mb-4">
        {name}
      </p>
    </div>

    <div className="flex flex-col text-slate-500 space-y-2 mb-3">
      <p data-testid="fund-amount" className="flex items-center">
        <BackpackIcon className="mr-2" />
        Total fund amount: £{amount.toLocaleString()}
      </p>
      <p className="flex items-center">
        <ValueIcon className="mr-2" />
        Individual amount: £3,000
      </p>
      <p className="flex items-center">
        <Crosshair2Icon className="mr-2" />
        Location: <b className="ml-1"> IP33 1QT</b>
      </p>
    </div>

    <div className="flex justify-between">
      <p className="text-lg font-medium">Ends in:</p>
      <p className="text-green-400">1 month</p>
    </div>
    <svg viewBox="0 0 100 5" className="w-full">
      <line
        x1="0"
        y1="0"
        x2="100"
        y2="0"
        strokeWidth={5}
        className="stroke-slate-300"
      ></line>
      <line
        x1="0"
        y1="0"
        x2="40"
        y2="0"
        strokeWidth={5}
        className="stroke-green-300 path"
      ></line>
    </svg>

    <a
      href="https://www.actionfunder.org/"
      target="_blank"
      rel="noopener noreferrer"
      alt="fund link"
      className="text-blue-900 text-lg font-medium hover:underline flex items-center w-fit"
    >
      See fund
      <svg viewBox="0 0 100 100" className="fill-blue-900 w-4 h-4 ml-1">
        <polygon points="0,0 90,50 0,100"></polygon>
      </svg>
    </a>
  </div>
);

export default App;
