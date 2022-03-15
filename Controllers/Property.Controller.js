const createError = require('http-errors')
const API_URI = process.env.REGURU_API_URI
const axios = require('axios')

module.exports = {
  getProperties: async (req, res, next) => { 
    try{
      const response = await axios.get(API_URI) 
       
      res.send(response.data)
    }catch(error){
      console.error(error)
      next(error)
    }
  },
  
  getPropertyById: async (req, res, next) => { 
    try{
      const id = req.params.property_id
      const response = await axios.get(API_URI + `${id}`)
      
      res.send(response.data)
    }catch(error){
      next(error)
    }
  },

  getPropertyByAddress: async (req, res, next) => { 
    try{
      const address = req.params.address
      const response = await axios.get(API_URI + `address/${address}`)
      
      res.send(response.data)
    }catch(error){
      next(error)
    }
  },

  getPropertiesByPrice: async (req, res, next) => { 
    try{
      let priceMin = req.query.priceMin || "0"
      let priceMax = req.query.priceMax || "100000000"
      const response = await axios.get(API_URI + `price/price?priceMin=${priceMin}&priceMax=${priceMax}`)
      
      res.send(response.data)
    }catch(error){
      next(error)
    }
  },

  getPropertiesByBeds: async (req, res, next) => { 
    try{
      const minBeds = req.params.beds
      const response = await axios.get(API_URI + `beds/${minBeds}`)
      
      res.send(response.data)
    }catch(error){
      next(error)
    }
  },

  getPropertiesByBaths: async (req, res, next) => { 
    try{
      const minBaths = req.params.baths
      const response = await axios.get(API_URI + `baths/${minBaths}`)
      
      res.send(response.data)
    }catch(error){
      next(error)
    } 
  },

  getPropertiesBySqft: async (req, res, next) => { 
    try{
      const sqft = req.params.sqft
      const response = await axios.get(API_URI + `sqft/${sqft}`)
      
      res.send(response.data)
    }catch(error){
      next(error)
    } 
  },

  //ex http://localhost:8080/api/properties/query/query?priceMin=100000&priceMax=100000&bedrooms=1&bathrooms=1&sqft=0&limit=2&page=1
  //limit default for API is 10 and page 1. 
  getPropertyByQuery: async(req, res, next) => {
    let priceMin = req.query.priceMin || "0"
    let priceMax = req.query.priceMax || 10000000
    let bathrooms = req.query.bathrooms || "0"
    let bedrooms = req.query.bedrooms || "0"
    let sqft = req.query.sqft || "0"
    let limit = req.query.limit || 10
    let page = req.query.page || 1

    const response = await axios.get(
      API_URI + 
      `query/query?priceMin=${priceMin}&priceMax=${priceMax}&bedrooms=${bedrooms}&bathrooms=${bathrooms}&sqft=${sqft}&limit=${limit}&page=${page}`
      )
    res.send(response.data)
  }
}