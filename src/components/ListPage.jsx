import React from "react";
import List from "./List";
import AddList from "./AddList";

function ListPage() {
  return (
    <div className="desktop">
      <main>
        <div className="wrap">
          <div className="desktop-header"></div>
          <form>
            <List />
            <AddList />
          </form>
        </div>
      </main>
    </div>
  );
}

export default ListPage;
