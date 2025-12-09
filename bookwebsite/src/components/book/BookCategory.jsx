import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Note: This component uses Tailwind CSS for styling and assumes it is available.

const CategoryButton = ({ name, isActive, onClick }) => (
  <button
    className={`
      px-5 py-2 m-1 text-sm font-medium transition-all duration-300 rounded-full shadow-md
      whitespace-nowrap 
      ${isActive 
        ? 'bg-blue-600 text-white shadow-blue-400/50 hover:bg-blue-700' 
        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:shadow-lg'
      }
    `}
    onClick={onClick}
  >
    {name}
  </button>
);


const BookCategory = () => {
  const navigate = useNavigate();
  // State to track the currently selected category
  const [category, setCategory] = useState("all"); 
  
  // Define a comprehensive list of categories, including the default "All"
  const categoryList = [
    "Mystery",
    "Fiction",
    "Thriller",
    "Adventure",
    "Fantasy",
    "Dystopia",
    "Biography",
  ];

  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
    
    const query = selectedCategory === "All" ? "" : `?category=${selectedCategory}`;
    navigate(`/explore${query}`);
  };

  return (
    <div className="w-full bg-blue-50 py-4 shadow-inner border-t border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-xl font-bold text-blue-900 mb-3 text-center sm:text-left">
          Explore by Genre
        </h3>
        <div className="flex overflow-x-auto pb-2 -mb-2 scrollbar-hide">
          {categoryList.map((cat, index) => (
            <CategoryButton 
              key={index}
              name={cat}
              isActive={category === cat}
              onClick={() => handleCategoryClick(cat)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookCategory;