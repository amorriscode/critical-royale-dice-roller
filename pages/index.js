import { useState } from 'react';

import Head from 'next/head';

import D4 from '../public/dice/d4.svg';
import D6 from '../public/dice/d6.svg';
import D8 from '../public/dice/d8.svg';
import D10 from '../public/dice/d10.svg';
import D12 from '../public/dice/d12.svg';
import D20 from '../public/dice/d20.svg';

const rollDie = async (value, count = 1) => {
  const result = await fetch('/api/roll', {
    method: 'POST',
    body: JSON.stringify({ value, count }),
  });

  const { roll } = await result.json();
  
  return roll;
}

const validRoll = new RegExp(/(\d+d\d+(\+\d+)?)/g);

export default function Home() {
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

  const rollDice = async roll => {
    setIsRolling(true);
    setError(null);

    const parsedRoll = roll
      .split(' ')
      .filter(val => val.match(validRoll));

    if (!parsedRoll.length) {
      setIsRolling(false);
      setError('Invalid input provided');
      return;
    }

    let result = 0;
    let explanation = '';

    for (let i = 0; i < parsedRoll.length; i++) {
      const [count, dieAndMod] = parsedRoll[i].split('d');
      const [die, mod] = dieAndMod.split('+');

      if (![4, 6, 8, 10, 12, 20, 100].includes(+die)) {
        setIsRolling(false);
        setError('Invalid die provided');
        return;
      }

      const dieResult = await rollDie(die, count);
      result += +dieResult;
      explanation = `${explanation}${explanation === '' ? '' : ' + '}${dieResult}`;

      if (mod) {
        result += +mod;
        explanation = `${explanation} (+ ${mod})`;
      }
    }

    setResult(result);
    setExplanation(explanation);
    setIsRolling(false);
    setValue('');
  }

  return (
    <div className="container p-5 sm:p-10 flex flex-col justify-between space-y-10 mx-auto">
      <Head>
        <title>Critical Royale Dice Roller</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>

      <main className="flex flex-col justify-center items-center">
          <a
            className="w-full z-40 sticky -mt-5 md:-mt-10 mb-4 rounded-bl-lg rounded-br-lg hover:bg-cr-blue hover:text-white top-0 bg-cr-yellow text-cr-blue text-center font-bold py-1"
            href="https://criticalroyale.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Looks like you need some real dice! <span className="underline">Get 10% off with the code LETSROLL10 at CriticalRoyale.com</span>
          </a>

        <img src="/logo-white-yellow-icon.svg" alt="Critical Royale Logo Icon" className="w-56" />

        <h1 className="text-3xl mb-2 sm:text-5xl font-serif text-center">
          Choose your weapon!
        </h1>

        <div className="bg-cr-yellow text-cr-blue text-xs font-semibold px-3 py-1 rounded-full text-center">
          Click a die or enter a formula to get your roll on
        </div>

        <section className=" w-full">
          <div className="md:w-3/5 mx-auto flex space-x-4">
            <D4
              width="180"
              height="180"
              viewBox="0 0 800 900"
              className="hover:cursor-pointer"
              onClick={() => rollDice('1d4')}
            />

            <D6
              width="180"
              height="180"
              viewBox="0 0 800 900"
              className="hover:cursor-pointer"
              onClick={() => rollDice('1d6')}
            />

            <D8
              width="180"
              height="180"
              viewBox="0 0 800 900"
              className="hover:cursor-pointer"
              onClick={() => rollDice('1d8')}
            />

            <D10
              width="180"
              height="180"
              viewBox="0 0 800 900"
              className="hover:cursor-pointer"
              onClick={() => rollDice('1d10')}
            />

            <D12
              width="180"
              height="180"
              viewBox="0 0 750 900"
              className="hover:cursor-pointer"
              onClick={() => rollDice('1d12')}
            />

            <D20
              width="180"
              height="180"
              viewBox="0 0 800 900"
              className="hover:cursor-pointer"
              onClick={() => rollDice('1d20')}
            />
          </div>

          <div className="flex flex-col items-center">
            <div className="relative z-20 w-full flex flex-col items-center">
              <form className="w-full px-5 md:px-20" onSubmit={(e) => {
                e.preventDefault();
                rollDice(e.target[0].value);
              }}>
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="shadow-xl px-4 py-3 w-2/3 md:w-5/6 text-cr-blue text-xl md:text-3xl rounded-lg rounded-tr-none rounded-br-none focus:outline-none border-4 border-transparent focus:border-cr-yellow"
                  placeholder="Enter dice roll formula"
                />

                <button
                  type="submit"
                  className="focus:outline-none hover:cursor-pointer hover:bg-cr-yellow hover:border-cr-yellow hover:text-cr-blue font-bold w-1/3 md:w-1/6 px-4 py-3 text-xl md:text-3xl bg-cr-blue border-4 border-cr-blue rounded-lg rounded-tl-none rounded-bl-none text-white"
                >
                  Roll
                </button>

                {
                  error && !isRolling && (
                    <div className="px-5 md:px-20 absolute -mt-5 top-0 left-0 right-0 text-center">
                      <div className="bg-red-600 rounded-tl-lg rounded-tr-lg py-1 uppercase text-xs font-bold">
                        {error}
                      </div>
                    </div>      
                  )
                }
              </form>
            </div>

            <div className="-mt-10 w-full text-cr-blue">
              <div className="w-full pt-20 pb-10 flex flex-col justify-center items-center bg-white rounded-lg relative h-64">
                {
                  isRolling && (
                    <div className="z-10 absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center text-6xl bg-white rounded-lg">
                      Rolling...
                    </div>
                  )
                }

                <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center text-6xl bg-white rounded-lg">
                  {
                    result 
                    ? (
                      <>
                        <div className="text-6xl font-bold">
                          {result}
                        </div>
            
                        <div className="text-lg">
                          {explanation}
                        </div>
                      </>
                    )
                    : (
                      <div className="text-2xl sm:text-5xl text-gray-400 text-center">
                        Only the dice can decide your fate!
                      </div>
                    )
                  }
                </div>
              </div>
            </div>

            <div className="w-full px-5 md:px-20 ">
              <div className="bg-cr-blue p-5 rounded-bl-lg rounded-br-lg md:flex md:space-x-20">
                <div className="mb-4">
                  <h2 className="text-sm md:text-base mb-1 font-bold text-cr-yellow inline-block">
                    How to roll dice
                  </h2>

                  <p className="text-xs md:text-sm">
                    Type a formula just like how you would describe a it in english.
                  </p>
                  
                  <p className="text-xs md:text-sm">
                    Eg. <span className="hover:cursor-pointer hover:opacity-75 border-b border-cr-yellow border-dashed text-cr-yellow" onClick={() => rollDice('1d20')}>1d20</span>
                  </p>
                </div>

                <div className="mb-4">
                  <h2 className="text-sm md:text-base mb-1 font-bold text-cr-yellow inline-block">
                    Rolling multiple types of die
                  </h2>

                  <p className="text-xs md:text-sm">
                    You can roll multiple dice at once by separating individual rolls with a <span className="font-bold">+</span> and spaces.
                  </p>
                  
                  <p className="text-xs md:text-sm">
                    Eg. <span className="hover:cursor-pointer hover:opacity-75 border-b border-cr-yellow border-dashed text-cr-yellow" onClick={() => rollDice('2d6 + 1d8')}>2d6 + 1d8</span>
                  </p>
                </div>

                <div>
                  <h2 className="text-sm md:text-base mb-1 font-bold text-cr-yellow inline-block">
                    Adding modifiers
                  </h2>

                  <p className="text-xs md:text-sm">
                    You can add modifiers to your rolls with a <span className="font-bold">+</span> and no spaces.
                  </p>
                  
                  <p className="text-xs md:text-sm">
                    Eg. <span className="hover:cursor-pointer hover:opacity-75 border-b border-cr-yellow border-dashed text-cr-yellow" onClick={() => rollDice('1d20+4')}>1d20+4</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col justify-center items-center">
        <a
          href="https://criticalroyale.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex justify-center items-center hover:text-cr-yellow"
        >
          Made with advantage by{' '}

          <img src="/logo-white-yellow-icon.svg" alt="Critical Royale Logo Icon" className="w-16" />
          <img src="/logo-white-yellow-text.svg" alt="Critical Royale Logo Text" className="w-32" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
        }
      `}</style>
    </div>
  )
}
