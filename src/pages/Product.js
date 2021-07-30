import React from 'react';
import styled from 'styled-components';
import {
  WATCH,
  NO_INTERRESTED,
  getInterestedItems,
  setLocalStorageRecentItems,
} from 'utils/pages/productStorageControl';

export default class Product extends React.Component {
  state = {
    item: {},
  };

  randomItem = () => {
    const { item } = this.state;
    const interestdItems = getInterestedItems(this.props.items, item);
    const idx = Math.floor(Math.random() * interestdItems.length);
    return { ...interestdItems[idx] };
  };

  handleRandom = () => {
    const { item } = this.state;
    setLocalStorageRecentItems(WATCH, item);
    this.setState({ item: this.randomItem(this.state.item) });
  };

  handleNoInterested = () => {
    const { item } = this.state;
    setLocalStorageRecentItems(WATCH, item);
    setLocalStorageRecentItems(NO_INTERRESTED, item);
    this.setState({ item: this.randomItem() });
  };

  componentDidMount() {
    const { state } = this.props.location;
    setLocalStorageRecentItems(WATCH, state);
    this.setState({ item: state });
  }

  render() {
    const { id, title, brand, price } = this.state.item;

    return (
      <Container>
        <div>
          {id}
          {title}
          {brand}
          {price}
        </div>
        <button onClick={this.handleRandom}>랜덤 조회</button>
        <button onClick={this.handleNoInterested}>관심 없음</button>
      </Container>
    );
  }
}

const Container = styled.div`
  margin: 100px auto;
  max-width: 1000px;
`;
