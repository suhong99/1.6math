import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://1-6math.vercel.app/',
      lastModified: new Date(),
      priority: 1,
    },
  ];
}
