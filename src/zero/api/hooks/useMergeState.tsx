import React, { useState } from "react";
/* 自定义合并依赖项 */
export const useMergeState = (initialState: any) => {
    const [state, setState] = useState(initialState);
    const setMergeState = (newState: any) => setState((prevState: any) => ({
        ...prevState, ...newState
    }));
    return [state, setMergeState];
}