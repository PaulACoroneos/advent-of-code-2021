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

const depthAndHorizontalCalculatorWithAim = () => {
  fs.readFile('dive-data.txt', 'utf8', function (err, data) {
    if (err) throw err;
    const diveData = data;

    //we are going to create an array of k/v pairs
    const diveDataArr = diveData.split('\n').map(data => {
      const [command, qty] = data.split(' ');
      return { command, value: parseInt(qty) }
    });

    //so this is a bit different. now we need to keep a rolling "count" of aim and that will form final result
    let horizontalDistance = 0;
    let aim = 0;
    let depth = 0;

    diveDataArr.forEach(({command,value}) => {
      //CASE 1. We go down
      if(command === 'down') {
        aim += value;
      }
      //CASE 2. We go up
      else if(command === 'up') {
        aim -= value
      }
      //CASE 3. We move forward. Calculate new depth and horizontal distance
      else {
        horizontalDistance += value;
        depth += aim*value;
        console.log('distance,depth',horizontalDistance,depth)
      }
    });
    console.log('aimed calculation',depth*horizontalDistance)
  })
}

depthAndHorizontalCalculator();
depthAndHorizontalCalculatorWithAim();