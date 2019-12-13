import React, {
    useContext,
    useEffect,
    useMemo,
    memo,
    useCallback
} from 'react';
import { Button } from 'antd';
import { HookContext, ColorHook, actionType } from './HookContext';

export default function () {
    return (
        <div>
            {
                <ColorHook>
                    <Color />
                </ColorHook>
            }
        </div>
    );
}

function Color() {
    const { state, dispatch } = useContext(HookContext);
    return (
        <div>
            <MemoChildComponent
                color={useMemo(() => ({ color: state.color }), [state.color])}
                onClick={useCallback(() => {
                    dispatch({ type: actionType.up });
                }, [dispatch])}
            />
            <MemoChildComponent
                color={useMemo(() => ({ color: state.color }), [state.color])}
                onClick={useCallback(() => {
                    dispatch({ type: actionType.down });
                }, [dispatch])}
            />
        </div>
    );
}

function ChildComponent(props) {
    const active = (color, onClick) => {
        console.log('render');
        return (
            <div>
                <div>{JSON.stringify(color)}</div>
                <Button onClick={onClick}>改变</Button>
            </div>
        );
    };
    // console.log('ChildComponent render');
    // const changeActive = useMemo(() => active(props.color, props.onClick), [
    //     props.color,
    //     props.onClick
    // ]);
    return (
        <div>
            {/* <div>{changeActive}</div> */}
            {active(props.color, props.onClick)}
            {/* <div>
                <div>{JSON.stringify(props.color)}</div>
                <Button onClick={props.onClick}>改变</Button>
            </div> */}
        </div>
    );
}
const MemoChildComponent = memo(ChildComponent);
