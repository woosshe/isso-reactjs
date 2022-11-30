import styled from "styled-components";

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

const Col = styled.div`
  background-color: #fff;
  padding: 0 10px;
  border-right: solid 1px #ccc;
  border-bottom: solid 1px #ccc;
  &[scope="head"] {
    position: sticky;
    top: 0;
    background-color: #f3f3f3;
    font-weight: bold;
  }
  &[scope="foot"] {
    position: sticky;
    bottom: 0;
    background-color: #f3f3f3;
    font-weight: bold;
    text-align: right;
    border-top: solid 1px #ccc;
    border-bottom: none;
    border-right: none;
    grid-column: 1/-1;
  }
  &[scope="nodata"] {
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
`;

export const Grid = ({ cols, data, config }) => {
  if (!cols) {
    return null;
  }

  const rowClass = (rowIndex) => {
    try {
      return rowIndex === 0 ? "fr" : rowIndex + 1 === data.length ? "lr" : "";
    } catch (e) {
      return "";
    }
  };

  const colClass = (colIndex) => {
    try {
      return colIndex === 0 ? "fc" : colIndex + 1 === cols.length ? "lc" : "";
    } catch (e) {
      return "";
    }
  };

  const onCellClick = (e) => {
    console.log(e);
  };

  const wrapStyle = {};
  if (config) {
    if (config.gridHeight) wrapStyle.maxHeight = config.gridHeight;
    if (config.rowHeight) wrapStyle.lineHeight = config.rowHeight;
  }
  return (
    <Wrap style={{ ...wrapStyle }}>
      <Box style={{ gridTemplateColumns: `repeat(${cols.length}, auto)` }}>
        {cols.map((col, i) => (
          <Col key={i} scope='head' className={`${colClass(i)} `}>
            {col.name}
          </Col>
        ))}
        {(!data || data.length === 0) && <Col scope='nodata'></Col>}
        {data &&
          data.map((row, rowIndex) =>
            cols.map((col, colIndex) => (
              <Col
                key={`${rowIndex}_${colIndex}`}
                scope='col'
                data-row={rowIndex}
                data-col={colIndex}
                className={`${rowClass(rowIndex)} ${colClass(colIndex)}`}
                onClick={onCellClick}
              >
                {row[col.id]}
              </Col>
            ))
          )}
        <Col scope='foot'>Footer</Col>
      </Box>
    </Wrap>
  );
};
