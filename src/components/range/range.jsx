import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';

import './range.scss';

const BALL_SIZE = 15;

const generateRange = (start, stop) => Array.from({ length: (stop - start) + 1 }, (_, i) => start + i);

const rescaleValue = (toRescale, width, setGrid) => {
    let result = toRescale;
    const numOfElements = toRescale.length - 1;
    const percentage = width / (numOfElements / 100);
    result = toRescale.map((value, idx) => ({
        originalValue: value,
        dragValue: Math.round((idx / 100) * percentage),
    }));

    if (numOfElements < width) {
        const grid = width / numOfElements;
        setGrid(grid);
    }

    return result;
};

const Range = ({ width, values }) => {
    const [leftValues, setLeftValues] = useState({
        dragValue: 0,
        originalValue: values.min || values[0],
        input: values.min || values[0],
    });
    const [rightValues, setRightValues] = useState({
        dragValue: width,
        originalValue: values.max || values[values.length - 1],
        input: values.max || values[values.length - 1],
    });
    const [originalAndRescaled, setOriginalAndRescaled] = useState([]);
    const [grid, setGrid] = useState(1);
    const originalArray = values.min && values.max ? generateRange(values.min, values.max) : values.sort((a, b) => a - b);

    const leftOnDrag = (d) => {
        const dragValue = Math.round(d.x);
        if (dragValue !== leftValues.dragValue) {
            if (dragValue === rightValues.dragValue) {
                setLeftValues({ dragValue, originalValue: rightValues.originalValue, input: rightValues.originalValue });
            } else {
                const objectValues = originalAndRescaled.find((x) => x.dragValue === dragValue);
                const originalValue = objectValues ? objectValues.originalValue : leftValues.originalValue;

                setLeftValues({ dragValue, originalValue, input: originalValue });
            }
        }
    };

    const rightOnDrag = (d) => {
        const dragValue = Math.round(d.x + width);
        if (dragValue !== rightValues.dragValue) {
            if (dragValue === width) {
                const originalValue = originalArray[originalArray.length - 1];
                setRightValues({ dragValue, originalValue, input: originalValue });
            } else if (dragValue === leftValues.dragValue) {
                setRightValues({ dragValue, originalValue: leftValues.originalValue, input: leftValues.originalValue });
            } else {
                const objectValues = originalAndRescaled.find((x) => x.dragValue === dragValue);
                const originalValue = objectValues ? objectValues.originalValue : rightValues.originalValue;

                setRightValues({ dragValue, originalValue, input: originalValue });
            }
        }
    };

    const onChangeInput = (e, setMethod) => {
        if (e && e.target && (e.target.value || e.target.value === 0)) {
            const targetValue = parseInt(e.target.value, 10);
            const objectValues = originalAndRescaled.find((x) => x.originalValue === targetValue);
            let dragValue;

            if (objectValues) {
                dragValue = objectValues.dragValue;
                setMethod({ dragValue, originalValue: targetValue, input: targetValue });
            } else {
                setMethod((oldState) => ({
                    dragValue: oldState.dragValue, targetValue: oldState.targetValue, input: targetValue,
                }));
            }
        } else {
            setMethod((oldState) => ({
                dragValue: oldState.dragValue, targetValue: oldState.targetValue, input: '',
            }));
        }
    };

    useEffect(() => {
        setOriginalAndRescaled(rescaleValue(originalArray, width, setGrid));
    }, []);

    return (
        <div className="d-flex align-items-center">
            <div className="input__values">
                <input
                    className={leftValues.originalValue !== leftValues.input ? 'input__red' : ''}
                    type="number"
                    disabled={!!values.length}
                    min={values.min || values[0]}
                    max={rightValues.originalValue}
                    value={leftValues.input}
                    onChange={(e) => onChangeInput(e, setLeftValues)}
                />
            </div>
            <div className="drag__main" style={{ width: `${width}px` }}>
                <Draggable
                    axis="x"
                    grid={[grid]}
                    bounds={{ left: 0, right: rightValues.dragValue }}
                    positionOffset={{ x: -(BALL_SIZE / 2), y: '0%' }}
                    position={{ x: leftValues.dragValue, y: 0 }}
                    onDrag={(_, d) => leftOnDrag(d)}
                >
                    <div focusable className="div-drag__wrapper" style={{ width: `${BALL_SIZE}px`, height: `${BALL_SIZE}px` }}>L</div>
                </Draggable>
                <Draggable
                    axis="x"
                    grid={[grid]}
                    bounds={{ left: -(width - leftValues.dragValue), right: 0 }}
                    positionOffset={{ x: width - (BALL_SIZE / 2), y: '0%' }}
                    position={{ x: rightValues.dragValue - width, y: 0 }}
                    onDrag={(_, d) => rightOnDrag(d)}
                >
                    <div focusable className="div-drag__wrapper" style={{ width: `${BALL_SIZE}px`, height: `${BALL_SIZE}px` }}>R</div>
                </Draggable>
            </div>
            <div className="input__values">
                <input
                    className={rightValues.originalValue !== rightValues.input ? 'input__red' : ''}
                    type="number"
                    disabled={!!values.length}
                    min={leftValues.originalValue}
                    max={values.max || values[values.length - 1]}
                    value={rightValues.input}
                    onChange={(e) => onChangeInput(e, setRightValues)}
                />
            </div>
        </div>
    );
};

export default Range;
