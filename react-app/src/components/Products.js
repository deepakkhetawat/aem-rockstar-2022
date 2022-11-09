/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import {getAllProducts, getProductByCategory} from '../api/persistedQueries';
import Error from './Error';
import Loading from './Loading';
import './Products.scss';
import LocaleContext from '../LocaleContext';
import { useContext } from "react";
import Footer from './Footer';

function Products({productCategory}) {

    const { locale } = useContext(LocaleContext);
    const [response, setResponse] = useState();
    console.log("Products",locale);
    console.log("productCategory",productCategory);
    useEffect(() => {

        // set response to null while fetching the new data (prompts loading icon)
        setResponse();
console.log("30");
        // if an category is set (i.e "appliances", "wearables"...)
        if(productCategory && productCategory !== '') {
                console.log("33");
            getProductByCategory(productCategory, locale)
                .then(response => setResponse(response));

        }
        else {
        console.log("38");
            getAllProducts(locale)
                .then(response => setResponse(response));
        }
      }, [productCategory, locale])

    //If response is null then return a loading state...
    if(!response) return <Loading />;

    //If there is an error with the GraphQL query
    if(response && response.errors) return <Error errorMessage={response.errors} />;
    
    return (
        <div className="adventures">
          <ul className="adventure-items">
            {
                //Iterate over the returned data items from the query
                response.data.productList.items.map((adventure) => {
                    return (
                        <ProductListItem key={adventure.slug} {...adventure} />
                    );
                })
            }
            </ul>
      <Footer response={response}/>
        </div>
    );
}

//         Price:    <CurrencyFormat value={productCentralInfoFragment.productPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} />
function ProductListItem({productTitle, slug, productImage, productModel, isProductNew, productCategory}) {
    const { locale } = useContext(LocaleContext);
  var productNew = false;
  var productStatus = "";
  if(isProductNew) {
  productStatus = "NEW"
  }
  if(!productTitle || !slug || !productImage ) {
    return null;
  }
  let productPath= `/product/${locale}/${slug}/`;
  return (
        <li className="adventure-item">
          <Link to={productPath}>
            <img className="adventure-item-image" src={productImage._path} width ="100px" height= "100px"
                 alt={productTitle}/>
          </Link>
          <div className="adventure-item-length-price">
                    <div className="adventure-item-title">{productTitle}</div>
                   <br/>   Category: {productCategory.toUpperCase()} <br/>
                  <div className="adventure-item-length">
                      Model: {productModel}
                  <br/> <b> {productStatus} </b> <br/>
                  </div>
          <br/>
          </div>
      </li>
      );
}

export default Products;
