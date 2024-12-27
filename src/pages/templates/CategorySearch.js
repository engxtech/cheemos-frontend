import { SearchOffOutlined, SearchOutlined, SearchRounded } from "@mui/icons-material";

const CategorySearch = () => {
  const categories = [
    "Gaming",
    "Exploratory",
    "SDET",
    "Automation",
    "Ecommerce",
    "QA",

  ];

  return (
    <div className="my-10 mt-10">
      <span className="text-xl  font-medium ml-1">Search by category</span>

      <div className="flex flex-wrap sm:gap-10  gap-8 mt-2">
        {categories.map((category, index) => (
          <button
            key={index}
            className="flex border border-gray-100 sm:px-12 sm:py-4 px-4 py-2 bg-gray-100  rounded-lg shadow-md text-center hover:bg-gray-100"
          >
            <p className="mr-2">
              <SearchOutlined/>
              </p>
            {category}
         
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySearch;
