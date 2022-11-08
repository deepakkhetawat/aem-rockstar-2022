//
// Copyright 2022 Adobe
// All Rights Reserved.
// NOTICE: Adobe permits you to use, modify, and distribute this file in
// accordance with the terms of the Adobe license agreement accompanying
// it.
//
//  Models.swift
//  WKNDAdventures
//

import Foundation

/// # Models
/// This file contains the Swift structs that map to the JSON objects in the AEM Headless responses used by this iOS application.
///
/// ```
/// {                                   // Adventures
///    data: {                          // Data
///      adventureList: {               // AdventuresList
///        items: [
///          {                          // Adventure
///            title: "My Adventure"
///            slug: "my-adventure"
///            ...
///          }
///        ]
///      }
///    }
/// }
/// ```

struct Adventures: Decodable {
    let data: Data
}

struct Data: Decodable {
    let productList: AdventureList
}

struct AdventureList: Decodable {
    let items: [Adventure]
}

/// # Adventure
/// Models a WKND adventure from the JSON response.
/// This is a common model used for both the resulting data of the `wknd/adventures-all` and `wknd/adventure-by-slug` persisted queries, therefore some field are options.
class Adventure: Identifiable, Decodable {
    
    enum CodingKeys: String, CodingKey {
        case productTitle
        case slug
        case productDescription
        case productImage
        case productFeatures
    }
    
    private let productImage: Image
    private let productDescriptionMultiLine: MultiLine?
    private let productFeaturesMultiLine: MultiLine?
    
    let id: UUID = UUID()
    let productTitle: String
    let slug: String

    var price: Double?

    var productDescription: String {
        return productDescriptionMultiLine?.plaintext ?? ""
    }

    var productFeatures: String {
        return productFeaturesMultiLine?.plaintext ?? ""
    }
    
    func image() -> String {
        if !self.productImage._path.isEmpty  {
            return self.productImage._path
        }
        
        return ""
    }
    
    func isEmpty() -> Bool {
        return slug.isEmpty
    }
    
    required init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        
        // Required fields
        // Required fields
        productTitle = try values.decode(String.self, forKey: .productTitle)
        slug = try values.decode(String.self, forKey: .slug)
       // price = try values.decode(Double.self, forKey: .price)
      //  tripLength = try values.decode(String.self, forKey: .tripLength)
        productImage = try values.decode(Image.self, forKey: .productImage)

        // Optional fields
       productDescriptionMultiLine = try values.decodeIfPresent(MultiLine.self, forKey: .productDescription)
        productFeaturesMultiLine = try values.decodeIfPresent(MultiLine.self, forKey: .productFeatures)
    }
    
    init(productTitle: String, slug: String, productDescriptionMultiLine: MultiLine?, productFeaturesMultiLine: MultiLine?, productImage: Image) {
        self.productTitle = productTitle
        self.slug = slug
        self.productDescriptionMultiLine = productDescriptionMultiLine
        self.productFeaturesMultiLine = productFeaturesMultiLine
        self.productImage = productImage
    }
           
    static func empty() -> Adventure {
        return Adventure(productTitle: "", slug: "", productDescriptionMultiLine: nil, productFeaturesMultiLine: nil, productImage: Image(_path: "", _authorUrl: "", _publishUrl: "", mimeType: "", width: 0, height: 0))
    }
}

struct Image: Decodable {
    let _path: String
    let _authorUrl: String?
    let _publishUrl: String?
    let mimeType: String
    let width: Int
    let height: Int
}

struct MultiLine: Decodable {
    let plaintext: String?
    let html: String?
}
