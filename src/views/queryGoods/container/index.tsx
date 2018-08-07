import * as React from "react";
 import FilterContainer from "./filterContainer";
 import Table from "./tableContainer";

class IndexComponent extends React.Component<{}> {
  public render() {
    return (
      <div>
        <FilterContainer />
        <Table />
      </div>
    );
  }
}
export default IndexComponent;
