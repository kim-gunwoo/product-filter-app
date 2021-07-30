import React from 'react';
import styled from 'styled-components';
import {
  getLocalStorage,
  setLocalStorage,
} from 'utils/pages/productStorageControl';

const NO_INTERRESTED = 'no_Interested';
const WATCH = 'watch';

export default class Product extends React.Component {
  state = {
    item: {},
    items: [],
  };

  randomItem = () => {
    const { item } = this.state;
    const interestdItems = this.returnInterestedItems(item);
    const idx = Math.floor(Math.random() * interestdItems.length);
    return { ...interestdItems[idx] };
  };

  returnInterestedItems = item => {
    const noInterestedItems = getLocalStorage(NO_INTERRESTED);
    noInterestedItems.push(item);

    const totalItem = this.props.items.map((el, idx) => ({ ...el, idx }));
    const interestedItems = totalItem.filter(
      (_, idx) => noInterestedItems.findIndex(el => el.idx === idx) === -1
    );

    return interestedItems;
  };

  handleRandom = () => {
    const { item } = this.state;
    setLocalStorage(WATCH, item);
    this.setState({ item: this.randomItem(this.state.item) });
  };

  handleNoInterested = () => {
    const { item } = this.state;
    setLocalStorage(WATCH, item);
    setLocalStorage(NO_INTERRESTED, item);
    this.setState({ item: this.randomItem() });
  };

  componentDidMount() {
    // 스토리지 저장
    const { title, brand, price, idx } = this.props.location.state;

    const item = { idx, title, brand, price };
    setLocalStorage(WATCH, item);

    const items = this.props.items.filter((el, index) => index !== idx);
    this.setState({ item, items });
  }

  componentDidUpdate() {}

  render() {
    const { title, brand, price, idx } = this.state.item;

    return (
      <Container>
        <div>
          {idx}
          {title} {brand} {price}
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
