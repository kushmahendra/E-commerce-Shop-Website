import React, { useState, useEffect } from 'react';
import ProductCards from '../shop/ProductCards';
import { getBaseUrl } from '../../utils/baseURL';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // List of categories for dynamic placeholder
  const placeholders = ['accessories', 'dress', 'jewellery', 'cosmetics'];
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);

  useEffect(() => {
    // Fetch all products on component mount
    fetchAllProducts();
    // Rotate the placeholder text every 2 seconds
    // const interval = setInterval(() => {
    //   setCurrentPlaceholder((prev) => {
    //     const currentIndex = placeholders.indexOf(prev);
    //     const nextIndex = (currentIndex + 1) % placeholders.length;
    //     return placeholders[nextIndex];
    //   });
    // }, 2000);

    // return () => clearInterval(interval);
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(getBaseUrl() + '/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setProducts(data.products);
        setFilteredProducts(data.products); // Initialize with all products
      } else {
        console.warn('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Search products</h2>
        <p className="section__subheader">
          Browse a diverse range of categories, from chic dresses to versatile
          accessories. Elevate your style today!
        </p>
      </section>
      <section className="section__container">
        <div className="w-full mb-10 flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar w-full max-w-4xl p-2 border rounded"
            placeholder={`Search for ${currentPlaceholder}`}
          />
          <button
            onClick={handleSearch}
            className="search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded"
          >
            Search
          </button>
        </div>
        <ProductCards products={filteredProducts} />
      </section>
    </>
  );
};

export default Search;


// import { React, useState, useEffect } from 'react';
// import productsData from '../../data/products.json';
// import ProductCards from '../shop/ProductCards';
// import { useSelector } from 'react-redux';

// const Search = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState(productsData);
//   console.log('daaaata',productsData )
 

//   // List of categories for dynamic placeholder
//   const placeholders = ['accessories', 'dress', 'jewellery', 'cosmetics'];
//   const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);

//   const handleSearch = () => {
//     const query = searchQuery.toLowerCase();
//     const filtered = productsData.filter(
//       (product) =>
//         product.name.toLowerCase().includes(query) ||
//         product.description.toLowerCase().includes(query)
//     );
//     setFilteredProducts(filtered);
//   };

//   // // useEffect(() => {
//   // //   // Set an interval to change the placeholder every 2 seconds
//   //   // const interval = 
//   //   setInterval(() => {
//   //     setCurrentPlaceholder((prev) => {
//   //       const currentIndex = placeholders.indexOf(prev);
//   //       const nextIndex = (currentIndex + 1) % placeholders.length;
//   //       return placeholders[nextIndex];
//   //     });
//   //   }, 2000); // Change every 2 seconds

//   // //   // Cleanup interval on component unmount
//   // //   return () => clearInterval(interval);
//   // // }, []);

//   return (
//     <>
//       <section className='section__container bg-primary-light'>
//         <h2 className='section__header capitalize'>Search products</h2>
//         <p className='section__subheader'>
//           Browse a diverse range of categories, from chic dresses to versatile
//           accessories, Elevate your style today
//         </p>
//       </section>
//       <section className='section__container'>
//         <div className='w-full mb-10 flex flex-col md:flex-row items-center justify-center gap-4'>
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className='search-bar w-full max-w-4xl p-2 border rounded'
//             placeholder={`Search for ${currentPlaceholder}`}
//           />

//           <button
//             onClick={handleSearch}
//             className='search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded'
//           >
//             Search
//           </button>
//         </div>
//         <ProductCards products={filteredProducts} />
        
//       </section>
//     </>
//   );
// };

// export default Search;
