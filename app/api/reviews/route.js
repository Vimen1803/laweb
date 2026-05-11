import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('labot');
    
    const reviews = await db.collection('reviews').find({}).sort({ timestamp: -1 }).toArray();
    
    let average = 0;
    if (reviews.length > 0) {
      const sum = reviews.reduce((acc, rev) => acc + (rev.stars || 0), 0);
      average = sum / reviews.length;
    }

    return NextResponse.json({ reviews, average, total: reviews.length });
  } catch (err) {
    console.error('Error fetching reviews:', err);
    return NextResponse.json({ error: 'Error al cargar las reseñas' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Debes iniciar sesión para dejar una reseña' }, { status: 401 });
    }

    const { stars, message } = await req.json();

    if (!stars || stars < 1 || stars > 5) {
      return NextResponse.json({ error: 'La valoración debe ser entre 1 y 5 estrellas' }, { status: 400 });
    }

    if (!message || message.trim().length < 5) {
      return NextResponse.json({ error: 'El mensaje debe tener al menos 5 caracteres' }, { status: 400 });
    }

    if (message.length > 500) {
      return NextResponse.json({ error: 'El mensaje no puede superar los 500 caracteres' }, { status: 400 });
    }

    const client = await werewolfClientPromise;
    const db = client.db('labot');

    // Prevent multiple reviews from the same user?
    // User might want to update or leave multiple. I'll allow multiple for now but usually it's one per user.
    // Let's stick to simple: allow multiple or check by discordId.
    const discordId = session.discordId || session.user.id;
    
    // Check if user already reviewed
    const existing = await db.collection('reviews').findOne({ userId: discordId });
    
    if (existing) {
      // Update existing review
      await db.collection('reviews').updateOne(
        { userId: discordId },
        { 
          $set: { 
            stars, 
            message: message.trim(), 
            timestamp: new Date(),
            userName: session.user.name,
            userImage: session.user.image
          } 
        }
      );
      return NextResponse.json({ message: 'Reseña actualizada correctamente' });
    }

    const newReview = {
      userId: discordId,
      userName: session.user.name,
      userImage: session.user.image,
      stars,
      message: message.trim(),
      timestamp: new Date()
    };

    await db.collection('reviews').insertOne(newReview);

    return NextResponse.json({ message: 'Reseña enviada correctamente' }, { status: 201 });
  } catch (err) {
    console.error('Error saving review:', err);
    return NextResponse.json({ error: 'Error al guardar la reseña' }, { status: 500 });
  }
}
