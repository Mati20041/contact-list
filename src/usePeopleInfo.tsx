import {useInfiniteQuery} from "@tanstack/react-query";
import apiData, {PersonInfoDto} from "./api";
import {useMemo} from "react";

const PERSON_INFO_CACHE_KEY = "PersonInfo";

export const usePeopleInfo = () => {
    const {
        data,
        error,
        isFetching,
        isFetchingNextPage,
        fetchNextPage
    } = useInfiniteQuery<PersonInfoDto[], Error>([PERSON_INFO_CACHE_KEY], apiData, {
        getNextPageParam: () => null,
        onError: (error) => {
            console.log(error);
        }
    });
    const peopleInfo = useMemo(() => data?.pages?.flat() ?? [], [data?.pages]);
    return {peopleInfo, error, isFetching, isFetchingNextPage, fetchNextPage};
};
