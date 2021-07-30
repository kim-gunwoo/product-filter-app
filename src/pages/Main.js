import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from 'components/Card';

export default class Main extends Component {
  render() {
    const { items } = this.props;

    return (
      <Container>
        <Link to="/recentList">to recentList</Link>
        <Content>
          {items?.map(item => (
            <Link
              key={item.id}
              to={{ pathname: '/product', state: { ...item } }}
            >
              <Card {...item} />
            </Link>
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

  a {
    margin: 5px;
    text-decoration: none;
  }
`;
