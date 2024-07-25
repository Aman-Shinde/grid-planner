import React from 'react';
import styled from 'styled-components';

interface FixedGridProps {
    columnWidth: { [key: string]: number };
    rowHeight: { [key: string]: number };
    columngap: number;
    rowgap: number;
    children: React.ReactNode;
}

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

function FixedGrid({ columnWidth, rowHeight, columngap, rowgap, children }: FixedGridProps) {
    return (
        <GridContainer $columnWidth={columnWidth} $rowHeight={rowHeight} $columngap={columngap} $rowgap={rowgap} >

            {children}

        </GridContainer>
    )
}

export default FixedGrid
