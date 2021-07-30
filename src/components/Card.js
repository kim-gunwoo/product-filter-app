import React from 'react';
import styled from 'styled-components';

export default class Card extends React.Component {
  render() {
    const { title, brand, price } = this.props;

    return (
      <Container>
        <h2>{title}</h2>
        <h2>{brand}</h2>
        <h2>{price}</h2>
      </Container>
    );
  }
}
const Container = styled.div`
  padding: 15px;
  width: 300px;
  border: 1px solid lightgray;
  border-radius: 10px;
  color: black;
  line-height: 20px;
`;
