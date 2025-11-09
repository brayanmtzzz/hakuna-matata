import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const service = await prisma.service.findUnique({
      where: { id: params.id },
    });
    
    if (!service) {
      return NextResponse.json(
        { error: 'Servicio no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      { error: 'Error al obtener servicio' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const service = await prisma.service.update({
      where: { id: params.id },
      data: {
        title: body.title,
        description: body.description,
        img: body.img,
        is_active: body.is_active,
      },
    });
    return NextResponse.json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { error: 'Error al actualizar servicio' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.service.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Servicio eliminado' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { error: 'Error al eliminar servicio' },
      { status: 500 }
    );
  }
}
