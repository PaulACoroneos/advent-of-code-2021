import fs from 'fs';

const depthAndHorizontalCalculator = () => {
  fs.readFile('dive-data.txt', 'utf8', function (err, data) {
    if (err) throw err;
    const diveData = data;

    const hashTable: Record<string, number> = {};

    //we are going to create an array of k/v pairs then hash
    const diveDataArr = diveData.split('\n').map(data => {
      const [command, qty] = data.split(' ');
      return { command, value: parseInt(qty) }
    });

    //now hash
    diveDataArr.forEach(({ command, value }) => {
      if (hashTable[command]) hashTable[command] += value;
      else hashTable[command] = value;
    })

    //calculate final total
    console.log(hashTable['forward'] * (hashTable['down'] - hashTable['up']))
  })
}

console.log(depthAndHorizontalCalculator());