import { useEffect } from "react";
import { useDebounce } from "./useDebounce"

export const useSurvey = (query: string, searchCallback: () => void) => {
  
    const update = useDebounce(query, 500);
    useEffect(( ) => {
        searchCallback()
    }, [update]);


}
