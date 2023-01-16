import React from "react";
import { setCategory } from "../../../redux/category/slice";
import { useAppDispatch } from "../../../redux/store";

type CategoriesProps = {
  categoriesList: string[];
  value: number;
};

export const Categories: React.FC<CategoriesProps> = ({
  categoriesList,
  value,
}) => {
  const dispatch = useAppDispatch();

  return (
    <ul className="products__categories">
      {categoriesList.map((title, _id) => (
        <li
          className={value === _id ? "active" : ""}
          onClick={() => dispatch(setCategory(_id))}
          key={_id}
        >
          {title}
        </li>
      ))}
    </ul>
  );
};
