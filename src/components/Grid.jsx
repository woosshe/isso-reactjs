import { useEffect, useState } from "react";
import styled from "styled-components";
import imgDownArrow from "../resources/images/down-arrow.svg";
import imgDownArrowDisabled from "../resources/images/down-arrow-disabled.svg";

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
`;

const Box = styled.div`
  display: grid;
  grid-gap: 0;
`;

const Cell = styled.div`
  background-color: #fff;
  border-right: solid 1px #ccc;
  border-bottom: solid 1px #ccc;
  box-shadow: 0 0 0 2px inset transparent;
  transition: all 0.1s ease-in-out;
  cursor: default;

  &[data-type="header"] {
    position: sticky;
    top: 0;
    background-color: #f3f3f3;
    font-weight: bold;
    padding: 0 10px;
  }
  &[data-type="footer"] {
    position: sticky;
    bottom: 0;
    background-color: #f3f3f3;
    font-weight: bold;
    text-align: right;
    border-top: solid 1px #ccc;
    border-bottom: none;
    border-right: none;
    grid-column: 1/-1;
    padding: 0 10px;
  }
  &[data-type="nodata"] {
    border-bottom: none;
    border-right: none;
    grid-column: 1/-1;
    text-align: center;
    &:before {
      content: "no data";
    }
  }
  &.fr {
    border-top: none;
  }
  &.lr {
    border-bottom: none;
  }
  &.lc {
    border-right: none;
  }
  &.rowSelect {
    background-color: rgba(0, 0, 0, 0.05);
    font-weight: bold;
  }
  &.colSelect {
    box-shadow: 0 0 0 1px inset rgba(0, 0, 0, 0.5);
  }

  & span {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0 10px;
  }

  & input {
    border: none;
    width: 100%;
    height: 100%;
    padding: 0 10px;
    color: inherit;
    opacity: 1;
    background-color: #fdf7ea;
    &:focus {
      position: relative;
      z-index: 1;
    }
    &:disabled {
      background-color: transparent;
    }
  }

  & select {
    border: none;
    width: 100%;
    height: 100%;
    padding: 0 30px 0 10px;
    appearance: none;
    color: inherit;
    opacity: 1;
    background-image: url(${imgDownArrow});
    background-repeat: no-repeat;
    background-size: 8px;
    background-position: calc(100% - 10px) 50%;
    background-color: #fdf7ea;
    &:focus {
      position: relative;
      z-index: 1;
    }
    &:disabled {
      /* background-image: url(${imgDownArrowDisabled}); */
      background-image: none;
      background-color: transparent;
    }
  }
`;

export const Grid = ({ columns, data, config }) => {
  const [row, setRow] = useState(-1);
  const [col, setCol] = useState(-1);

  useEffect(() => {
    if (row >= 0 && col >= 0) {
      document.querySelectorAll("[data-type='column']").forEach((cell) => {
        if (cell.dataset.row === row) {
          cell.classList.add("rowSelect");
          if (cell.dataset.col === col) {
            cell.classList.add("colSelect");
          } else {
            cell.classList.remove("colSelect");
          }
        } else {
          cell.classList.remove("rowSelect");
          cell.classList.remove("colSelect");
        }
      });
    }
  }, [row, col]);

  if (!columns) {
    return null;
  }

  const rowClass = (rowIndex) => {
    try {
      return rowIndex === 0 ? "fr" : rowIndex + 1 === data.length ? "lr" : "";
    } catch (e) {
      return "";
    }
  };

  const columnClass = (columnIndex) => {
    try {
      return columnIndex === 0 ? "fc" : columnIndex + 1 === columns.length ? "lc" : "";
    } catch (e) {
      return "";
    }
  };

  const onCellClick = ({ target }) => {
    setRow(target.getAttribute("data-row"));
    setCol(target.getAttribute("data-col"));
  };

  const onCellDblClick = ({ target }) => {
    let column = target;
    while (column.dataset.type !== "column") {
      column = column.parentElement;
      if (!column) break;
    }
    if (column.dataset.editable && column.dataset.editable === "true") {
      target.removeAttribute("disabled");
      target.focus();
      target.onblur = () => {
        console.log(target);
        target.setAttribute("disabled", true);
      };
    }
  };

  const wrapStyle = {};
  if (config) {
    if (config.gridHeight) wrapStyle.maxHeight = config.gridHeight;
    if (config.rowHeight) wrapStyle.lineHeight = config.rowHeight;
  }

  return (
    <Wrap style={{ ...wrapStyle }}>
      <Box style={{ gridTemplateColumns: `repeat(${columns.length}, auto)` }}>
        {columns.map((column, i) => (
          <Cell key={i} data-type='header' className={`${columnClass(i)} `}>
            {column.name}
          </Cell>
        ))}
        {(!data || data.length === 0) && <Cell data-type='nodata'></Cell>}
        {data &&
          data.map((row, rowIndex) =>
            columns.map((column, columnIndex) => {
              const { id, name, editable, type, data } = column;
              const value = row[id];
              return (
                <Cell
                  key={`${rowIndex}_${columnIndex}`}
                  data-type='column'
                  className={`${rowClass(rowIndex)} ${columnClass(columnIndex)}`}
                  onClick={onCellClick}
                  onDoubleClick={onCellDblClick}
                  data-row={rowIndex}
                  data-col={columnIndex}
                  data-val={value}
                  data-editable={editable}
                >
                  {type === "combo" && data && data.length > 0 ? (
                    <select defaultValue={value} disabled={!editable}>
                      <option value=''></option>
                      {data.map(({ value: v, label: l }) => (
                        <option key={v} value={v}>
                          {l}
                        </option>
                      ))}
                    </select>
                  ) : editable ? (
                    <input type='text' defaultValue={value} disabled={!editable} />
                  ) : (
                    <span>{value}</span>
                  )}
                </Cell>
              );
            })
          )}
        <Cell data-type='footer'>Footer</Cell>
      </Box>
    </Wrap>
  );
};
