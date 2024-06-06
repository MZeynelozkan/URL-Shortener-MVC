import { getJson } from "./helper.js";

export const state = {
  linkArr: [],
};

export async function createLinks(link) {
  try {
    const data = await getJson(link);
    return data;
  } catch (error) {
    throw new Error("Failed to create links");
  }
}

export async function pushingLinks(apiLink, originalLink) {
  try {
    const shortLink = await createLinks(apiLink);
    const linkData = {
      original: originalLink,
      short: shortLink,
    };
    state.linkArr.push(linkData);
  } catch (error) {
    throw new Error("Failed to push links");
  }
}
