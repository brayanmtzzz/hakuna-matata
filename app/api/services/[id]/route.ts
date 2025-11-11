import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type ParamsPromise = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: ParamsPromise) {
  try {
    const { id } = await context.params;
    const service = await prisma.service.findUnique({
      where: { id },
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
  request: NextRequest,
  context: ParamsPromise
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const service = await prisma.service.update({
      where: { id },
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
  request: NextRequest,
  context: ParamsPromise
) {
  try {
    const { id } = await context.params;
    await prisma.service.delete({
      where: { id },
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
