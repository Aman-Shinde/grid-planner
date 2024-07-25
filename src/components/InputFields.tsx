import React from 'react'
import styled from 'styled-components';

interface InputFieldsProps {
    numberOfFields: number;
    val : { [key: string]: number };
    valPrefix : String;
    handleValChange: (index: number, value: number) => void;
}

const GridInputFieldWrapper = styled.div`
min-height: 48px;
text-align: center;
display: flex;
align-items: center;
justify-content: center;
`;

const GridInputField = styled.input`
  max-width: 30px;
  border: 1px solid #ccc;
  transition: border-color 0.3s;
  padding: 8px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

function InputFields({ numberOfFields, val, valPrefix,  handleValChange }: InputFieldsProps) {
    return (
        <>
            {Array.from({ length: numberOfFields }).map((_, index) => (
                <GridInputFieldWrapper key={index}>
                    <GridInputField
                        type="number"
                        min={1}
                        value={val[`${valPrefix}${index + 1}`] ?? 1}

                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => handleValChange(index, parseInt(e.target.value, 10))}
                    />
                </GridInputFieldWrapper>
            ))}
        </>
    )
}

export default InputFields
