import { data } from './sonar-sweep-data';

const countDepthIncreases = (depthData: number[]) => {
  let depthIncreases = 0;
  depthData.forEach((depth,idx) => {
    if(depth > depthData[idx-1]) {
      depthIncreases++;
    } 
  })
  return depthIncreases;
}

console.log('increases',countDepthIncreases(data));