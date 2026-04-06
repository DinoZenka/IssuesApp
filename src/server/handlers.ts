import 'fast-text-encoding';
import { rest } from 'msw';
import { db } from './db';
import { setupServer } from 'msw/native';

export const handlers = [
  rest.get('*/issues', (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json(db.issue.getAll()));
  }),

  rest.get('*/issues/:id', ({ params }, res, ctx) => {
    const { id } = params;
    const issue = db.issue.findFirst({
      where: { id: { equals: id as string } },
    });

    if (!issue) {
      return res(ctx.status(404));
    }
    return res(ctx.delay(2000), ctx.json(issue));
  }),

  rest.patch('*/issues/:id', async (req, res, ctx) => {
    const { id } = req.params;
    try {
      const updates = await req.json();

      const updatedIssue = db.issue.update({
        where: { id: { equals: id as string } },
        data: {
          ...updates,
          updatedAt: new Date().toISOString(),
        },
      });

      if (!updatedIssue) {
        return res(ctx.status(404), ctx.json({ message: 'Not Found' }));
      }

      return res(ctx.delay(500), ctx.json(updatedIssue));
    } catch (error) {
      return res(ctx.status(500), ctx.json({ error: 'Internal Server Error' }));
    }
  }),
];

export const server = setupServer(...handlers);
