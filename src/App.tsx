import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FixedGrid from './components/FixedGrid';
import Form from './components/Form';
import Header from './components/Header';
import InputFields from './components/InputFields';


const RootWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 70vh;
    padding: 0px 24px;
    @media (max-width: 800px) {
        height: auto;
        flex-direction: column;
        padding-bottom: 48px;
    }
`;

const RootContainer = styled.div`
  width: 75%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 10fr 1fr; /* Adjusted columns */
  grid-template-rows: auto 1fr auto; /* Adjusted rows */

  overflow: auto;
  @media (max-width: 800px) {
    width: 100%;
}
`;

const TopSection = styled.div`
  grid-area: 1 / 2 / 2 / 4; /* Spans the entire width except for side sections */
`;

const SideSection = styled.div`
  grid-area: 2 / 1 / 4 / 2; /* Spans the entire height except for top section */
`;

const CenterSection = styled.div`
  grid-area: 2 / 2 / 4 / 4; /* Center section */
`;

const GridItem = styled.div<{ $isSelected: boolean; $bgColor: string }>`
  min-height: 48px;
  background-color: ${({ $bgColor }) => $bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 0.5px solid black;

  background-image: radial-gradient(#000 20%, transparent 20%),
  radial-gradient(#000 20%, transparent 20%);
  background-size: 5px 5px;            /* Size of the dots */
  background-position: 0 0, 5px 5px; 
`;

const getColor = (num: number) => {
    const hue = (num * 137.508) % 360;
    const saturation = 75;
    const lightness = 85;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

function App() {
    const [columns, setColumns] = useState<number>(3);
    const [rows, setRows] = useState<number>(3);
    const [columngap, setColumnGap] = useState<number>(0);
    const [rowgap, setRowGap] = useState<number>(0);
    const [containers, setContainers] = useState<number>(1);
    const [currentContainer, setCurrentContainer] = useState<number>(1);
    const [selectedGridItems, setSelectedGridItems] = useState<Record<number, number[]>>({});
    const [columnWidth, setColumnWidth] = useState<{ [key: string]: number }>({
        col1: 1,
        col2: 1,
        col3: 1,
    });

    const [rowHeight, setRowHeight] = useState<{ [key: string]: number }>({
        row1: 1,
        row2: 1,
        row3: 1,
    });

    const handleContainersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
            const maxContainers = columns * rows;
            setContainers(value > maxContainers ? maxContainers : value);
        } else {
            setContainers(1);
        }
    };

    const handleColumnChange = (index: number, value: number) => {
        if (isNaN(value)) {
            value = 1;
        }

        setColumnWidth(prevWidths => ({ ...prevWidths, [`col${index + 1}`]: value }));
    };

    const handleRowChange = (index: number, value: number) => {
        if (isNaN(value)) {
            value = 1;
        }

        setRowHeight(prevHeights => ({ ...prevHeights, [`row${index + 1}`]: value }));
    };

    const handleGridItemClick = (index: number) => {
        if (currentContainer !== null) {
            setSelectedGridItems((prevSelected) => {
                const containerItems = prevSelected[currentContainer] || [];
                const newContainerItems = containerItems.includes(index)
                    ? containerItems.filter((item) => item !== index)
                    : [...containerItems, index];
                return {
                    ...prevSelected,
                    [currentContainer]: newContainerItems,
                };
            });
        }
    };

    useEffect(() => {
        const newColumnWidth : { [key: string]: number } = {};

        for (let i = 1; i <= columns; i++) {
            newColumnWidth[`col${i}`] = columnWidth[`col${i}`] || 1;
        }

        setColumnWidth(newColumnWidth);

    }, [columns]);

    useEffect(() => {
        const newRowHeight : { [key: string]: number } = {};

        for (let i = 1; i <= rows; i++) {
            newRowHeight[`row${i}`] = rowHeight[`row${i}`] || 1;
        }
        setRowHeight(newRowHeight);
    }, [rows]);

    const reset = () => {
        setColumns(3);
        setRows(3);
        setColumnGap(0);
        setRowGap(0);
        setContainers(1);
        setCurrentContainer(1);
        setSelectedGridItems({});
        setColumnWidth({
          col1: 1,
          col2: 1,
          col3: 1,
        });
        setRowHeight({
          row1: 1,
          row2: 1,
          row3: 1,
        });
      };

      const getCode = () => {
        const containerHTML = Object.keys(selectedGridItems).map(containerId => {
            return `<div class="container-${containerId}">Container-${containerId}</div>`;
          }).join('\n');
      
          const htmlCode = `
            <div class="grid-container">
              ${containerHTML}
            </div>
          `;

          const gridContainerCssCode = `
          .grid-container {
            display: grid;
            grid-template-columns: ${(() => Object.values(columnWidth).map((value) => `${value}fr`).join(' '))()};
            grid-template-rows: ${(() => Object.values(rowHeight).map((value) => `${value}fr`).join(' '))()};
            grid-column-gap: ${(() => `${columngap}px`)()};
            grid-row-gap: ${(() => `${rowgap}px`)()};
          }
        `;
      
          const gridItemCssCode = Object.entries(selectedGridItems).map(([containerId, items]) => {
            const [startRow, startCol] = [Math.floor(items[0] / columns) + 1, (items[0] % columns) + 1];
            const [endRow, endCol] = [Math.floor(items[items.length - 1] / columns) + 1, (items[items.length - 1] % columns) + 1];
      
            return `
            .container-${containerId} {
              grid-area: ${startRow} / ${startCol} / ${endRow + 1} / ${endCol + 1};
              border: 1px solid black;
            }
          `;
          }).join('\n');

      }

    return (
        <>

            <Header/>

            <RootWrapper>

                <Form setColumns={setColumns} columns={columns} setRows={setRows} rows={rows} setColumnGap={setColumnGap} columngap={columngap} setRowGap={setRowGap} rowgap={rowgap} containers={containers} handleContainersChange={handleContainersChange} setCurrentContainer={setCurrentContainer} reset={reset} getCode={getCode} />

                <RootContainer>

                    <TopSection>

                        <FixedGrid columnWidth={columnWidth} rowHeight={{ row1: 1 }} columngap={columngap} rowgap={rowgap}>

                            <InputFields numberOfFields={columns} val={columnWidth} valPrefix={'col'} handleValChange={handleColumnChange} />

                        </FixedGrid>

                    </TopSection>

                    <SideSection>

                        <FixedGrid columnWidth={{ col1: 1 }} rowHeight={rowHeight} columngap={columngap} rowgap={rowgap}>

                            <InputFields numberOfFields={rows} val={rowHeight} valPrefix={'row'} handleValChange={handleRowChange} />

                        </FixedGrid>

                    </SideSection>

                    <CenterSection>

                        <FixedGrid columnWidth={columnWidth} rowHeight={rowHeight} columngap={columngap} rowgap={rowgap}>

                            {Array.from({ length: columns * rows }).map((_, index) => {
                                const isSelectedByAnyContainer = Object.values(selectedGridItems).some(items => items.includes(index));
                                const isSelectedByCurrentContainer = selectedGridItems[currentContainer]?.includes(index);

                                const bgColor = isSelectedByAnyContainer
                                    ? getColor(
                                        parseInt(
                                            Object.keys(selectedGridItems).find(containerId => selectedGridItems[parseInt(containerId)].includes(index)) ?? '1'
                                        ) - 1
                                    )
                                    : '';

                                const text = isSelectedByAnyContainer
                                    ? `Container ${parseInt(
                                        Object.keys(selectedGridItems).find(containerId => selectedGridItems[parseInt(containerId)].includes(index)) ?? '1'
                                    )
                                    }`
                                    : '';

                                return (
                                    <GridItem
                                        key={index}
                                        $isSelected={isSelectedByCurrentContainer}
                                        $bgColor={bgColor}
                                        onClick={() => {
                                            if (!isSelectedByAnyContainer || isSelectedByCurrentContainer) {
                                                handleGridItemClick(index);
                                            }
                                        }}
                                    >
                                        {text}
                                    </GridItem>
                                );
                            })}

                        </FixedGrid>

                    </CenterSection>

                </RootContainer>

            </RootWrapper>
        </>
    );
}
export default App;
