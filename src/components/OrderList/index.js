import React, { Component } from "react";
import OrderItem from "../OrderItem";

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch("/mock/orders.json").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          this.setState({
            data,
          });
        });
      }
    });
  }

  render() {
    return (
      <>
        {this.state.data.map((item) => (
          <OrderItem key={item.id} data={item} onSubmit={this.handleSubmit} />
        ))}
      </>
    );
  }

  handleSubmit = (id, comment, stars) => {
    //实际场景下，要将数据传回到服务器，这儿省略了这样的操作
    const newData = this.state.data.map(item => {
        if(item.id !== id) {
            return item;
        }
        else{
            return { ...item, comment, stars, ifCommented: true}
        }
    });

    this.setState({
        data: newData,
    });
  }
}

export default OrderList;