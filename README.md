# Critical Royale's Wonderfully Fantastic Virtual Dice Roller

This project is an online dice roller for Dungeons & Dragons or any tabletop roleplaying game you enjoy.

## Getting Started

Install those sweet dependencies:

```bash
npm i
# or
yarn
```

Then run the dev server:

```bash
npm run dev
# or
yarn dev
```

## True Randomness

> Most random numbers used in computer programs are pseudo-random, which means they are generated in a predictable fashion using a mathematical formula.

This wouldn't work well for dice now would it? To combat this, this project uses [RANDOM.ORG](https://www.random.org/) which uses _atmospheric noise_ for true randomness. Pretty cool, right? You'll need an API key from them to use in development.

For fun, you can [learn more about randomness and random numbers](https://www.random.org/randomness).