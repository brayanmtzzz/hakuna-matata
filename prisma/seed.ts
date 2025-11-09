import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('adminhakuna', 10);

  const user = await prisma.user.upsert({
    where: { email: 'yeseniacruz@hakuna.com' },
    update: {},
    create: {
      nombre: 'Yesenia Cruz',
      email: 'yeseniacruz@hakuna.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Usuario admin creado:', user);

  const servicios = [
    {
      title: 'Cirugías Programadas',
      description:
        'Realizamos cirugías veterinarias con equipos de última generación y personal altamente calificado. Ofrecemos procedimientos seguros con anestesia monitoreada y cuidados post-operatorios especializados para garantizar la recuperación de tu mascota.',
      img: '/img/servicios/CirugiasProgramadas.webp',
      is_active: true,
    },
    {
      title: 'Baños y Cortes Higiénicos',
      description:
        'Servicio profesional de estética canina y felina. Incluye baño con productos especializados según el tipo de pelaje, corte de uñas, limpieza de oídos, glándulas anales y cortes de pelo personalizados para mantener a tu mascota limpia y saludable.',
      img: '/img/servicios/BañosyCortes.webp',
      is_active: true,
    },
    {
      title: 'Toma de Muestras para Laboratorio',
      description:
        'Servicio de diagnóstico clínico mediante análisis de sangre, orina, heces y otros estudios especializados. Contamos con laboratorio propio para resultados rápidos y precisos que permiten detectar enfermedades a tiempo.',
      img: '/img/servicios/Toma de muestras.webp',
      is_active: true,
    },
    {
      title: 'Vacunas',
      description:
        'Plan completo de vacunación para perros y gatos de todas las edades. Protegemos a tu mascota contra enfermedades como rabia, parvovirus, moquillo, leucemia felina y más. Contamos con vacunas de las mejores marcas con certificado oficial.',
      img: '/img/servicios/Vacunas.webp',
      is_active: true,
    },
    {
      title: 'Vitaminas',
      description:
        'Suplementos vitamínicos y nutricionales específicos para cada etapa de vida de tu mascota. Mejoramos el sistema inmunológico, salud del pelaje, articulaciones y energía con productos de alta calidad y recomendación veterinaria.',
      img: '/img/servicios/Vitaminas.webp',
      is_active: true,
    },
    {
      title: 'Alimento Premium',
      description:
        'Amplio catálogo de alimentos premium y super premium para perros y gatos. Marcas reconocidas con fórmulas especializadas según edad, tamaño, raza y condiciones especiales. Nutrición balanceada para una vida más saludable.',
      img: '/img/servicios/AlimentoPremium.webp',
      is_active: true,
    },
    {
      title: 'Desparasitantes Externos e Internos',
      description:
        'Productos antiparasitarios de última generación para eliminar y prevenir pulgas, garrapatas, ácaros y parásitos internos. Pipetas, collares, tabletas y soluciones inyectables con efectividad comprobada y segura para tu mascota.',
      img: '/img/servicios/Desparasitantes.webp',
      is_active: true,
    },
    {
      title: 'Accesorios',
      description:
        'Gran variedad de accesorios para el cuidado y confort de tu mascota: collares, correas, juguetes, camas, platos, transportadoras, ropa y más. Productos de calidad a precios accesibles para consentir a tu mejor amigo.',
      img: '/img/servicios/Accesorios.webp',
      is_active: true,
    },
  ];

  for (const servicio of servicios) {
    await prisma.service.upsert({
      where: { title: servicio.title },
      update: {
        description: servicio.description,
        img: servicio.img,
        is_active: servicio.is_active,
      },
      create: servicio,
    });
  }

  console.log('Servicios creados exitosamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
