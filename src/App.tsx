import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function App() {

  return (
    <>
      <GridPlanner />
    </>
  )
}

export default App;

const InputWrapper = styled.div`
  width: 50%;
`;

const Fieldset = styled.fieldset`
  width: 100%;
  border : none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
`;

const InputField = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const GridInputField = styled.input<{ $size }>`
min-width: ${({ $size }) => `${$size}px`};
border: 1px solid #ccc;
border-radius: 4px;
font-size: 1rem;
transition: border-color 0.3s;

&:focus {
  border-color: #007bff;
  outline: none;
}`;

const SubmitButton = styled.input`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const GridContainerWrapper = styled.div<{ $rows: number; $columns: number, $columngap: number, $rowgap: number }>`
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
      .map(value => `${value}fr`)
      .join(' ')};
  grid-template-rows: ${({ $rowHeight }) =>
    Object.values($rowHeight)
      .map(value => `${value}fr`)
      .join(' ')};
  grid-column-gap: ${({ $columngap }) => `${$columngap}px`};
  grid-row-gap: ${({ $rowgap }) => `${$rowgap}px`};
`;

const GridItem = styled.div`
  padding: 12px;
  background-color: lightpink;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TopSection = styled.div`
grid-area: 1 / 2 / 2 / 21;
`;

const SideSection = styled.div`
grid-area: 2 / 1 / 21 / 2;
`;

const CenterSection = styled.div`
grid-area: 2 / 2 / 21 / 21;
`;


const GridPlanner: React.FC = () => {


  const [columns, setColumns] = useState<number>(3);

  const [rows, setRows] = useState(3);
  const [columngap, setColumnGap] = useState(10);
  const [rowgap, setRowGap] = useState(10);

  const [columnWidth, setColumnWidth] = useState<{ [key: string]: number }>({
    col1: 1,
    col2: 1,
    col3: 1
  });

  const [rowHeight, setRowHeight] = useState<{ [key: string]: number }>({
    row1: 1,
    row2: 1,
    row3: 1
  });

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

    setColumnWidth(prevWidths => ({ ...prevWidths, [`col${index + 1}`]: value}));

  };

  const handleRowChange = (index: number, value: number) => {
    setRowHeight(prevHeights => ({
      ...prevHeights,
      [`row${index + 1}`]: value
    }));
  };


  console.log(columnWidth);
  console.log(rowHeight);



  return (
    <>
      <InputWrapper>
        <Fieldset>
          <Label> Columns: </Label>
          <InputField type="number" name="n_columns" min="1" onChange={(e) => setColumns(e.target.value)} value={columns} />
        </Fieldset>
        <Fieldset>
          <Label> Rows: </Label>
          <InputField type="number" name="n_rows" min="1" onChange={(e) => setRows(e.target.value)} value={rows} />
        </Fieldset>
        <Fieldset>
          <Label> Column gap (px): </Label>
          <InputField type="number" name="n_column_gap" min="0" onChange={(e) => setColumnGap(e.target.value)} value={columngap} />
        </Fieldset>
        <Fieldset>
          <Label> Row gap (px): </Label>
          <InputField type="number" name="n_row_gap" min="0" onChange={(e) => setRowGap(e.target.value)} value={rowgap} />
        </Fieldset>
      </InputWrapper>

      <br /><br /><br /><br /><br />

      <GridContainerWrapper $rows={20} $columns={20} $columngap={10} $rowgap={10}>

      <TopSection>
          <GridContainer
            $columnWidth={columnWidth}
            $rowHeight={{ row1: 1 }}
            $columngap={columngap}
            $rowgap={rowgap}
          >
            {Array.from({ length: columns }).map((_, index) => (
              <GridInputField
                $size={(100 / columns)}
                type="number"
                min={1}
                value={columnWidth[`col${index + 1}`]}
                key={index}
                onChange={(e) => handleColumnChange(index, parseInt(e.target.value, 10))}
              />
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
              <GridInputField
                $size={(100 / rows)}
                type="number"
                min={1}
                value={rowHeight[`row${index + 1}`]}
                key={index}
                onChange={(e) => handleRowChange(index, parseInt(e.target.value, 10))}
              />
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
            {Array.from({ length: columns * rows }).map((_, index) => (
              <GridItem key={index}></GridItem>
            ))}
          </GridContainer>
        </CenterSection>
      </GridContainerWrapper>


    </>
  )
}