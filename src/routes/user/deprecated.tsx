import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { BASE_URL } from '@/utils/base-url';

const getCountServerFn = createServerFn({ method: 'GET' }).handler(async () => {
  const res = await fetch(`${BASE_URL}/api/test`);
  if (!res.ok) {
    throw new Error(`api/test failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
});

export const Route = createFileRoute('/user/deprecated')({
  loader: async ({ context }) => {
    /**
     * NOTE: 在Loader里面使用Fetch请求一个自己后段的接口 非常合理并且常见的一个场景。
     * 但实际测试会发现 本地开发的时候是完全OK的 但是build之后 在production环境 这个fetch请求会出错 并且也没有办法找出它具体的错误是什么
     * 稍微改一下 不要从loader里面直接 请求fetch 而是把它包装成一个Server fn 也就是在loader里面使用server action，server fn 再 fetch 自己的后端。结果仍然是不 work，并且明确有 serverFn internal error 的报错。
     * 这个问题大概率是跟Cloudflare平台有关系 因为在本地开发的时候是完全OK的 。
     * 可以work around 在前端直接用fetch请求后端
     * 但体验会降级 因为用户可以看到一个闪烁或者一个loading
     */
    // const count = await fetch(`${BASE_URL}/api/test`)
    //   .then(async res => {
    //     if (!res.ok) {
    //       let errorDetail;
    //       try {
    //         errorDetail = await res.json();
    //       } catch {
    //         errorDetail = await res.text();
    //       }
    //       throw new Error(`api/test failed: ${res.status} ${res.statusText} - ${JSON.stringify(errorDetail)}`);
    //     }
    //     return res;
    //   })
    //   .then(res => res.json())
    //   .catch(err => {
    //     console.error(err);
    //     console.error(`request url was ${BASE_URL}/api/test`);
    //     return err;
    //   });

    const count = await getCountServerFn();

    return { count };
  },
  component: RouteComponent,
  errorComponent: () => <div>error</div>,
});

function RouteComponent() {
  const { count } = Route.useLoaderData();

  return (
    <div>
      <h2>
        <pre>{JSON.stringify(count, null, 2)}</pre>
      </h2>
    </div>
  );
}
