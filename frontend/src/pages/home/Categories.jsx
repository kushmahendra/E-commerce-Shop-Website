import React from 'react'

import category1 from '../../assets/category-1.jpg'
import category2 from '../../assets/category-2.jpg'
import category3 from '../../assets/category-3.jpg'
import category4 from '../../assets/category-4.jpg'
import { Link } from 'react-router-dom'

const Categories = () => {
    const categories=[
        // {name:'Accessories',path:'accessories',image:category1},
        // {name:'Dress Collection',path:'dress',image:category2},
        // {name:'Jewellery',path:'jewellery',image:category3},
        // {name:'Cosmetics',path:'Cosmetics',image:category4},
        {name:'Accessories',path:'accessories',image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWZSlkb2QL69_ef7m-rHEz4IgUxTztfkxULw&s"},
        {name:'Dress Collection',path:'dress',image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsTEpgQAeDjk8gkRyQLYoEoY96qKUUgq6Ngg&s"},
        {name:'Jewellery',path:'jewellery',image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyoZAKJDiRNxlMn7QkSfNx4U_mbVj__1uo94-NV5P5DxEeM3ev9osR9d3tNOyMR_wMuyE&usqp=CAU"},
        {name:'Cosmetics',path:'Cosmetics',image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqmDAStS-cBkoup0G58zn6JE66seHsvC372Q&s"},
    ]
  return (
  <>
  <div className='product__grid'>
    {
        categories.map((category)=>(
            <Link key={category.name} to={`/categories/${category.path}`} className='categories__card'>
                <img src={category.image} alt={category.name} />
                <h4>{category.name}</h4>
            </Link>
        ))
    }
    </div></>
  )
}

export default Categories