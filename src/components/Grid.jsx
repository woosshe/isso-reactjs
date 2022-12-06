import { useEffect, useState } from "react";
import styled from "styled-components";
import imgDownArrow from "../resources/images/down-arrow.svg";
import imgDownArrowDisabled from "../resources/images/down-arrow-disabled.svg";
import discard from "../resources/images/restart.svg";

// #fefbf5

const Wrap = styled.div`
  border: 1px solid #ccc;
  overflow: auto;
  &::-webkit-scrollbar-track {
    box-shadow: inset 1px 0 10px rgba(0, 0, 0, 0.25);
    background-color: #fff;
  }
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: #999;
  }

  & * {
    box-sizing: border-box;
    color: #000;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  /* header */
  & thead th,
  & thead td {
    position: sticky;
    top: 0;
    z-index: 1;
    background: #f3f3f3;
  }

  & > *:last-child > tr:last-child > th,
  & > *:last-child > tr:last-child > td {
    border-bottom: none;
  }
  & > * > tr > th:last-child,
  & > * > tr > td:last-child {
    border-right: none;
  }

  /* cell */
  & th,
  & td {
    border-right: solid 1px #ccc;
    border-bottom: solid 1px #ccc;
    padding: 0;
    cursor: default;
    position: relative;

    /* data */
    & > * {
      display: block;
      width: 100%;
      height: 100%;
      padding: 0 10px;
      border: none;
      &:focus {
        position: relative;
        outline-color: #1e90ff;
        outline-style: solid;
        outline-width: 2px;
        outline-offset: -2px;
      }
    }
    & > select {
      appearance: none;
      /* background-color: #fefbf5; */
      background-color: transparent;
      background-image: url(${imgDownArrow});
      background-repeat: no-repeat;
      background-position: calc(100% - 10px) 50%;
      background-size: 8px;
      opacity: 1;
      &:disabled {
        /* background-color: transparent; */
        background-image: none;
      }
    }
    & > input {
      /* background-color: #fefbf5; */
      background-color: transparent;
    }
    /* & em {
      display: none;
      position: absolute;
      width: 16px;
      height: 16px;
      right: 8px;
      top: calc(50% - 8px);
      background-image: url(${discard});
      background-repeat: no-repeat;
      cursor: pointer;
    } */
    &[data-modified="true"] {
      background-color: #fffdd6;
      /* & em {
        display: block;
      } */
    }
  }
`;

export const Grid = ({ id, columns, data, config }) => {
  const [row, setRow] = useState(-1);
  const [col, setCol] = useState(-1);

  const [focusedCell, setFocusedCell] = useState({});

  useEffect(() => {
    console.log("row/col", row, col);
  }, [row, col]);

  if (!id || !columns) {
    return null;
  }

  const handleEditableBlur = ({ target }) => {
    if (document.selection) {
      document.selection.empty();
    } else if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }

    target.disabled = true;
    target.removeEventListener("blur", handleEditableBlur);
  };

  const getCell = (target) => {
    let cell = target;
    let scope = cell?.dataset?.scope;
    if (scope !== "cell") {
      while (scope !== "cell") {
        if (!cell.parentElement) break;
        cell = cell.parentElement;
        scope = cell.dataset?.scope;
      }
    }
    return cell;
  };

  const onCellDoubleClick = ({ target }) => {
    const cell = getCell(target);
    try {
      const editable = JSON.parse(cell.dataset.editable);
      if (editable) {
        const input = cell.querySelector("input,select");
        input.disabled = false;
        input.focus();
        if (input.nodeName === "INPUT") input.select();
        input.addEventListener("blur", handleEditableBlur);
      }
    } catch (e) {
      // do nothing
    }
  };

  const onCellChange = ({ target }) => {
    const cell = getCell(target);
    cell.dataset.value = target.value;
    cell.dataset.modified = cell.dataset.value !== cell.dataset.origin;
  };

  const onCellFocus = ({ target }) => {
    const cell = getCell(target);
    try {
      setFocusedCell({ target: cell, ...cell.dataset });
    } catch (e) {
      // do anything
    }
  };

  const onCellBlur = ({ target }) => {
    try {
      setFocusedCell({});
    } catch (e) {
      // do anything
    }
  };

  const onCellClick = ({ target }) => {
    setRow(target.getAttribute("data-row"));
    setCol(target.getAttribute("data-col"));
  };

  const wrapStyle = {};
  const cellStyle = {};
  if (config) {
    if (config.gridHeight) wrapStyle.maxHeight = config.gridHeight;
    if (config.rowHeight) {
      cellStyle.lineHeight = config.rowHeight;
      cellStyle.height = config.rowHeight;
    }
  }

  return (
    <Wrap id={id} style={{ ...wrapStyle }}>
      <Table>
        <thead>
          <tr>
            {columns.map((column, i) => (
              <th key={i} style={{ ...cellStyle }} data-cid={column.id} data-scope='header'>
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, ridx) => (
            <tr key={ridx} data-ridx={ridx} data-rid={ridx} data-scope='row'>
              {columns.map((column, cidx) => {
                const cellValue = row[column.id];
                const editable = column.editable ?? false;
                const cellType = column.type;
                const cellData = column.data;
                return (
                  <td
                    key={cidx}
                    style={{ ...cellStyle }}
                    data-modified={false}
                    data-ridx={ridx}
                    data-rid={ridx}
                    data-cidx={cidx}
                    data-cid={column.id}
                    data-scope='cell'
                    data-value={cellValue ? cellValue : ""}
                    data-origin={cellValue ? cellValue : ""}
                    data-editable={editable ? true : false}
                    data-type={cellType ? cellType : ""}
                    onDoubleClick={onCellDoubleClick}
                    onFocus={onCellFocus}
                    onBlur={onCellBlur}
                  >
                    {cellType === "combo" && cellData && cellData.length > 0 ? (
                      <select defaultValue={cellValue} disabled={true} onChange={onCellChange}>
                        <option></option>
                        {cellData.map((list) => (
                          <option key={list.value} value={list.value}>
                            {list.label}
                          </option>
                        ))}
                      </select>
                    ) : editable ? (
                      <input type='text' defaultValue={cellValue} disabled={true} onChange={onCellChange} />
                    ) : (
                      <data value={cellValue}>{cellValue}</data>
                    )}

                    {/* <em></em> */}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        {/* <tfoot>
          <tr>
            <th data-cid={column.id} data-scope='footer'>footer</th>
          </tr>
        </tfoot> */}
      </Table>
    </Wrap>
  );
};

export const getGridData = (id) => {
  const grid = document.querySelector(`#${id}`);
  if (grid) {
    let rows = [];
    grid.querySelectorAll("[data-type='column']").forEach((cell) => {
      let cols = {};
      console.log(cell);
    });
  }
};
