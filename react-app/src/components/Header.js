/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, { useEffect, useState } from 'react';
//import {  useParams} from "react-router-dom";
//import CurrencyFormat from 'react-currency-format';
//import backIcon from '../images/icon-close.svg';
import Error from './Error';
import Loading from './Loading';
import { mapJsonRichText } from '../utils/renderRichText';
import './Header.scss';
import {getAllProducts} from '../api/persistedQueries';
import LocaleContext from '../LocaleContext';
import { useContext } from "react";

function Header({response}) {

    // params hook from React router
    //const { slug } = useParams();
    //const navigate = useNavigate();
  //  const [response, setResponse] = useState();
    const { locale } = useContext(LocaleContext);
    console.log("headerlocale28",locale)
/*    useEffect(() => {
        // set response to null on change
        setResponse();
        getAllProducts(locale).then(response => setResponse(response));
    }, [locale]);*/
    

    //If query response is null then return a loading icon...
    if(!response) return <Loading />;

    //If there is an error with the GraphQL query
    if(response && response.errors) return <Error errorMessage={response.errors} />;


    //Set properties variable based on graphQL response
    const currentProduct = getHeader(response);
    
    // set references of current 
    const references = response.data.footerList._references;

    if( !currentProduct) {
      return <NoFooterFound />;
    }
    
    return (<div className="footer-detail">
        <HeaderRender {...currentProduct} references={references}/>
    </div>);
}

function HeaderRender({heroTitle,heroImage}) {
    return (<>
        <h1 className="home__tile">Major Electronic Company</h1> <br/>  <br/>
             </>
    );
}

function NoFooterFound() {
    return (
    <div className="adventure-detail">
        <Error errorMessage="Missing data, header could not be rendered." />
  </div>
  );
}

/**
 * Helper function
 * @param {*} response 
 */
function getHeader(response) {

    if(response && response.data && response.data.headerList && response.data.headerList.items) {
        // expect there only to be a single adventure in the array
        if(response.data.headerList.items.length === 1) {
            return response.data.headerList.items[0];
        } else {return response.data.headerList.items[0]}
    }
    return undefined;
}


export default Header;
