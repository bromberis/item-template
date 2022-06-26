import React from "react";
import { useGlobalUserContext } from "../context/UserContext";
import ItemsTable from "./ItemsTable";
import "./ItemsStyle.css";

function Items() {
  const { userData } = useGlobalUserContext();
  if (Object.keys(userData).length !== 0) {
    var userItemsData = userData.items.map((item) => {
      return (
        <ItemsTable
          key={item._id}
          title={item.name}
          category={item.category}
          date={item.date}
          itemID={item._id}
        />
      );
    });
  }
  return (
    <table className="items-table">
      <thead>
        <tr>
          <th className="smaller-th">Data</th>
          <th>Pavadinimas</th>
          <th className="smaller-th">Antraštė</th>
          <th className="smaller-th">Veksmai</th>
        </tr>
      </thead>
      <tbody>{userItemsData}</tbody>
    </table>
  );
}

export default Items;
