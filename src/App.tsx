import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function App() {
  return (
    <>
      <GridPlanner />
    </>
  );
}

export default App;

const InputWrapper = styled.div`
  width: 50%;
`;

const Fieldset = styled.fieldset`
  width: 100%;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label``;

const InputField = styled.input`
  width: 40%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SelectField = styled.select`
  padding: 0.75rem;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: border-color 0.3s;
  width: 43%;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const GridInputFieldWrapper = styled.div`
height: 68px;
text-align: center;
display: flex;
align-items: center;
justify-content: center;
`;

const GridInputField = styled.input<{ $size }>`
  max-width: ${({ $size }) => `${$size}px`};
  height: 12px;
  border: 1px solid #ccc;
  transition: border-color 0.3s;
  padding: 8px;


  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SubmitButton = styled.input`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const GridContainerWrapper = styled.div<{ $rows: number; $columns: number; $columngap: number; $rowgap: number }>`
  display: grid;
  grid-template-columns: ${({ $columns }) => `repeat(${$columns}, 1fr)`};
  grid-template-rows: ${({ $rows }) => `repeat(${$rows}, 1fr)`};
  grid-column-gap: ${({ $columngap }) => `${$columngap}px`};
  grid-row-gap: ${({ $rowgap }) => `${$rowgap}px`};
`;

const GridContainer = styled.div<{
  $columnWidth: { [key: string]: number };
  $rowHeight: { [key: string]: number };
  $columngap: number;
  $rowgap: number;
}>`
  display: grid;
  grid-template-columns: ${({ $columnWidth }) =>
    Object.values($columnWidth)
      .map((value) => `${value}fr`)
      .join(' ')};
  grid-template-rows: ${({ $rowHeight }) =>
    Object.values($rowHeight)
      .map((value) => `${value}fr`)
      .join(' ')};
  grid-column-gap: ${({ $columngap }) => `${$columngap}px`};
  grid-row-gap: ${({ $rowgap }) => `${$rowgap}px`};


`;

const GridItem = styled.div<{ $isSelected: boolean; $bgColor: string }>`
  position: relative;
  height: 68px;
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

const TopSection = styled.div`
  grid-area: 1 / 2 / 2 / 11;
`;

const SideSection = styled.div`
  grid-area: 2 / 1 / 11 / 2;
`;

const CenterSection = styled.div`
  grid-area: 2 / 2 / 11 / 11;
`;

