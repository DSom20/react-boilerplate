/**
 *
 * Button
 *
 */
import styled from 'styled-components';

const Button = styled.button`
  border: none;
  background: #2360fc;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;

  &:disabled {
    cursor: no-drop;
    background-color: #1d92d6;
  }
`;

export default Button;
