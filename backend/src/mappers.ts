import { PORT } from './config';

export const mapImagNameToURL = (imageName: string) =>
  `http://localhost:${PORT}/images/${imageName}.jpg`;
