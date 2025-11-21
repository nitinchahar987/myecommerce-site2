import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cart from './Cart';
import Footer from './Footer';
import Category from './category';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

function App() {
  const [categ, setcateg] = useState([]);
  const [finalproducts, setfinalproducts] = useState([]);
  const [selectedcat, setselectedcat] = useState("Laptops");
 const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
});
 const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      alert("Item already in cart!");
      return;
    }
    setCart([...cart, { ...product, quantity: 1 }]);
  };
const increaseQuantity = (productId) => {
  setCart(cart.map(item =>
    item.id === productId
      ? { ...item, quantity: item.quantity + 1 }
      : item
  ));
};

const decreaseQuantity = (productId) => {
  setCart(cart.map(item => {
    if (item.id === productId) {
      if (item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
    }
    return item;
  }));
};
  const removeFromCart = (productId) => {
  setCart(cart.filter(item => item.id !== productId));
};

 

  const getproduct = () => {
    axios.get(`https://dummyjson.com/products/category/${selectedcat}`)
      .then((res) => setfinalproducts(res.data.products));
  };

  const getcatagory = () => {
    axios.get("https://dummyjson.com/products/categories")
      .then((res) => setcateg(res.data));
  };
  useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

  useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);
  useEffect(() => { getcatagory(); }, []);
  useEffect(() => { getproduct(); }, [selectedcat]);

  let productss = finalproducts.map((v, i) => (
    <div data-aos="fade-up" key={i}>
      <Productitems v={v} addToCart={addToCart} />
    </div>
  ));

  return (
    <Router>
      <Routes>

        
        <Route
          path="/Ecommerce-site"
          element={
            <div className='mydiv'>
              <div className='max-w-[1320px] mx-auto px-4'>
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-10 text-white text-center rounded-b-2xl mb-6">
                  <h1 className="text-4xl font-extrabold mb-2">Welcome to MyStore</h1>
                  <p className="text-lg">Shop the best products from top brands</p>
                </div>

                <h1 className='text-center text-3xl font-extrabold text-gray-800 mb-6 tracking-wide' data-aos="zoom-in">
                  Explore Our Products
                </h1>

                <div className='ml-10 bg-yellow-200 w-20 rounded-sm absolute right-3 top-40'>
                  <i className="fa-solid fa-cart-shopping"> </i>
                  <Link to="/Cart">Cart</Link>
                  <span className='absolute top-0 right-3'>{cart.length}</span>
                </div>

                <div className='grid grid-cols-[30%_auto] gap-[20px] mt-8'>
                  <div className='ml-3 '>
                    <Category categ={categ} setselectedcat={setselectedcat} selectedcat={selectedcat} />
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' data-aos="fade-up">
                    {finalproducts.length > 0 ? productss : (
                      <div className="col-span-3 text-center text-gray-600 text-lg">Loading products...</div>
                    )}
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          }
        />

       
        <Route
  path="/Cart"
  element={<Cart cart={cart} removeFromCart={removeFromCart}
   increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity} />}
/>

      </Routes>
    </Router>
  );
}

export default App;

function Productitems({ v, addToCart }) {
  return (
    <div className='bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300' data-aos="zoom-in">
      <img src={v.images[0]} alt={v.title} className="w-full h-full object-cover" loading="lazy" />
      <div className='p-4'>
        <h4 className='text-gray-600 text-sm'>Brand: <span className='font-bold'>{v.brand}</span></h4>
        <h4 className='text-xl font-semibold text-gray-800 mt-1'>{v.title}</h4>
        <p className='text-red-500 font-bold mt-2'>₹{v.price * 100}</p>
        <button
          onClick={() => addToCart(v)}
          className='mt-4 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded hover:from-blue-600 hover:to-indigo-700 transition'
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
