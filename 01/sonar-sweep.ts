import { data } from './sonar-sweep-data';

const countDepthIncreases = (depthData: number[]) => {
  let depthIncreases = 0;
  depthData.forEach((depth, idx) => {
    if (depth > depthData[idx - 1]) {
      depthIncreases++;
    }
  })
  return depthIncreases;
}

const slidingWindowIncreases = (depthData: number[]) => {
  let depthIncreases = 0;
  let prevWindow = 0
  let currWindow = depthData[0] + depthData[1] + depthData[2];

  for (let i = 1; i < depthData.length; i++) {
    prevWindow = currWindow;
    currWindow = depthData[i] + (depthData[i + 1] || 0) + (depthData[i + 2] || 0);
    if ( currWindow > prevWindow) depthIncreases++;
  }

  return depthIncreases;
}

console.log('increases', countDepthIncreases(data));
console.log('window_increases', slidingWindowIncreases(data));