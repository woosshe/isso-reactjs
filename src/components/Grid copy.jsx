import styled from "styled-components";

const Wrap = styled.div`
  border: solid 1px #ccc;
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
  width: 100%;
  display: table;
  border-spacing: 0;
`;

const Row = styled.div`
  display: table-row;
  &.header {
    position: sticky;
    top: 0;
    border-bottom: solid 1px #ccc;
    & > * {
      font-weight: bold;
      background-color: #f3f3f3;
    }
  }
  &.footer {
    position: sticky;
    bottom: 0;
    width: 100%;
  }
`;

const Col = styled.div`
  display: table-cell;
  border-right: solid 1px #ccc;
  border-bottom: solid 1px #ccc;
  background-color: #fff;
  padding: 0 10px;
  *:first-of-type > & {
    border-top: none;
  }
  *:last-of-type > & {
    border-bottom: none;
  }
  &:first-of-type {
    border-left: none;
  }
  &:last-of-type {
    border-right: none;
  }
`;

export const Grid = ({ cols, data, config }) => {
  if (!cols) {
    return null;
  }

  const wrapStyle = {};
  if (config) {
    if (config.gridHeight) wrapStyle.maxHeight = config.gridHeight;
    if (config.rowHeight) wrapStyle.lineHeight = config.rowHeight;
  }
  return (
    <Wrap style={wrapStyle}>
      <Box>
        <Row className='header'>
          {cols.map((col, i) => (
            <Col key={i} id={`header_${col.id}`}>
              {col.name}
            </Col>
          ))}
        </Row>
        {data &&
          data.map((row, i) => {
            return (
              <Row key={i}>
                {cols.map((col, i) => (
                  <Col key={i} id={`header_${col.id}`}>
                    {row[col.id]}
                  </Col>
                ))}
              </Row>
            );
          })}
        <Row className='footer'>
          <Col>3</Col>
          <Col>3</Col>
          <Col>3</Col>
          <Col>3</Col>
        </Row>
      </Box>
    </Wrap>
  );
};
