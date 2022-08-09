import React, {useCallback, useMemo} from "react";
import PersonInfo from "./PersonInfo";
import partition from "lodash/partition";
import {Spinner} from "./Spinner";
import {usePeopleInfo} from "./usePeopleInfo";


const MemoizedPersonInfo = React.memo(PersonInfo)

const App = () => {
    const [selected, setSelected] = React.useState(new Set<string>());

    const {peopleInfo, error, isFetching, isFetchingNextPage, fetchNextPage} = usePeopleInfo();

    // Immutable approach is chosen, because of uncertainty if deselecting should move back item down in the list in the same order.
    const [selectedPeopleInfo, unselectedPeopleInfo] = useMemo(() => partition(peopleInfo, ({id}) => selected.has(id)),[peopleInfo, selected]);

    const handleSelect = useCallback((id: string) => {
        setSelected((current) => {
            const newValue = new Set(current);
            if (current.has(id)) {
                newValue.delete(id);
            } else {
                newValue.add(id);
            }
            return newValue;
        })
    }, [setSelected]);

    return (
        <div className="App">
            <div className="selected">Selected contacts: {selected.size}</div>
            <div className="list">
                {/*For further optimizations I would go to window rendered list*/}
                {selectedPeopleInfo.map((personInfo) => (
                    <MemoizedPersonInfo key={personInfo.id} data={personInfo} handleSelect={handleSelect} selected/>
                ))}
                {unselectedPeopleInfo.map((personInfo) => (
                    <MemoizedPersonInfo key={personInfo.id} data={personInfo} handleSelect={handleSelect}/>
                ))}
                {error && <div className="error">Error '{error.message}'. Please retry.</div>}
                <button onClick={() => fetchNextPage()}>Fetch More</button>
            </div>
            {(isFetching || isFetchingNextPage) && <Spinner/>}
        </div>
    );
};

export default App;
