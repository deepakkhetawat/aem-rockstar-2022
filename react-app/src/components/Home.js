/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, {useState,useContext} from 'react';
import LocaleContext from "../LocaleContext";
import LocaleSwitcher from "../LocaleSwitcher";
import Products from './Products';


/***
 * Displays a grid of current adventures
 */
 function Home() {
    const [productCategory, setProductCategory] = useState('');
    //console.log("productCategory",productCategory);
const [locale, setLocale] = useState(useContext(LocaleContext).locale);
    return (
      <div className="Home">
        <h1 className="home__tile">Major Electronic Company</h1> <br/>  <br/>
        <LocaleContext.Provider value={{locale, setLocale}}>
        <LocaleSwitcher/> <br/>  <br/>

        <div className="product-nav">
          <button className="" onClick={() => setProductCategory('')}>All</button>
          <button onClick={() => setProductCategory('mobile')}>Mobile</button>
          <button onClick={() => setProductCategory('laptops')}>Laptop</button>
          <button onClick={() => setProductCategory('wearables')}>Wearables</button>
          <button onClick={() => setProductCategory('appliances')}>Appliances</button>
        </div>  <br/>
        <Products productCategory={productCategory} />
        <hr/>
       </LocaleContext.Provider>
    </div>
    );
}

export default Home;