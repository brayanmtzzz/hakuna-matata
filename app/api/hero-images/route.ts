import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const heroImagesDir = path.join(process.cwd(), 'public', 'img', 'hero');
    
    // Check if directory exists
    if (!fs.existsSync(heroImagesDir)) {
      return NextResponse.json({ images: [] });
    }

    // Read all files from the directory
    const files = fs.readdirSync(heroImagesDir);
    
    // Filter only image files (common image formats)
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico', '.avif'];
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });

    // Map to full paths
    const images = imageFiles.map(file => `/img/hero/${file}`);

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading hero images:', error);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}
