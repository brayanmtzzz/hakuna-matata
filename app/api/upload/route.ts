import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No se proporcionó ningún archivo' },
        { status: 400 }
      );
    }

    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no válido. Use JPEG, PNG, WEBP o GIF' },
        { status: 400 }
      );
    }

    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'El archivo es demasiado grande. Tamaño máximo: 5MB' },
        { status: 400 }
      );
    }

    // Convertir archivo a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generar nombre único para el archivo
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const filename = `service-${timestamp}.${extension}`;

    // Crear directorio si no existe
    const uploadDir = join(process.cwd(), 'public', 'img', 'servicios');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Guardar archivo
    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Retornar ruta relativa para usar en la base de datos
    const relativePath = `/img/servicios/${filename}`;

    return NextResponse.json({
      success: true,
      path: relativePath,
      filename: filename
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error al subir el archivo' },
      { status: 500 }
    );
  }
}
