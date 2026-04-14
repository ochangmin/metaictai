import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// GET /api/records?moduleId=xxx&moduleType=xxx&page=1&limit=20&search=xxx
export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const moduleId = searchParams.get('moduleId');
    const moduleType = searchParams.get('moduleType');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {
        userId: session.user.id
    };
    if (moduleId) where.moduleId = moduleId;
    if (moduleType) where.moduleType = moduleType;
    if (search) {
        where.OR = [
            { title: { contains: search } },
            { memo: { contains: search } },
        ];
    }

    const [records, total] = await Promise.all([
        prisma.record.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
        }),
        prisma.record.count({ where }),
    ]);

    return NextResponse.json({
        records,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    });
}

// POST /api/records
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: 'Unauthorized. Please login to save records.' }, { status: 401 });
    }

    const body = await req.json();
    const { moduleId, moduleType, title, inputData, outputData, memo } = body;

    if (!moduleId || !moduleType || !title) {
        return NextResponse.json(
            { error: '필수 필드가 누락되었습니다: moduleId, moduleType, title' },
            { status: 400 }
        );
    }

    const record = await prisma.record.create({
        data: {
            moduleId,
            moduleType,
            title,
            inputData: typeof inputData === 'string' ? inputData : JSON.stringify(inputData),
            outputData: typeof outputData === 'string' ? outputData : JSON.stringify(outputData),
            memo: memo || '',
        },
    });

    return NextResponse.json(record, { status: 201 });
}
