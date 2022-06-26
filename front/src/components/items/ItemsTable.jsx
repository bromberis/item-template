import React, { useState } from "react";
import { findItemAndDelete } from "../../api/library/UsersApi";
import { useGlobalUserContext } from "../context/UserContext";
import { BsTrash, BsPencil } from "react-icons/bs";
import swal from "sweetalert";
import UpdateItemTitle from "./UpdateItemTitle";

function ItemsTable({ title, category, date, itemID }) {
  const { userData, refreshUserData } = useGlobalUserContext();
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      <tr>
        <td>{date.slice(0, 10)}</td>
        {isEditing === false && <td className="text-start">{title}</td>}
        {isEditing === true && (
          <td>
            <UpdateItemTitle
              setIsEditing={setIsEditing}
              itemID={itemID}
              title={title}
              category={category}
              date={date}
            />
          </td>
        )}
        <td>{category}</td>
        <td>
          <button
            className="btn m-1 custom-button-edit"
            onClick={() => setIsEditing(!isEditing)}
          >
            <BsPencil color="#7e685a" fontSize="1.5em" />
          </button>

          <button
            className="btn  m-1 custom-button-tr"
            onClick={() =>
              swal({
                title: "Ar tikrai norite ištrinti?",
                icon: "warning",
                buttons: ["Atšaukti", "Gerai"],
              }).then((isConfirm) => {
                if (isConfirm) {
                  findItemAndDelete(userData._id, itemID).then(() => {
                    refreshUserData(userData._id);
                  });
                }
              })
            }
          >
            <BsTrash color="#7e685a" fontSize="1.5em" />
          </button>
        </td>
      </tr>
    </>
  );
}

export default ItemsTable;
