import React, { useContext, useRef } from 'react';
import { patterns } from './Patterns';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';

const SelectPattern = observer(() => {
    const selectRef = useRef(null);
    const { game } = useContext(Context);
    
    const arrange = () => {
        const selectedValue = selectRef.current.value
        let pattern;
        selectedValue === 'random' ? pattern = patterns[selectedValue]() : pattern = patterns[selectedValue];
        game.arrangeShips(pattern);
    }

    return (
        <div>
            <label htmlFor="patterns">Select the pattern:</label>
            <select name='patterns' id="patterns" ref={selectRef}>
                <option value="random">Randomly</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <button onClick={() => arrange()}>Arrange</button>
        </div>
    );
})

export default SelectPattern;
