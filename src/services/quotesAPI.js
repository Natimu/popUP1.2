import {quoteAPI_list} from "../utils/constants";
import bible_verses from "../data/bible_verses.json";
import love_quotes from "../data/love_quotes.json";
import inspirational_quotes from "../data/inspirational_quotes.json";
import hope_quotes from "../data/hope_quotes.json"
import peace_quotes from "../data/peace_quotes.json"
import truth_quotes from "../data/truth_quotes.json"

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
        data = getRandomSubset(bible_verses,100);
    }
    else if (type === "LOVE"){
        data = getRandomSubset(love_quotes, 100);
    }
    else if (type === "INSPIRATIONAL"){
        data = getRandomSubset(inspirational_quotes, 100);
    }
    else if (type === "TRUTH"){
        data = getRandomSubset(truth_quotes, 100);
    }
    else if (type === "HOPE"){
        data = getRandomSubset(hope_quotes, 100);
    }
    else if (type === "PEACE"){
        data = getRandomSubset(peace_quotes, 100);
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
                by: `${q.reference}`,
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