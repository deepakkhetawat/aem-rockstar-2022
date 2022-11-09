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
import './Footer.scss';
//import { getAllFooter } from '../api/persistedQueries';
import {getAllProducts} from '../api/persistedQueries';
import LocaleContext from '../LocaleContext';
import { useContext } from "react";

function Footer({response}) {

    // params hook from React router
    //const { slug } = useParams();
    //const navigate = useNavigate();
  //  const [response, setResponse] = useState();
    //const { locale } = useContext(LocaleContext);
   // console.log("footerlocale28",locale)
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
    const currentProduct = getFooter(response);
    
    // set references of current 
    const references = response.data.footerList._references;

    if( !currentProduct) {
      return <NoFooterFound />;
    }
    
    return (<div className="footer-detail">
        <FooterRender {...currentProduct} references={references}/>
    </div>);
}
//            <div className="footerLinks"> {mapJsonRichText(footerTitle.markDown)} </div>
    //        <div className="contactUsHeading2"> {mapJsonRichText(footerContactUs.contactUsDescription.json)} </div>
function FooterRender({footerTitle,footerContactUs}) {
    console.log("footerTitle",footerTitle);
    return (<>
            <div className="footerLinks">{mapJsonRichText(footerTitle.json)} </div>

            <div className="contactUsHeading"> {footerContactUs.contactUsHeading} </div> <br/>

            <div className="contactUsHeading2"> {mapJsonRichText(footerContactUs.contactUsDescription.json)} </div>
             </>
    );
}

function NoFooterFound() {
    return (
    <div className="product-detail">
        <Error errorMessage="Missing data." />
  </div>
  );
}

/**
 * Helper function
 * @param {*} response 
 */
function getFooter(response) {

    if(response && response.data && response.data.footerList && response.data.footerList.items) {
        // expect there only to be a single adventure in the array
        if(response.data.footerList.items.length === 1) {
            return response.data.footerList.items[0];
        } else {return response.data.footerList.items[0]}
    }
    return undefined;
}


export default Footer;
