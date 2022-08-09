import React, {useMemo} from "react";
import apiData, {PersonInfoDto} from "./api";
import PersonInfo from "./PersonInfo";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";

const App = () => {
    const [selected, setSelected] = React.useState([]);

    const {
        data,
        error,
        isFetching,
        isFetchingNextPage,
        fetchNextPage
    } = useInfiniteQuery<PersonInfoDto[], Error>(["PersonInfo"], apiData, {
        getNextPageParam: () => null,
    });

    const personInfos = useMemo(() => data?.pages?.flat() ?? [], [data?.pages])

    if (isFetching || isFetchingNextPage) {
    }

    if (error) {
        return <div>Error {error.message}</div>
    }

    return (
        <div className="App">
            <div className="selected">Selected contacts: {selected.length}</div>
            <div className="list">
                {personInfos.map((personInfo) => (
                    <PersonInfo key={personInfo.id} data={personInfo}/>
                ))}
                <button onClick={ () => fetchNextPage()}>Fetch More</button>
            </div>
            {(isFetching || isFetchingNextPage) && <div className="spinner">Spinner</div>}
        </div>
    );
};

export default App;
