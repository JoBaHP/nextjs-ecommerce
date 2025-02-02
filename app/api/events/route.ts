import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/db/prisma';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const productId = url.searchParams.get('productId');

    if (!productId) {
      return new NextResponse('Missing productId', { status: 400 });
    }

    // Get live views
    const liveViews = await prisma.productView.count({
      where: { productId },
    });

    // Get recent purchases (last 10 minutes)
    const TEN_MINUTES_AGO = new Date(Date.now() - 10 * 60 * 1000);
    const recentPurchases = await prisma.order.count({
      where: {
        productId,
        createdAt: { gte: TEN_MINUTES_AGO },
      },
    });

    // Ensure the response is always an object
    const payload = { liveViews: liveViews ?? 0, recentPurchases: recentPurchases ?? 0 };

    // Send event stream response
    const stream = new ReadableStream({
      start(controller) {
        const interval = setInterval(async () => {
          try {
            controller.enqueue(`data: ${JSON.stringify(payload)}\n\n`);
          } catch (error) {
            console.error('Error sending SSE data:', error);
          }
        }, 5000); // Send update every 5 seconds

        req.signal.addEventListener('abort', () => {
          clearInterval(interval);
          controller.close();
        });
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in SSE endpoint:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
