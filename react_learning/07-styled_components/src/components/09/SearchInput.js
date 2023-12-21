import styled from 'styled-components';
import Input from './Input';
import searchImg from './search.png';

const SearchInput = styled(Input)`
  background-image: url('${searchImg}');
  background-position: 12px 50%;
  background-repeat: no-repeat;
  background-size: 16px;
  padding-left: 40px;
`;

export default SearchInput;
