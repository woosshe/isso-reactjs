import styled from "styled-components";

export const Input = styled.input`
  padding: 8px 12px;
  border: solid 1px #ccc;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  margin: 0;
  &:focus-visible {
    border-color: #2463eb;
    outline: max(1px, 1px) solid #2463eb;
  }
`;

export const BtnBlue = styled.button`
  padding: 8px 12px;
  background-color: #2463eb;
  border: solid 1px #2463eb;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  color: #fff;
  font-weight: 500;
  margin: 0;
  cursor: pointer;
  &:hover {
    background-color: #3c82f6;
    border-color: #3c82f6;
  }
  &:active {
    background-color: #1d40af;
    border-color: #1d40af;
  }
  &:focus-visible {
    outline-offset: max(2px, 2px);
    outline: max(2px, 2px) solid #2463eb;
  }
`;

export const Label = styled.label`
  cursor: pointer;
  & span {
    font-size: 0.85em;
  }
  & input ~ span,
  & span ~ input {
    margin-left: 0.5em;
  }
`;

export const Toggle = styled.input`
  appearance: none;
  position: relative;
  vertical-align: middle;
  border-radius: 0.6em;
  width: 2em;
  height: 1.2em;
  background: #aaa;
  margin: 0;
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    width: 1.2em;
    height: 1.2em;
    transform: scale(0.7);
    border-radius: 50%;
    background-color: #fff;
    transition: all 0.1s ease-in-out;
  }
  &:checked {
    background-color: #2463eb;
    border-color: #2463eb;
  }
  &:checked::before {
    background-color: white;
    left: 0.8em;
  }
  &:disabled {
    border-color: #aaa;
    opacity: 0.7;
  }
  &:disabled:before {
    background-color: #aaa;
  }
  &:disabled + span {
    opacity: 0.3;
  }
  &:focus-visible {
    outline-offset: max(2px, 2px);
    outline: max(2px, 2px) solid #2463eb;
  }
`;

// export const Toggle = ({ id, name, value, text, onChange }) => {
//   if (!id) id = (Math.random() + 1).toString(36).substring(2);
//   const Label = styled.label`
//     display: flex;
//     gap: 5px;
//     justify-content: center;
//     align-items: center;
//     cursor: pointer;
//     & input[type="checkbox"] {
//       appearance: none;
//       position: relative;
//       border-radius: 0.7em;
//       width: 2em;
//       height: 1.2em;
//       background: #aaa;
//       cursor: pointer;
//       &::before {
//         content: "";
//         position: absolute;
//         left: 0;
//         width: 1.2em;
//         height: 1.2em;
//         transform: scale(0.7);
//         border-radius: 50%;
//         background-color: #fff;
//         transition: all 0.1s ease-in-out;
//       }
//       &:checked {
//         background-color: #2463eb;
//         border-color: #2463eb;
//       }
//       &:checked::before {
//         background-color: white;
//         left: 0.8em;
//       }
//       &:disabled {
//         border-color: #aaa;
//         opacity: 0.7;
//       }
//       &:disabled:before {
//         background-color: #aaa;
//       }
//       &:disabled + span {
//         opacity: 0.3;
//       }
//       &:focus-visible {
//         outline-offset: max(2px, 2px);
//         outline: max(2px, 2px) solid #2463eb;
//       }
//     }
//   `;
//   return (
//     <>
//       <Label>
//         <input type='checkbox' id={id} name={name} value={value} onChange={onChange} />
//         {text ?? <span>{text}</span>}
//       </Label>
//     </>
//   );
// };
