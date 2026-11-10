"use client";

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Check,
  ChevronDown,
} from "lucide-react";

const categories = [
  "All",
  "Silk Sarees",
  "Daily Wear",
  "Designer Sarees",
  "Cotton Sarees",
  "Party Wear",
  "Festive Weaves",
  "Bridal Heritage",
];

const colors = [
  "#4B0008",
  "#350000",
  "#FFB900",
  "#FFD633",
  "#E8A000",
  "#D6A640",
  "#B58D68",
  "#995500",
  "#F5EB68",
  "#FFF1BD",
];

const SareeCollectionFilter = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeColor, setActiveColor] = useState(colors[0]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Featured Picks");
  const [fabric, setFabric] = useState("All Fabrics");

  const handleReset = () => {
    setActiveCategory("All");
    setActiveColor(colors[0]);
    setSearch("");
    setSort("Featured Picks");
    setFabric("All Fabrics");
  };

  return (
    <section className="w-full bg-[#FBF7EA] px-4 py-6 sm:px-6 lg:px-8">

      <div className="mx-auto container">

        {/* Header Section */}
        <div className="flex flex-col justify-between gap-5 border-b border-[#E8D9B8] pb-6 lg:flex-row lg:items-center">

          {/* Heading */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#4B0008] sm:text-4xl">
              Our Saree Collection
            </h2>

            <p className="mt-1 text-sm tracking-wide text-[#995500] sm:text-lg">
              Discover something beautiful for every occasion.
            </p>
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col gap-3 sm:flex-row">

            {/* Search */}
            <div className="flex items-center gap-3 rounded-full border border-[#E8A000] bg-white px-4 py-3 transition focus-within:ring-2 focus-within:ring-[#E8A000]/30 sm:w-[280px] lg:w-[360px]">
              <Search className="h-5 w-5 shrink-0 text-[#995500]" />

              <input
                type="search"
                placeholder="Search sarees, codes, weaves..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm text-[#4B0008] outline-none placeholder:text-[#B58D68]"
              />
            </div>

            {/* Sort */}
            <div className="relative sm:w-[210px]">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-full border border-[#E8A000] bg-white px-5 py-3 pr-10 text-sm font-semibold text-[#4B0008] outline-none focus:ring-2 focus:ring-[#E8A000]/30"
              >
                <option>Featured Picks</option>
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Best Selling</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4B0008]" />
            </div>

          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2.5 overflow-x-auto py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 sm:px-6 sm:text-base ${
                activeCategory === category
                  ? "border-[#4B0008] bg-[#4B0008] text-[#FFD633] shadow-md"
                  : "border-[#E8C98C] bg-white text-[#4B0008] hover:border-[#4B0008] hover:bg-[#FFF1BD]"
              }`}
            >
              {category}
            </button>
          ))}

        </div>

        {/* Color and Fabric Filters */}
        <div className="flex flex-col gap-5 rounded-[20px] border border-[#F0DFC0] bg-white/90 p-4 shadow-sm sm:p-5 lg:flex-row lg:items-center lg:justify-between">

          {/* Color Palette */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">

            <div className="flex shrink-0 items-center gap-2 text-sm font-bold tracking-wide text-[#995500]">
              <SlidersHorizontal className="h-4 w-4" />
              PALETTE ACCENT:
            </div>

            <div className="flex flex-wrap items-center gap-2">

              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  aria-label={`Select color ${color}`}
                  aria-pressed={activeColor === color}
                  onClick={() => setActiveColor(color)}
                  style={{ backgroundColor: color }}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#D6C49F] transition-all duration-300 hover:scale-110 ${
                    activeColor === color
                      ? "scale-110 ring-2 ring-[#E8A000] ring-offset-2"
                      : ""
                  }`}
                >
                  {activeColor === color && (
                    <Check className="h-4 w-4 text-white" strokeWidth={3} />
                  )}
                </button>
              ))}

            </div>
          </div>

          {/* Fabric and Reset */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

            {/* Fabric */}
            <div className="relative">
              <select
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-[#E8A000] bg-white px-5 py-2.5 pr-10 text-sm font-semibold text-[#4B0008] outline-none focus:ring-2 focus:ring-[#E8A000]/30 sm:w-auto"
              >
                <option>All Fabrics</option>
                <option>Silk</option>
                <option>Cotton</option>
                <option>Georgette</option>
                <option>Chiffon</option>
                <option>Organza</option>
                <option>Linen</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4B0008]" />
            </div>

            {/* Reset */}
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#995500] transition-all duration-300 hover:bg-[#FFF1BD] hover:text-[#4B0008]"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};

export default SareeCollectionFilter;