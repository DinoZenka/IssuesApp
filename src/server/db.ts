import { factory, primaryKey } from '@mswjs/data';
import { faker } from '@faker-js/faker';

faker.seed(123); // generate the same data every time

export const db = factory({
  issue: {
    id: primaryKey(faker.string.uuid),
    title: String,
    status: String, // 'open' | 'closed'
    priority: String, // 'low' | 'medium' | 'high'
    updatedAt: String,
  },
});

for (let i = 0; i < 100; i++) {
  db.issue.create({
    title: faker.git.commitMessage(),
    status: faker.helpers.arrayElement(['open', 'closed']),
    priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
    updatedAt: faker.date.recent().toLocaleString(),
  });
}
