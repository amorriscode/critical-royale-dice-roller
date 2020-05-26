import RandomOrg from 'random-org';

const random = new RandomOrg({ apiKey: process.env.RANDOM_ORG_API_KEY });

const rollDie = async (value, count = 1) => {
  const { random: randomResult } = await random.generateIntegers({
    min: 1,
    max: value,
    n: count,
  });

  return randomResult.data.reduce((acc, curr) => acc + curr, 0);
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const { value, count } = JSON.parse(req.body);

    if (!value || !count) {
      res.statusCode = 400;
      return;
    }

    const roll = await rollDie(value, count);

    res.statusCode = 200;
    res.json({ roll });
  }

  res.statusCode = 400;
}
