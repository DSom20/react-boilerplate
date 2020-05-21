import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: ${props => (props.success ? 'green' : 'red')};
`;

export default Wrapper;
