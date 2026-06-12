import { client } from "./sanity";

export async function getHero() {
  return await client.fetch(`
    *[_type == "hero"][0]{
      title,
      subtitle,
      description,
      buttonText,
      buttonLink,
      "imageUrl": image.asset->url
    }
  `);
}