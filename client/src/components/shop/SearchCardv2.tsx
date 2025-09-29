import { useState, useEffect, useCallback } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import _ from "lodash";
import useEcomStore from "../../store/ecomStore";

const MIN_PRICE = 0;
const MAX_PRICE = 50000;

export default function SearchCardv2() {
  const {
    actionGetProducts,
    actionSearchFilters,
    actionGetCategories,
    categories,
  } = useEcomStore((state) => state);

  const [text, setText] = useState("");
  const [categorySelect, setCategorySelect] = useState<string[]>([]);
  // Price for filtering
  const [price, setPrice] = useState<number[]>([0, MAX_PRICE]);
  // Price for slider display while dragging
  const [displayPrice, setDisplayPrice] = useState<number[]>([0, MAX_PRICE]);

  // Fetch categories on mount
  useEffect(() => {
    actionGetCategories();
  }, []);

  // Debounced function to fetch products based on filters
  const fetchFilteredProducts = useCallback(
    _.debounce((filters) => {
      // If there are any filters, search, otherwise get all products.
      if (Object.keys(filters).length > 0) {
        actionSearchFilters(filters);
      } else {
        actionGetProducts(undefined);
      }
    }, 500),
    [actionSearchFilters, actionGetProducts]
  );

  // Effect to trigger search when filters change
  useEffect(() => {
    const filters: any = {};
    if (text.trim() !== "") {
      filters.query = text;
    }
    if (categorySelect.length > 0) {
      filters.category = categorySelect;
    }
    // Only include price if it has been changed from the default
    if (price[0] !== 0 || price[1] !== MAX_PRICE) {
      filters.price = price;
    }

    fetchFilteredProducts(filters);

    return () => {
      fetchFilteredProducts.cancel();
    };
  }, [text, categorySelect, price, fetchFilteredProducts]);

  // Sync display price with filter price
  useEffect(() => {
    setDisplayPrice(price);
  }, [price]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleCheckCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = e.target.value;
    setCategorySelect((prev) => {
      if (e.target.checked) {
        return [...prev, categoryId];
      } else {
        return prev.filter((id) => id !== categoryId);
      }
    });
  };

  const handlePriceAfterChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPrice(value);
    }
  };

  const handleDisplayPriceInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: 0 | 1
  ) => {
    const value = e.target.value;
    // Allow empty string or numbers
    if (value === "" || /^[0-9]+$/.test(value)) {
      const newDisplayPrice = [...displayPrice];
      newDisplayPrice[index] = value === "" ? 0 : parseInt(value, 10);
      setDisplayPrice(newDisplayPrice);
    }
  };

  const handlePriceInputBlur = () => {
    let [min, max] = displayPrice;
    if (min > max) {
      [min, max] = [max, min];
    }
    min = Math.max(MIN_PRICE, Math.min(min, MAX_PRICE));
    max = Math.max(MIN_PRICE, Math.min(max, MAX_PRICE));
    setPrice([min, max]);
  };

  const handleResetFilters = () => {
    setText("");
    setCategorySelect([]);
    setPrice([MIN_PRICE, MAX_PRICE]);
    // The useEffect will trigger a refetch with empty filters
  };

  return (
    <div className="p-4 rounded-lg shadow">
      <h1 className="text-xl font-bold text-center mb-4">Search & Filter</h1>

      {/* Search by text */}
      <div className="mb-6">
        <input
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          onChange={handleTextChange}
          placeholder="Search Products..."
          value={text}
        />
      </div>

      {/* Filter by categories */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Categories</h2>
        <div className="max-h-48 overflow-y-auto">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                id={`cat-${category.id}`}
                // value={category.id}
                onChange={handleCheckCategory}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor={`cat-${category.id}`}
                className="capitalize "
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Filter by Price */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Price Range</h2>
        <div className="flex justify-between items-center gap-2 mb-2">
          <input
            type="text"
            value={displayPrice[0]}
            onChange={(e) => handleDisplayPriceInputChange(e, 0)}
            onBlur={handlePriceInputBlur}
            className="w-full border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Min"
          />
          <span className="text-gray-500">-</span>
          <input
            type="text"
            value={displayPrice[1]}
            onChange={(e) => handleDisplayPriceInputChange(e, 1)}
            onBlur={handlePriceInputBlur}
            className="w-full border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Max"
          />
        </div>
        <div>
          <Slider
            onChange={(value) => Array.isArray(value) && setDisplayPrice(value)}
            onAfterChange={handlePriceAfterChange}
            range
            min={MIN_PRICE}
            step={100}
            max={MAX_PRICE}
            value={displayPrice}
            allowCross={false}
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>${displayPrice[0].toLocaleString()}</span>
            <span>${displayPrice[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleResetFilters}
        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
      >
        Reset Filters
      </button>
    </div>
  );
}
