import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from 'components/Card';
import {
  WATCH,
  NO_INTERRESTED,
  getInterestedItems,
  getLocalStorageReCentItems,
} from 'utils/pages/productStorageControl';

export default class RecenList extends React.Component {
  state = {
    filter: [],
    options: 'price',
    unlike: false,
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleCheckBox = e => {
    const { name, checked } = e.target;
    this.setState({ [name]: checked });
  };

  handleBrand = e => {
    const { name, checked } = e.target;
    const { filter } = this.state;

    const newFilter = filter.map(el =>
      el.name === name ? { name, checked } : el
    );

    this.setState({ filter: newFilter });
  };

  sortFunc = (a, b) => {
    const { options } = this.state;
    if (options === 'price') {
      return a.price - b.price;
    }
    if (options === 'recent') {
      return b.date - a.date;
    }
  };

  moveItem = state => {
    const unlicklist = getLocalStorageReCentItems(NO_INTERRESTED).map(
      el => el.id
    );

    if (unlicklist.includes(state.id)) {
      alert('warnnig');
      return;
    }

    this.props.history.push({
      pathname: '/product',
      state: { ...state },
    });
  };

  componentDidMount() {
    // 브랜드 목록
    const items = getLocalStorageReCentItems(WATCH);
    const brand = {};
    for (const name of items.map(el => el.brand)) {
      brand[name] = true;
    }
    const filter = [];
    for (const [key, value] of Object.entries(brand)) {
      filter.push({ name: key, checked: value });
    }
    this.setState({ filter });
  }

  render() {
    const { options, filter, unlike } = this.state;

    const interestedItems = getLocalStorageReCentItems(WATCH);

    console.log(interestedItems);

    const items = unlike
      ? getInterestedItems(interestedItems)
      : getLocalStorageReCentItems(WATCH);

    const filtering = filter
      .filter(el => el.checked && el.name)
      .map(el => el.name);

    return (
      <Container>
        <Link to="/">to main</Link>
        <div>
          <label>
            <input
              type="checkbox"
              name="unlike"
              checked={unlike}
              onChange={this.handleCheckBox}
            />
            관심없는 상품 숨기기
          </label>

          {filter.map((el, id) => (
            <label key={id}>
              <input
                type="checkbox"
                name={el.name}
                checked={el.checked}
                onChange={this.handleBrand}
              />
              {el.name}
            </label>
          ))}

          <select name="options" value={options} onChange={this.handleChange}>
            <option value="price">낮은 가격 순</option>
            <option value="recent">최근 조회 순</option>
          </select>
        </div>
        <Content>
          {items
            .sort(this.sortFunc)
            .filter(el => filtering.includes(el.brand))
            ?.map((item, id) => (
              <Wrapper key={id} onClick={() => this.moveItem({ ...item })}>
                <Card {...item} id={item.id} />
              </Wrapper>
            ))}
        </Content>
      </Container>
    );
  }
}

const Container = styled.div`
  margin: 100px auto;
  max-width: 1000px;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Wrapper = styled.div`
  margin: 5px;
`;
