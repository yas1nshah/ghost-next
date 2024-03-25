import fs from "fs";
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import sharp from 'sharp';
import { useSearchParams } from 'next/navigation'

export async function GET(request: NextRequest, { params, searchParams }: { params: { path: string[] }, searchParams: any }) {
  const imagePath = path.resolve(process.cwd(), 'public', 'media', ...params.path);
  const w = request.nextUrl.searchParams.get("w");
  const h = request.nextUrl.searchParams.get("h");
  const q = request.nextUrl.searchParams.get("q");


  try {
    // Check if the image file exists
    await fs.promises.access(imagePath, fs.constants.F_OK);
    console.log('Image found at:', imagePath);

    // Read the image file
    let image = sharp(imagePath);

    // Parse and apply resizing options
    if (w || h) {
      const width = parseInt(w || '0');
      const height = parseInt(h || '0');
      image = image.resize(width || undefined, height || undefined);
    }

    // Parse and apply quality option
    if (q) {
      const quality = parseInt(q);
      if (!isNaN(quality) && quality >= 1 && quality <= 100) {
        image = image.jpeg({ quality });
      }
    }

    // Encode the image
    const imageData = await image.toBuffer();

    // Return the encoded image with appropriate content type
    return new NextResponse(
      imageData,
      {
        status: 200,
        headers: {
          "Content-Type": "image/jpeg", // Assuming JPEG format after resizing
        }
      }
    );
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      console.error('Image not found:', imagePath);
      return NextResponse.json({ error: "no image found" });
    }
    console.error('Error reading image file:', err);
    return NextResponse.json({ error: "failed to read image" });
  }
}