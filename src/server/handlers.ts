import { rest } from 'msw';
import { db } from './db';
import { setupServer } from 'msw/native';

export const handlers = [
  rest.get('*/issues', (req, res, ctx) => {
    return res(ctx.json(db.issue.getAll()));
  }),

  rest.get('*/issues/:id', ({ params }, res, ctx) => {
    const { id } = params;
    const issue = db.issue.findFirst({
      where: { id: { equals: id as string } },
    });

    if (!issue) {
      return res(ctx.status(404));
    }
    return res(ctx.json(issue));
  }),

  rest.patch('*/issues/:id', (req, res, ctx) => {
    const { id } = req.params;
    const updates = req.body;

    const updatedIssue = db.issue.update({
      where: { id: { equals: id as string } },
      data: {
        ...(updates as Record<string, unknown>),
        updatedAt: new Date().toLocaleString(),
      },
    });

    return res(ctx.json(updatedIssue));
  }),
];

export const server = setupServer(...handlers);
