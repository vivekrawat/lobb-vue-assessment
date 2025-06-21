import { z } from 'zod';

export const contentSchema = z.object({
  thumbNailImage: z.string().url(),
  mainImage: z.string().url(),
  userName: z.string(),
  subTitle: z.string(),
  text: z.string().refine((val) => {
    return val.includes('<html>') && val.includes('</html>');
  }, {
    message: 'Text must be valid HTML content'
  }),
  id: z.number(),
  logo: z.string().url(),
  title: z.string()
});

export type Content = z.infer<typeof contentSchema>
