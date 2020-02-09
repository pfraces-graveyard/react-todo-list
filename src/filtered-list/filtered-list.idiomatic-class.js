import React, { Component } from "react";
import { Filter } from "./filter";
import { ItemList } from "./item-list";

export class FilteredList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: "All",
      filters: [
        { label: "All", value: "All" },
        { label: "Pending", value: "Pending" },
        { label: "Done", value: "Done" }
      ]
    };
  }

  getItems() {
    return this.props.items.filter(item => {
      if (this.state.filter === "Pending") {
        return !item.done;
      }

      if (this.state.filter === "Done") {
        return item.done;
      }

      return true;
    });
  }

  updateFilter(e) {
    console.log("updateFilter");
    this.setState({ filter: e.target.value });
  }

  render() {
    console.log("FilteredList render");

    return (
      <>
        <Filter
          options={this.state.filters}
          checked={this.state.filter}
          onChange={e => {
            this.updateFilter(e);
          }}
        />
        <ItemList
          items={this.getItems()}
          onClick={this.props.toggleItemStatus}
        />
      </>
    );
  }
}
