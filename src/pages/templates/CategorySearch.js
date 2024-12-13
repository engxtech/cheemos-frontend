import { SearchOffOutlined, SearchOutlined, SearchRounded } from "@mui/icons-material";

const CategorySearch = () => {
  const categories = [
    "QA",
    "Exploratory",
    "SDET",
    "Automation",
    "Ecommerce",
    "Gaming",
  ];

  return (
    <div className="my-10 mt-10">
      <span className="text-xl font-medium ml-1">Search by category</span>

      <div className="flex flex-wrap gap-10 mt-2">
        {categories.map((category, index) => (
          <button
            key={index}
            className="flex border px-12 py-6 bg-gray-100  rounded-lg shadow-md text-center hover:bg-gray-100"
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
