import roll from './roll';

export default function flipACoin(max, min) {
  return roll(2) === 1;
}
