import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { TextInput } from './text';
import { SelectInput } from './select';

const TabularInputTable = styled.table``;

const TabularInputTableHead = styled.thead`
  font-size: 0.7em;
  width: 100%;
`;

const TabularInputTableHeadCell = styled.th`
  text-align: left;
`;

const TabularInputTableBody = styled.tbody``;

const TabularInputTableRow = styled.tr`
  width: 100%;
`;

const TabularInputTableCell = styled.td`
  input[type='text'] {
    width: auto !important;
  }
`;

const TabularInputTableFoot = styled.tfoot``;

const TabularCellButton = styled.button``;

export function TabularInput({ columns, rows, onAddRow, onRemoveRow, onUpdateRow }) {
  const ref = useRef();
  const defaultState = Object.values(columns).reduce(function(acc, cur) {
    acc[cur.name] = cur.value;
    return acc;
  }, {});
  const [state, setState] = useState(defaultState);

  const onChange = function(ev) {
    const { name, value } = ev.target;
    setState(function(prev) {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const onFooterLastCellKeyDown = ev => {
    if (ev.key === 'Tab') {
      onAddRow(state);
      ref.current.querySelector('#first').focus();
      ev.preventDefault();
      ev.stopPropagation();
      setState(defaultState);
    }
  };

  const onAddClick = ev => {
    onAddRow(state);
  };

  const onRemoveClick = i => ev => {
    onRemoveRow(rows[i]);
  };

  const onRowChange = function(i) {
    return function(ev) {
      const row = rows[i];
      row[ev.target.name] = ev.target.value;
      onUpdateRow(i, row);
    };
  };

  function renderInput(input) {
    switch (input.type) {
      case 'text':
        return <TextInput key={input.name} {...input} />;

      case 'select':
        return <SelectInput key={input.name} {...input} />;

      default:
        return <></>;
    }
  }

  return (
    <TabularInputTable>
      <TabularInputTableHead>
        <TabularInputTableRow>
          {columns.map(function(col) {
            return <TabularInputTableHeadCell key={col.name}>{col.label}</TabularInputTableHeadCell>;
          })}
          <TabularInputTableHeadCell />
        </TabularInputTableRow>
      </TabularInputTableHead>
      <TabularInputTableBody>
        {rows.map(function(row, i) {
          return (
            <TabularInputTableRow key={i}>
              {Object.entries(row).map(function([prop, val], i) {
                return (
                  <TabularInputTableCell key={prop}>
                    {renderInput({
                      type: columns[i].type,
                      name: prop,
                      value: val,
                      placeholder: columns[i].placeholder,
                      options: columns[i].options,
                      onChange: onRowChange(i)
                    })}
                  </TabularInputTableCell>
                );
              })}
              <TabularInputTableCell>
                <TabularCellButton onClick={onRemoveClick(i)}>Remove</TabularCellButton>
              </TabularInputTableCell>
            </TabularInputTableRow>
          );
        })}
      </TabularInputTableBody>
      <TabularInputTableFoot>
        <TabularInputTableRow ref={ref}>
          {columns.map(function(col, i) {
            return (
              <TabularInputTableCell key={col.name}>
                {renderInput({
                  id: i === 0 ? 'first' : '',
                  type: col.type,
                  name: col.name,
                  value: state[col.name],
                  placeholder: col.placeholder,
                  onChange: onChange,
                  onKeyDown: i === columns.length - 1 ? onFooterLastCellKeyDown : null
                })}
              </TabularInputTableCell>
            );
          })}
          <TabularInputTableCell>
            <TabularCellButton onClick={onAddClick}>Add</TabularCellButton>
          </TabularInputTableCell>
        </TabularInputTableRow>
      </TabularInputTableFoot>
    </TabularInputTable>
  );
}
