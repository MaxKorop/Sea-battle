import React, { useContext, useRef } from 'react';
import { patterns } from './Patterns';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';

const SelectPattern = observer(() => {
    const selectRef = useRef(null);
    const { game } = useContext(Context);
    
    const arrange = () => {
        if (!game.shipCoords.length) {
            const selectedValue = selectRef.current.value
            let pattern;
            selectedValue === 'random' ? pattern = patterns[selectedValue]() : pattern = patterns[selectedValue];
            game.arrangeShips(pattern);
        } else {
            game.arrangeShips();
        }
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
            <button
                
                style={{
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    height: 40,
                    borderRadius: 5,
                    width: 100,
                    marginLeft: 10
                }}
                onClick={() => arrange()}
            >
                Arrange ships
            </button>
        </div>
    );
})

export default SelectPattern;
