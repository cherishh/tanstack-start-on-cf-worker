import { db } from './index';
import { usersTable, postsTable } from './schema/test-schema';
import { eq } from 'drizzle-orm';

async function seed() {
  try {
    // 清空现有数据
    await db.delete(postsTable);
    await db.delete(usersTable);

    // 插入用户数据
    const [user1, user2] = await db
      .insert(usersTable)
      .values([
        {
          name: '张三',
          age: 28,
          email: 'zhangsan@example.com',
        },
        {
          name: '李四',
          age: 35,
          email: 'lisi@example.com',
        },
      ])
      .returning();

    console.log('已创建用户:', user1, user2);

    // 插入文章数据
    const [post1, post2, post3] = await db
      .insert(postsTable)
      .values([
        {
          title: '云原生应用开发指南',
          content: '这是一篇关于在Cloudflare Workers上开发应用的教程...',
          userId: user1.id,
        },
        {
          title: 'TanStack Query使用心得',
          content: '在使用TanStack Query过程中的一些经验分享...',
          userId: user1.id,
        },
        {
          title: 'Drizzle ORM与PostgreSQL结合使用',
          content: '如何在项目中有效地使用Drizzle ORM操作PostgreSQL数据库...',
          userId: user2.id,
        },
      ])
      .returning();

    console.log('已创建文章:', post1, post2, post3);
    console.log('数据库种子数据已成功插入！');
  } catch (error) {
    console.error('插入种子数据时出错:', error);
    throw error;
  }
}

// 执行种子函数
seed()
  .then(() => {
    console.log('种子数据插入完成，程序将退出');
    process.exit(0);
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
