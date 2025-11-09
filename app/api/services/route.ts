import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Error al obtener servicios' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const service = await prisma.service.create({
      data: {
        title: body.title,
        description: body.description,
        img: body.img,
        is_active: body.is_active ?? true,
      },
    });
    return NextResponse.json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Error al crear servicio' },
      { status: 500 }
    );
  }
}
