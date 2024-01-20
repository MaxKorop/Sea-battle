import React, { useContext } from 'react';
import Cell from '../Cell/Cell';
import SelectPattern from '../Patterns/SelectPattern';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import './mapStyles.css'

const EnemyMap = observer(() => {
  const { game } = useContext(Context);
  const cells = Array.from({ length: 100 }, (_, i) => {
    let x = (i % 10) + 1;
    let y = Math.floor(i / 10) + 1;
    return <Cell key={i} isEnemy={true} x={x} y={y} isShip={game.enemyIncludes([x,y])} />
  });

  return (
    <div className='map-wrapper'>
      <div className='map'>
        {cells}
      </div>
      {!game.gameStarted && <SelectPattern isEnemyMap={true} />}
    </div>
  );
})

export default EnemyMap;
