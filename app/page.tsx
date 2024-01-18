import Image from 'next/image'
import {
  TvInfo,
} from '@/app/lib/definitions';
import { formatCurrency,dateFormat } from '@/app/lib/utils';
import { getTvInfo, getTvInfoCount } from '@/app/lib/data';
import Pagination from '@/app/ui/pagination';

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const ITEMS_PER_PAGE = 20;
  const currentPage = Number(searchParams?.page) || 1;
  let cnt = await getTvInfoCount();
  let totalPage = Math.ceil(cnt / ITEMS_PER_PAGE)
  let infos  = await getTvInfo(currentPage, ITEMS_PER_PAGE);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 py-10">
      <div className="">
            {infos?.map((info) => (
              <div
                key={info.id}
                className="mb-2 w-full rounded-md bg-white p-4 flex-row"
              >
              <div className="">{info.content}</div>
              <div className="flex flex-row border-t-2 mt-4">
                <div className="basis-1/4 p-2">{info.author}</div>
                <div className="basis-1/4 p-2">{dateFormat(info.create_time)}</div>
              </div>
              </div>))
            }
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPage} />
      </div>
    </main>
  )
}
