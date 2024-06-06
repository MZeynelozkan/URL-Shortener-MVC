import Randomstring from "randomstring";

export async function getJson(input) {
  try {
    const res = await fetch(input);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.text();
    console.log(data); // Gelen veriyi kontrol etmek için
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function randomString(length = 10, charset = "alphabetic") {
  const string = Randomstring.generate({
    length: length,
    charset: charset,
  });
  return string;
}
