/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

/**
 * persistedQueries.js - provides a wrapper utility of persisted queries that are expected to be available on the AEM environment
 */
import { aemHeadlessClient , mapErrors} from "./headlessClient";

/**
 * Queries a list of all Products  using the persisted path "mec/all-products-by-locale"
 * @returns {data, errors}
 */
export const getAllProducts = async function(locale) {
    const queryVariables = {'locale': locale};
    return executePersistedQuery('mec/all-products-header-footer-by-locale', queryVariables);
}

export const getAllContact = async function(locale) {
    const queryVariables = {'locale': locale};
    return executePersistedQuery('mec/all-contact-by-locale', queryVariables);
}

export const getAllFooter = async function(locale) {
    const queryVariables = {'locale': locale};
    return executePersistedQuery('mec/all-footer-by-locale', queryVariables);
}

/**
 * Queries a single product based on its slug to a content fragment
 * uses persisted path 'mec/product-by-slug-by-locale'
 * @param {*} productSlug
 * @returns 
 */
 export const getProductBySlug = async function(productSlug, locale) {
    const queryVariables = {'name': productSlug, 'locale': locale};
    return executePersistedQuery('mec/products-header-footer-by-slug-locale', queryVariables);
}

/**
 * using the persisted path 'products-header-footer-by-category-locale'
 * @param {*} productCategory
 * @returns 
 */
export const getProductByCategory = async function(productCategory,locale) {
    const queryVariables = { 'name': productCategory,'locale': locale }; // expected query variables
    return executePersistedQuery('mec/products-header-footer-by-category-locale', queryVariables);
}


/**
 * Uses the AEM Headless SDK to execute a query based on a persistedQueryPath and optional query variables
 * @param {*} persistedQueryPath 
 * @param {*} queryVariables 
 * @returns 
 */
 const executePersistedQuery = async function(persistedQueryPath, queryVariables) {

    let data;
    let errors;

    try {
        // AEM GraphQL queries are asynchronous, either await their return or use Promise-based .then(..) { ... } syntax
        const response = await aemHeadlessClient.runPersistedQuery(persistedQueryPath, queryVariables);
        // The GraphQL data is stored on the response's data field
        data = response.data;
        errors = response.errors ? mapErrors(response.errors) : undefined;
    } catch (e) {
        console.error(e.toJSON());
        errors = e;
    }

    return {data, errors}; 
}
