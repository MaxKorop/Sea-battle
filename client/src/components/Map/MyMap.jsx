import React, { useContext, useState } from 'react';
import Cell from '../Cell/Cell';
import SelectPattern from '../Patterns/SelectPattern';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import './mapStyles.css';
import { patterns } from '../Patterns/Patterns';

const MyMap = observer(() => {
  const { game } = useContext(Context);

  // Створюємо клітинки для гри
  const cells = Array.from({ length: 100 }, (_, i) => {
    let x = (i % 10) + 1;
    let y = Math.floor(i / 10) + 1;
    return (
      <Cell
        key={i}
        x={x}
        y={y}
        isShip={game.includes([x, y])}
        isSunken={game.mySunkenIncludes([x, y])}
        isMiss={game.enemyMissesIncludes([x, y])}
        onClick={() => handleCellClick(x, y)} // Додаємо обробник кліків
      />
    );
  });

  const [isPlacingShip, setIsPlacingShip] = useState(false);
  const [selectedShipType, setSelectedShipType] = useState(null); // Відстежуємо обраний корабель
  const [shipOrientation, setShipOrientation] = useState('horizontal'); // Початкова орієнтація

  const handleCellClick = (x, y) => {
    if (isPlacingShip) {
      // Перевіряємо, чи дійсне розташування для обраного корабля та орієнтації
      if (game.canPlaceShip([x, y], selectedShipType, shipOrientation)) {
        game.placeShip([x, y], selectedShipType, shipOrientation);
        setIsPlacingShip(false);
        setSelectedShipType(null);
      } else {
        // Показуємо повідомлення про помилку або підсвічуємо недійсні клітинки
      }
    }
  };

  const handleSelectShip = (type) => {
    setSelectedShipType(type);
    setIsPlacingShip(true);
  };

  const handleToggleOrientation = () => {
    setShipOrientation(shipOrientation === 'horizontal' ? 'vertical' : 'horizontal');
  };

  return (
    <div className='map-wrapper'>
      <div className='map'>
        {cells}
        {isPlacingShip && (
          <div className='ship-placement'>
            <button onClick={() => handleSelectShip('1')}>1-палубний</button>
            <button onClick={() => handleSelectShip('2')}>2-палубний</button>
            <button onClick={() => handleSelectShip('3')}>3-палубний</button>
            <button onClick={() => handleSelectShip('4')}>4-палубний</button>
            <button onClick={handleToggleOrientation}>
              Повернути ({shipOrientation})
            </button>
          </div>
        )}
      </div>
      {!game.gameStarted && (
        <SelectPattern patterns={patterns} game={game} />
      )}
    </div>
  );
});

export default MyMap;
