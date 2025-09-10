import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import useEcomStore from "../../../store/ecomStore";

export default function SearchCard() {
  const {
    actionGetProducts,
    actionSearchFilters,
    actionGetCategories,
    categories,
  } = useEcomStore((state) => state);
  const [text, setText] = useState("");
  const [categorySelect, setCategorySelect] = useState<string[]>([]);
  const [price, setPrice] = useState([3000, 800000]);
  const [ok, setOk] = useState(false);

  // search by text
  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text });
      } else {
        actionGetProducts(undefined);
      }
    }, 500);
    return () => clearTimeout(delay);
  }, [text]);

  // search by category
  const handleCheckCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inCheck = e.target.value;
    const inState = [...categorySelect]; //[]
    const index = inState.indexOf(inCheck);
    if (index === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(index, 1);
    }
    setCategorySelect(inState);
    if (inState.length > 0) {
      actionSearchFilters({ category: inState });
    } else {
      actionGetProducts(undefined);
    }
  };

  useEffect(() => {
    actionGetCategories();
  }, []);

  // search by price

  const handleFilterPrice = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPrice(value);
      setTimeout(() => {
        setOk(!ok);
      }, 300);
    }
  };

  useEffect(() => {
    actionSearchFilters({ price });
  }, [ok]);

  return (
    <div>
      {/* search bar */}
      <div>
        <h1 className="text-xl font-bold text-center mb-2">Search Products</h1>
        <input
          className="border rounded px-2 py-1"
          type="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder="Search Products"
          id="search"
          value={text}
        />
      </div>

      {/* categories */}
      <div>
        <h1 className="mt-10 text-xl font-bold text-center mb-2">Categories</h1>
        {categories.map((category) => {
          return (
            <div key={category.id} className="flex gap-4 items-center">
              <input
                className="border rounded"
                type="checkbox"
                id={category.id}
                value={category.id}
                onChange={handleCheckCategory}
              />
              <label className="mr-2 capitalize" htmlFor={category.id}>
                {category.name}
              </label>
            </div>
          );
        })}
      </div>

      {/* Price */}
      <div>
        <h1 className="mt-10 text-xl font-bold text-center mb-2">
          Range Price
        </h1>
        <div>
          <div className="flex justify-between">
            <span>Min : {price[0]}</span>
            <span>Max : {price[1]}</span>
          </div>
          <Slider
            onChange={handleFilterPrice}
            defaultValue={price}
            range
            min={0}
            max={200000}
          />
        </div>
      </div>
    </div>
  );
}
