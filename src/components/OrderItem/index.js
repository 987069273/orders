import React, { Component } from "react";
import classNames from "classnames";
import "./style.css";

class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      stars: props.data.stars||0,
      comment: props.data.comment||'',
    };
  }

  render() {
    const { shop, product, price, picture, ifCommented } = this.props.data;
    const btnClassNames = classNames(
      "orderItem__btn",
      { "orderItem__btn--red": !ifCommented },
      { "orderItem__btn--grey": ifCommented }
    );
    return (
      <div className="orderItem">
        <div className="orderItem__picContainer">
          <img className="orderItem__pic" src={picture} alt="缺省图片" />
        </div>
        <div className="orderItem__content">
          <div className="orderItem__product">{product}</div>
          <div className="orderItem__shop">{shop}</div>
          <div className="orderItem__detail">
            <div className="orderItem__price">{price}</div>
            <div>
              <button
                className={btnClassNames}
                onClick={ ifCommented ? null : this.handleOpenEditArea }
              >
                {ifCommented ? "已评价" : "评价"}
              </button>
            </div>
          </div>
        </div>
        { this.state.editing && this.renderEditArea() }
      </div>
    );
  }

  renderEditArea() {
    return (
      <div className="orderItem__commentContainer">
        <textarea
          className="orderItem__comment"
          onChange={(e) => this.handleCommentChange(e)}
          value={this.state.comment}
        />
        {this.renderStars()}
        <button 
          className="orderItem__btn orderItem__btn--red"
          onClick={this.handleSubmitComment}
        >
            提交
        </button>
        <button 
          className="orderItem__btn orderItem__btn--grey" 
          onClick={this.handleCancelComment}
        >
            取消
        </button>
      </div>
    );
  }

  renderStars() {
    const { stars } = this.state;
    return (
      <div>
        {[1, 2, 3, 4, 5].map((item, index) => {
          const starClassNames = classNames("orderItem__star", {
            "orderItem__star--red": item <= stars,
          });
          return (
            <span
              key={index}
              className={starClassNames}
              onClick={() => this.handleClickStars(item)}
            >
              ★
            </span>
          );
        })}
      </div>
    );
  }

  handleOpenEditArea = () => {
      this.setState({
          editing: true,
      })
  }

  handleCommentChange = (e) => {
      this.setState({
          comment:e.target.value,
      })
  }

  handleClickStars = (stars) => {
      this.setState({
          stars
      })
  }

  handleCancelComment = () => {
      this.setState({
          editing: false,
          comment: this.props.data.comment || '',
          stars: this.props.data.comment || 0,
      })
  }

  handleSubmitComment = () => {
      const { id } = this.props.data;
      const { comment, stars } = this.state;
      this.setState({
          editing: false,
      })
      this.props.onSubmit(id, comment, stars);
  }
}

export default OrderItem;