const GridPlanner: React.FC = () => {
  const [columns, setColumns] = useState<number>(3);
  const [rows, setRows] = useState<number>(3);
  const [columngap, setColumnGap] = useState<number>(10);
  const [rowgap, setRowGap] = useState<number>(10);

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

  const [containers, setContainers] = useState<number>(1);
  const [selectedGridItems, setSelectedGridItems] = useState<Record<number, number[]>>({});

  const [currentContainer, setCurrentContainer] = useState<number>(1);

  // console.log("---------------------------------------");
  // console.log("Number of columns (columns)", columns);
  // console.log("Number of rows (rows)", rows);
  // console.log("Column gap (columngap)", columngap);
  // console.log("Row gap (rowgap)", rowgap);
  // console.log("Each column width (columnWidth)", columnWidth);
  // console.log("Each row height (rowHeight)", rowHeight);
  // console.log("Number of container (containers)", containers);
  // console.log("Each container span (selectedGridItems)", selectedGridItems);
  // console.log("---------------------------------------");


  const generateGridCSS = () => {

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

    return gridContainerCssCode + gridItemCssCode;
  }

  const getLightColor = (num) => {
    // Generate a random color using HSL (Hue, Saturation, Lightness)
    const hue = (num * 137.508) % 360; // Use the golden angle approximation to distribute colors evenly
    const saturation = 75; // Fixed saturation for light colors
    const lightness = 85; // Fixed lightness for light colors
  
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const generateGridHTML = () => {
    const containerHTML = Object.keys(selectedGridItems).map(containerId => {
      return `<div class="container-${containerId}">Container-${containerId}</div>`;
    }).join('\n');

    const htmlCode = `
      <div class="grid-container">
        ${containerHTML}
      </div>
    `;

    return htmlCode;
  };


  console.log(generateGridHTML());
  console.log(generateGridCSS());

  useEffect(() => {
    const newColumnWidth = {};

    for (let i = 1; i <= columns; i++) {
      newColumnWidth[`col${i}`] = columnWidth[`col${i}`] || 1;
    }

    setColumnWidth(newColumnWidth);

  }, [columns]);

  useEffect(() => {
    const newRowHeight = {};

    for (let i = 1; i <= rows; i++) {
      newRowHeight[`row${i}`] = rowHeight[`row${i}`] || 1;
    }
    setRowHeight(newRowHeight);
  }, [rows]);


  const handleColumnChange = (index: number, value: number) => {
    if (isNaN(value)) {
      value = 1; // Default value if input is invalid
    }

    setColumnWidth(prevWidths => ({ ...prevWidths, [`col${index + 1}`]: value }));
  };

  const handleRowChange = (index: number, value: number) => {
    if (isNaN(value)) {
      value = 1; // Default value if input is invalid
    }

    setRowHeight(prevHeights => ({ ...prevHeights, [`row${index + 1}`]: value }));
  };

  const handleContainersChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      const maxContainers = columns * rows;
      setContainers(value > maxContainers ? maxContainers : value);
    } else {
      setContainers(1);
    }
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

  return (
    <>
      <InputWrapper>
        <Fieldset>
          <Label>Columns:</Label>
          <InputField
            type="number"
            name="n_columns"
            min="1"
            onChange={(e) => setColumns(parseInt(e.target.value, 10))}
            value={columns}
          />
        </Fieldset>
        <Fieldset>
          <Label>Rows:</Label>
          <InputField
            type="number"
            name="n_rows"
            min="1"
            onChange={(e) => setRows(parseInt(e.target.value, 10))}
            value={rows}
          />
        </Fieldset>
        <Fieldset>
          <Label>Column gap (px):</Label>
          <InputField
            type="number"
            name="n_column_gap"
            min="0"
            onChange={(e) => setColumnGap(parseInt(e.target.value, 10))}
            value={columngap}
          />
        </Fieldset>
        <Fieldset>
          <Label>Row gap (px):</Label>
          <InputField
            type="number"
            name="n_row_gap"
            min="0"
            onChange={(e) => setRowGap(parseInt(e.target.value, 10))}
            value={rowgap}
          />
        </Fieldset>

        <Fieldset>
          <Label>Number of Containers:</Label>
          <InputField
            type="number"
            name="n_containers"
            min="1"
            max={columns * rows}
            value={containers}
            onChange={handleContainersChange}
          />
        </Fieldset>

        <Fieldset>
          <Label>Select Container:</Label>
          <SelectField onChange={(e) => setCurrentContainer(parseInt(e.target.value, 10))}>
            {Array.from({ length: containers }).map((_, index) => (
              <option key={index} value={index + 1}>{`Container ${index + 1}`}</option>
            ))}
          </SelectField>
        </Fieldset>

      </InputWrapper>

      <br /><br /><br /><br /><br />

      <GridContainerWrapper $rows={10} $columns={10} $columngap={20} $rowgap={20}>
        <TopSection>
          <GridContainer
            $columnWidth={columnWidth}
            $rowHeight={{ row1: 1 }}
            $columngap={columngap}
            $rowgap={rowgap}
          >
            {Array.from({ length: columns }).map((_, index) => (
              <GridInputFieldWrapper key={index}>
              <GridInputField
                $size={(100 / columns)}
                type="number"
                min={1}
                value={columnWidth[`col${index + 1}`] ?? 1}
                
                onChange={(e) => handleColumnChange(index, parseInt(e.target.value, 10))}
              />
              </GridInputFieldWrapper>
            ))}
          </GridContainer>
        </TopSection>

        <SideSection>
          <GridContainer
            $columnWidth={{ col1: 1 }}
            $rowHeight={rowHeight}
            $columngap={columngap}
            $rowgap={rowgap}
          >
            {Array.from({ length: rows }).map((_, index) => (
              <GridInputFieldWrapper key={index}>
                <GridInputField
                  $size={(100 / rows)}
                  type="number"
                  min={1}
                  value={rowHeight[`row${index + 1}`] ?? 1}

                  onChange={(e) => handleRowChange(index, parseInt(e.target.value, 10))}
                />
              </GridInputFieldWrapper>
            ))}
          </GridContainer>
        </SideSection>

        <CenterSection>
          <GridContainer
            $columnWidth={columnWidth}
            $rowHeight={rowHeight}
            $columngap={columngap}
            $rowgap={rowgap}
          >
            {Array.from({ length: columns * rows }).map((_, index) => {
              const isSelectedByAnyContainer = Object.values(selectedGridItems).some(items => items.includes(index));
              const isSelectedByCurrentContainer = selectedGridItems[currentContainer]?.includes(index);

              const bgColor = isSelectedByAnyContainer
                ? getLightColor(
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
          </GridContainer>
        </CenterSection>

      </GridContainerWrapper>
    </>
  );
};
