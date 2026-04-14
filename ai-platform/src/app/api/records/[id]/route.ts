import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// GET /api/records/:id
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session || !session.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const record = await prisma.record.findUnique({ where: { id: parseInt(id) } });
    if (!record || record.userId !== session.user.id) {
        return NextResponse.json({ error: '레코드를 찾을 수 없습니다' }, { status: 404 });
    }
    return NextResponse.json(record);
}

// PUT /api/records/:id
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session || !session.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const { title, inputData, outputData, memo } = body;

    const data: Record<string, unknown> = {};
    if (title !== undefined) data.title = title;
    if (inputData !== undefined) data.inputData = typeof inputData === 'string' ? inputData : JSON.stringify(inputData);
    if (outputData !== undefined) data.outputData = typeof outputData === 'string' ? outputData : JSON.stringify(outputData);
    if (memo !== undefined) data.memo = memo;

    try {
        const record = await prisma.record.update({
            where: { id: parseInt(id), userId: session.user.id },
            data,
        });
        return NextResponse.json(record);
    } catch {
        return NextResponse.json({ error: '레코드를 찾을 수 없습니다' }, { status: 404 });
    }
}

// DELETE /api/records/:id
export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session || !session.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    try {
        await prisma.record.delete({ where: { id: parseInt(id), userId: session.user.id } });
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: '레코드를 찾을 수 없습니다' }, { status: 404 });
    }
}
