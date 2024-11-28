"use client";
import { useGameStore, GameState } from '../store/gameStore';
interface TrendChartProps {  
    showTrendChart: (bShow: boolean) => void; // Specifies that toggleMoneyPanel is a function returning void  
}  

const a: number[] = [1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 2.53, 4.30, 4.30, 4.30, 4.30, 4.30, 4.30, 1.45, 11.2, 1.5, 1.8, 0.95, 3.20, 1.01, 1.1, 12, 2.5, 1.01, 5.5, 10.5, 2.1, 1.1];  
function getClass(value: number): string {  
    if (value > 10) return 'moon-bg-btn';  
    else if (value > 2) return 'bg-success';  
    return 'bg-warning';  
}   
function getClassName(value:number): number {
  if(value > 2) return 1;
  return 0;
}

export const TrendChart: React.FC<TrendChartProps> = ({ showTrendChart }) => {  
  const crashes = useGameStore((gameState) => gameState.crashes);

	const rows = 32;  
  const cols = 6;  
  let grid = Array.from({ length: cols }, () => Array(rows).fill('bg-layer5'));  
  let newgrid = Array.from({ length: cols }, () => Array(rows).fill('bg-layer5')); // only need 14 columns in newgrid  
  let x = 0, y = 0;  
  let currentType = (crashes.length == 0) ? 0 : getClassName((Number)(crashes[0].multiplier));  
  let lastX = 0;  

  for (const value of crashes) {  
      const valueClass = getClass((Number)(value.multiplier));  
      const typeClass = getClassName((Number)(value.multiplier));  

      if (typeClass === currentType) {  
          if (y < cols && grid[y][x] === 'bg-layer5') {  
              grid[y][x] = valueClass;  
              if (x > lastX) {  
                  lastX = x;  
              }  
              y++;  
          } else {  
              x++;  
              if (x < rows) {  
                  let tmpy = Math.max(y - 1, 0); // prevent negative index  
                  grid[tmpy][x] = valueClass;  
                  if (x > lastX) {  
                      lastX = x;  
                  }  
              }  
          }  
      } else {  
          // Finding next available position in the first row  
          let foundNewX = false;  
          for (let i = 1; i < 14; i++) {  
              if (grid[0][i] === 'bg-layer5') {  
                  x = i;  
                  foundNewX = true;  
                  break;  
              }  
          }  
          // If no position was found in the first row  
          if (!foundNewX) {  
              x++;  
          }  
          if (x < rows) {  
              y = 0;  
              grid[y][x] = valueClass;  
              currentType = typeClass;  
              if (x > lastX) {  
                  lastX = x;  
              }  
              y++;  
          }  
      }  
      if (x >= rows) break; // Prevent exceeding the grid's column limit  
  }  

  const displayStartCol = Math.max(0, lastX - 13); // Ensure positive index  
  for (let i = 0; i < cols; i++) {  
      for (let j = 0; j < 14; j++) {  
          if (displayStartCol + j < rows) { // Only assign if within the bounds  
              newgrid[i][j] = grid[i][displayStartCol + j];  
          }  
      }  
  }  

	return (
		<div className="absolute z-[1009] w-[18.6rem] h-auto rounded-xl bg-layer2 neodrag"
			style={{transform: "translate3d(0px, 0px, 0px)", touchAction: "none", boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 24px", top: "40px", right: "30px", zIndex:9999}}>
			<div className="flex justify-between items-center relative py-2 text-center font-semibold"><span
				className="text-sm font-bold flex-1 user-select-none">Trend</span><button className="button button-m absolute right-0"
				type="button" onClick={()=>showTrendChart(false)}><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none"
					className="size-4 text-secondary">
					<path fill="currentColor"
					d="m6.323 9.23 6.77 6.77-6.77 6.77 2.908 2.907L16 18.907l6.77 6.77 2.907-2.907-6.77-6.77 6.77-6.77-2.907-2.906L16 13.093l-6.77-6.77z">
					</path>
				</svg></button></div>
			<style>
				
			</style>
			<div className="dots-wrap overflow-x-auto mx-2 scrollbar-hide">
        <div className="grid gap-[0.13rem] mb-2 w-[600px]" style={{gridTemplateColumns: "repeat(32, 1fr)"}}>
        {
          newgrid.map((row,xx)=>(
            row.map((name, yy)=>{
              return <div key={`${xx}+${yy}`} className=" h-[1.125rem] w-[1.125rem] rounded-md relative bg-layer5">
                <div className={`absolute left-[20%] top-[20%] w-[60%] h-[60%] rounded-full ${name}`}></div>
            </div>
            })
          ))
        }
        </div>
      </div>
		</div>
	)
}
