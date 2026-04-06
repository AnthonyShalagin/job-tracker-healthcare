import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { userStatus } = body;

  const validStatuses = ["applied", "interested", "dismissed", null];
  if (!validStatuses.includes(userStatus)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const role = await prisma.role.update({
    where: { id },
    data: {
      userStatus,
      appliedAt: userStatus === "applied" ? new Date() : undefined,
    },
  });

  return NextResponse.json(role);
}
