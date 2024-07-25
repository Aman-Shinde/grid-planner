import React from 'react'
import styled from 'styled-components';

interface FormProps {
    setColumns: React.Dispatch<React.SetStateAction<number>>;
    columns: number;
    setRows: React.Dispatch<React.SetStateAction<number>>;
    rows: number;
    setColumnGap: React.Dispatch<React.SetStateAction<number>>;
    columngap: number;
    setRowGap: React.Dispatch<React.SetStateAction<number>>;
    rowgap: number;
    containers: number;
    handleContainersChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setCurrentContainer: React.Dispatch<React.SetStateAction<number>>;
    reset : () => void;
    getCode: () => void;
}

const InputWrapper = styled.div`
  width: 20%;
  @media (max-width: 800px) {
    width: 100%;
    margin-bottom: 48px;
}
`;

const Fieldset = styled.fieldset`
  width: 100%;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Label = styled.label``;

const InputField = styled.input`
  width: 30%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SelectField = styled.select`
  width: 30%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  transition: border-color 0.3s;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const WhiteButton = styled.button`
  background-color: white;
  color: black;
  border: 1px solid black;
  padding: 8px 12px;

  cursor: pointer;
`;

const BlackButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  padding: 8px 12px;

  cursor: pointer;
  border: 1px solid black;
`;

const Form = ({ setColumns, columns, setRows, rows, setColumnGap, columngap, setRowGap, rowgap, containers, handleContainersChange, setCurrentContainer, reset, getCode }: FormProps) => {
    return (
        <>

            <InputWrapper>

                <Fieldset>
                    <Label>Columns:</Label>
                    <InputField
                        type="number"
                        name="n_columns"
                        min="1"
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setColumns(parseInt(e.target.value, 10))}
                        value={columns}
                    />
                </Fieldset>
                <Fieldset>
                    <Label>Rows:</Label>
                    <InputField
                        type="number"
                        name="n_rows"
                        min="1"
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setRows(parseInt(e.target.value, 10))}
                        value={rows}
                    />
                </Fieldset>
                <Fieldset>
                    <Label>Column gap (px):</Label>
                    <InputField
                        type="number"
                        name="n_column_gap"
                        min="0"
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setColumnGap(parseInt(e.target.value, 10))}
                        value={columngap}
                    />
                </Fieldset>
                <Fieldset>
                    <Label>Row gap (px):</Label>
                    <InputField
                        type="number"
                        name="n_row_gap"
                        min="0"
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setRowGap(parseInt(e.target.value, 10))}
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
                    <SelectField onChange={(e : any) => setCurrentContainer(parseInt(e.target.value, 10))}>
                        {Array.from({ length: containers }).map((_, index) => (
                            <option key={index} value={index + 1}>{`Container ${index + 1}`}</option>
                        ))}
                    </SelectField>
                </Fieldset>

                <ButtonWrapper>
                    <WhiteButton onClick={reset}>Reset</WhiteButton>
                    <BlackButton>Get my Code</BlackButton>
                </ButtonWrapper>

            </InputWrapper>

        </>
    )
}

export default Form
