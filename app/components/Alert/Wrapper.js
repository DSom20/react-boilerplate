import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  margin: auto;
  width: 300px;
  padding: 5px;
  margin-bottom: 5px;
  background-color: ${props => (props.success ? 'green' : 'red')};
`;

export default Wrapper;
