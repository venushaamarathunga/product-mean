import React from "react";

export default function CreateProductPage() {
  return (
    <form className="p-6 bg-[rgba(var(--card))] rounded-lg shadow-md mt-10">
      <div className="space-y-12 border-[rgba(var(--border))]">
        <h2 className="text-2xl text-center font-semibold text-[rgb(var(--copy-primary))]">Create New Product</h2>

        <div className="mt-10 gap-x-6 gap-y-8 w-[80vw] max-w-7xl  mx-auto">
          <div className="sm:col-span-4 mt-5">
            <label htmlFor="productName" className="block text-lg font-medium text-[rgb(var(--copy-secondary))]">
              Product Name
            </label>
            <div className="mt-2">
              <div className="flex rounded-md bg-[rgba(var(--copy-secondary))] border border-[rgba(var(--border))] pl-3 focus-within:border-[rgb(var(--cta))]">
                <input id="productName" name="productName" type="text" className="block w-full bg-transparent py-1.5 pr-3 pl-1 text-lg text-[rgb(var(--copy-primary))] placeholder:text-[rgb(var(--copy-secondary))] focus:outline-none" />
              </div>
            </div>
          </div>

          <div className="sm:col-span-4 mt-5">
            <label htmlFor="price" className="block text-lg font-medium text-[rgb(var(--copy-secondary))]">
              Price
            </label>
            <div className="mt-2">
              <div className="flex rounded-md bg-[rgba(var(--copy-secondary))] border border-[rgba(var(--border))] pl-3 focus-within:border-[rgb(var(--cta))]">
                <input id="price" name="price" type="number" className="block w-full bg-transparent py-1.5 pr-3 pl-1 text-lg text-[rgb(var(--copy-primary))] placeholder:text-[rgb(var(--copy-secondary))] focus:outline-none" />
              </div>
            </div>
          </div>

          <div className="sm:col-span-4 mt-5">
            <label htmlFor="image" className="block text-lg font-medium text-[rgb(var(--copy-secondary))]">
              Image URL
            </label>
            <div className="mt-2">
              <div className="flex rounded-md bg-[rgba(var(--copy-secondary))] border border-[rgba(var(--border))] pl-3 focus-within:border-[rgb(var(--cta))]">
                <input id="image" name="image" type="text" className="block w-full bg-transparent py-1.5 pr-3 pl-1 text-lg text-[rgb(var(--copy-primary))] placeholder:text-[rgb(var(--copy-secondary))] focus:outline-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-x-6">
          <button type="button" className="rounded-md text-sm font-semibold bg-red-600 px-3 py-2 text-white hover:text-[rgb(var(--cta-active))] transition">
            Cancel
          </button>
          <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white shadow-md hover:bg-[rgb(var(--cta-active))] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--cta))] transition">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
