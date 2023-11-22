// 'use client';

// import { getEventAllApi } from '@/api/events';
// import { useInfiniteQuery } from '@tanstack/react-query';
// import React, { useEffect } from 'react'
// import { useInView } from "react-intersection-observer";
// import Card from '../item/Card';
// import Spinner from '../spinner/Spinner';

// type ListType = {
//   category: string;
//   type?: string;
//   className?: string;
// }

// const List = ({ category, type, className }: ListType) => {
//   const [ref, isView] = useInView();
//   // 받은 카테고리가 있다면 카테고리. 없다면 전체

//   const {
//     data,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetching,
//     isFetchingNextPage,
//     status,
//   } = useInfiniteQuery({
//     queryKey: ['event-all-list'],
//     queryFn: ({ pageParam }) => getEventAllApi(category, pageParam),
//     initialPageParam: 0,
//     getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
//     // { return allPages.length + 1 }
//     {
//       const { next }: any = lastPage;
//       if (!next) return undefined;
//       return Number(new URL(next).searchParams.get("offset"));
//     }
//   })

//   // 무한 스크롤
//   useEffect(() => {
//     if (isView && hasNextPage) fetchNextPage();
//   }, [isView]);

//   // console.log('data', data, status);
//   // const listData =  data?.pages[0]

//   return (
//     <div className={className}>
//       {!category && (
//         <>
//           {status === "pending" && (
//             <div>
//               <Spinner/>
//             </div>
//           )}
//           {status === "success" && (
//             <div className="grid grid-cols-6 gap-x-16 gap-y-36 place-items-center mt-60">
//               {data.pages[0].data.content.map((item: any, index: any) => (
//                 <Card key={index} data={item} type={type}/>
//               ))}
//               <div ref={ref} />
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   )
// }

// export default List;
