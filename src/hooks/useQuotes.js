import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchQuotes } from "../services/quotesAPI";
const seenIdsByType ={};

export default function useQuotes(type){
  if(!seenIdsByType[type]) seenIdsByType[type]= new Set();

  return useInfiniteQuery({
    queryKey: ["quotes", type],
    queryFn: async ({pageParam = 0}) =>{
      let newQuotes = await fetchQuotes(type, 50);
      const seen = seenIdsByType[type];

      newQuotes = newQuotes.filter(q => !seen.has(q.id));
      newQuotes.forEach(q => seen.add(q.id));
      
        return newQuotes;
      },
      getNextPageParam: (lastPage, allPages) => allPages.length,
  });
    
}
 
