import { GiphyFetch } from "@giphy/js-fetch-api";

export const createGiphyClient = () => {
  if(!process.env.GIPHY_KEY) {
    throw new TypeError('GIPHY_KEY is missing in env.')
  }

  return new GiphyFetch(process.env.GIPHY_KEY);
};

export const giphyClientKey = Symbol('GiphyClient')