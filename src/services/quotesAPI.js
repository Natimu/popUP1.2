import {quoteAPI_list} from "../utils/constants";
import bible_verses from "../data/bible_verses.json";

export async function fetchQuotes(type, count){
    let data;
    function getRandomSubset(arr, count) 
    {
            const randomIndexes = new Set();
            while (randomIndexes.size < count)
                 {
                     randomIndexes.add(Math.floor(Math.random() * arr.length));
                }
             return Array.from(randomIndexes).map(i => arr[i]);
    }

    if (type === "BIBLE"){
        data = getRandomSubset(bible_verses, 80);
    }
    else{
        const url = quoteAPI_list[type];
        if (!url) throw new Error(`No API defined for type: ${type}`);
        const response = await fetch(url);
        if (!response.ok) throw new Error ("Network error");
        data = await response.json();
    }
    
  switch (type){
    case "BIBLE":
        return data.map((q, index) => (
            {
                id: q.id ?? index,
                quote: `${q.text}`,
                by: `${q.by}`,
            }));
    case "MOTIVATION":
        return data.map((q, index) => ({
            id: index,
            quote: `${q.q}`,
            by: `${q.a}`,
        }));

    default:
        return data.map((q, index) => ({
            id: index,
            quote: q.text || q.q || q.content || q.quote ||"",
            by: q.by || q.a || q.author ||"",
        }));
  }

}