import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/db/prisma';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params; // ✅ Await params before using it
  const ip = req.headers.get('x-forwarded-for') || 'unknown'; // Track users by IP

  try {
    // Find the product ID
    const product = await prisma.product.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Remove old views (older than 10 minutes)
    const TEN_MINUTES_AGO = new Date(Date.now() - 10 * 60 * 1000);
    await prisma.productView.deleteMany({
      where: {
        productId: product.id,
        viewedAt: { lt: TEN_MINUTES_AGO },
      },
    });

    // Check if this user has already viewed
    const existingView = await prisma.productView.findFirst({
      where: { productId: product.id, userIp: ip },
    });

    if (!existingView) {
      await prisma.productView.create({
        data: { productId: product.id, userIp: ip },
      });
    }

    // Get the total live views
    const liveViews = await prisma.productView.count({
      where: { productId: product.id },
    });

    return NextResponse.json({ liveViews });
  } catch (error) {
    console.error('Error updating view count:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
