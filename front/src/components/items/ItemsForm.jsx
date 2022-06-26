import React from "react";
import { useForm } from "react-hook-form";
import "./ItemsStyle.css";
import { createUserItems } from "../../api/library/UsersApi";
import { useGlobalUserContext } from "../context/UserContext";

function ItemsForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { userData, refreshUserData } = useGlobalUserContext();

  let UppercaseFirst = (str) => {
    let newStr = str.charAt(0).toUpperCase() + str.slice(1);
    return newStr;
  };

  function onSubmit(data) {
    const newObj = {
      category: data.category,
      date: data.date,
      name: UppercaseFirst(data.name),
    };
    createUserItems(userData._id, newObj).then(() => {
      refreshUserData(userData._id);
    });
    reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className="rounded-0"
            type="date"
            name="date"
            id="date-inp"
            min="2000-01-01"
            max="2099-01-01"
            defaultValue={new Date().toISOString().slice(0, 10)}
            {...register("date")}
          />
        </div>
        <div>
          <input
            className="rounded-0 input-custom "
            placeholder="Pavadinimas"
            type="text"
            name="name"
            id="name"
            {...register("name", {
              maxLength: 50,
              minLength: 2,
              required: true,
              pattern:
                /^[a-ząčęėįšųūž|A-ZĄČĘĖĮŠŲŪŽ]+(?: [a-ząčęėįšųūž|A-ZĄČĘĖĮŠŲŪŽ]+)*$/,
            })}
          />
        </div>
        {errors.name && (
          <p className="fs-4 text-danger fw-light text-center">
            Būtinas laukelis, tik raidės, 2-50 simbolių.
          </p>
        )}
        <div>
          <select
            className=" input-custom rounded-0"
            name="category"
            id="category"
            {...register("category", { required: true })}
          >
            <option value="Kita">Kita</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <button type="submit">Pridėti</button>
      </form>
    </>
  );
}

export default ItemsForm;
