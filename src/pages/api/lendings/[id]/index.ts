import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { lendingValidationSchema } from 'validationSchema/lendings';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.lending
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getLendingById();
    case 'PUT':
      return updateLendingById();
    case 'DELETE':
      return deleteLendingById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getLendingById() {
    const data = await prisma.lending.findFirst(convertQueryToPrismaUtil(req.query, 'lending'));
    return res.status(200).json(data);
  }

  async function updateLendingById() {
    await lendingValidationSchema.validate(req.body);
    const data = await prisma.lending.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteLendingById() {
    const data = await prisma.lending.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
