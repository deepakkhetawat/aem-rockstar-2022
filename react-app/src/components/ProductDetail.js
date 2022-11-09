/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams} from "react-router-dom";
import CurrencyFormat from 'react-currency-format';
//import backIcon from '../images/icon-close.svg';
import backIcon from '../images/back.png';
import Error from './Error';
import Loading from './Loading';
import { mapJsonRichText } from '../utils/renderRichText';
import './ProductDetail.scss';
import { getProductBySlug } from '../api/persistedQueries';
import Footer from './Footer';

//import { useContext } from "react";

function ProductDetail() {

    // params hook from React router
     var   {  locale, slug } = useParams();
    const navigate = useNavigate();
    const [response, setResponse] = useState();

    useEffect(() => {
        // set response to null on change
        setResponse();
      //  const productSlug = slug.substring(1);
        getProductBySlug(slug, locale)
            .then(response => setResponse(response));
    }, [slug,locale]);
    

    //If query response is null then return a loading icon...
    if(!response) return <Loading />;

    //If there is an error with the GraphQL query
    if(response && response.errors) return <Error errorMessage={response.errors} />;


    //Set adventure properties variable based on graphQL response
    const currentProduct = getProduct(response);
    
    // set references of current adventure
    const references = response.data.productList._references;

    //Must have title, path, and image
    if( !currentProduct) {
      return <NoProductFound />;
    }

    return (<div className="adventure-detail">
        <button className="adventure-detail-close-button" onClick={() => navigate(-1)} >
            <img className="Backbutton-icon" src={backIcon} alt="Return" />
        </button>
        <ProductDetailRender {...currentProduct} references={references}/>
       <Footer response={response}/>
    </div>);
}

function ProductDetailRender({productTitle,
                                productImage,
                                productCategory,
                                productModel,isProductNew,
                                productDescription,productFeatures,articleFragments}) {

     let articleTitle = "";
    if( articleFragments[0] && articleFragments != "undefined") {
      articleTitle = articleFragments[0].articleTitle;
    }
  var productNew = false;
  var productStatus = "No";
  if(isProductNew) {
  productStatus = "Yes"
  }
// <CurrencyFormat value={productCentralInfoFragment.productPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} />
    return (<>
            <h1 className="product-detail-title">{productTitle}</h1>
            <div className="product-detail-info">
                <div className="product-detail-info-label"> Category</div>
                <div className="product-detail-info-description">{productCategory}</div> <br/>
                <div className="product-detail-info-label">Model</div>
                <div className="product-detail-info-description">
                   {productModel}
                </div>
                <div className="product-detail-info-label"> Is it new ? </div>
                <div className="product-detail-info-description">
                  {productStatus}
                </div>
            </div>
            <div className="product-detail-content">
             <div className="productImage">   <img className="product-detail-primaryimage"
                    src={productImage._path} alt={productTitle} /> </div> <br/>
            <div> <br/> <b>Product Details  </b>  <br/>   {mapJsonRichText(productDescription.json)} </div>
            <div>  <br/>  <b>Product Features </b> <br/> {mapJsonRichText(productFeatures.json)} </div>  <br/>
            <div>   <br/>   <br/>   <br/>  <br/> <b> Related Article  </b>  <a href="#"> {articleTitle}  </a> </div>
            </div>
             </>
    );
}


function NoProductFound() {
    return (
    <div className="adventure-detail">
        <Link className="adventure-detail-close-button" to={"/"}>
            <img className="Backbutton-icon" src={backIcon} alt="Return" />
        </Link>
        <Error errorMessage="Missing data, adventure could not be rendered." />
  </div>
  );
}

/**
 * Helper function to get the first adventure from the response
 * @param {*} response 
 */
function getProduct(response) {

    if(response && response.data && response.data.productList && response.data.productList.items) {
        // expect there only to be a single adventure in the array
        if(response.data.productList.items.length === 1) {
            return response.data.productList.items[0];
        } else {return response.data.productList.items[0]}
    }
    return undefined;
}


export default ProductDetail;
