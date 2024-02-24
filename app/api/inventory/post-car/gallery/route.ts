// import { NextApiRequest, NextApiResponse } from 'next';
// import { postImage } from '@/actions/post-car';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }

//   try {
//     const { image, imageName } = req.body;

//     // Call your postImage function to handle the file upload
//     const result = await postImage(image, imageName);

//     // Respond to the client with the result of the upload
//     res.status(200).json(result);
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     res.status(500).json({ error: 'Failed to upload image' });
//   }
// }
