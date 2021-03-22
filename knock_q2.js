// Problem:
//At Knock we deal with data vendors all across the country. Please write a function 
//that can take varying JSON data input sources representing a property on a MLS 
//(multiple listing service) and send them to our fictional CRM endpoint. You should 
//make an http post call to the CRM endpoint in the function for a customer with the 
//id 762910. The function should take in one of the MLS JSON input sources at a time. 
//Keep in mind that the data sources will grow with each new city we add so try and think 
//through the implications of this. The CRM endpoint is not real so you will need to mock 
//out the test calls.

// Assumptions:
// My function jsonIn has two input parameters, a json object and customer ID. The customerID
//takes in an integer that I assume identifies the cutomer is uploading an MLS. I also assume
//that the function takes in one JSON object at a time with the MLS information and posts it 
//to the endpoint. With the growing number of listing per city, there will need to be checks
//that there are no multiple listings for the same address so there will need to check that the new POST
//listing does not exist if the address, city, and zip code all match. There could be a listing with similar
//address and city name but different state, that I assume is acceptable as long as the city exists.
//I assume that the API will control the required json data points that need to be included in the POST
//so I will not worry about the required data points. From reading the instructions I assume
//only one object listing to POST at a time so I will not go through the array of JSON objects.
//I assume for now we will take in a perfect customer ID that exists but in production we would have to 
//check our backend for existing customer who is logged in so the POST can be link to that account.


//Payload
//mls_name - (string, required) which mls the property belongs to
//mls_id - (number, required) a unique identifier within the mls supplied
//street_address - (string, required) the number and street name of the property
//city - (string, required) the name of the city the property is in
//state - (string, required) the name of the state the property is in
//zip_code - (number, required) a 5 digit value for zip code of the property
//list_price - (number, required) how much the property is listed for. This should be an integer, example 400000
//list_date - (number, required) a Unix timestamp indicating the date the property was listed on. example 1525143600
//bedrooms - (number) how many bedrooms the property has
//full_baths - (number) how many full bathrooms the property has
//half_baths - (number) how many half bathrooms the property has
//size - (number) how many square feet the property has


//example of JSON object MLS listing POST
let json_A =   {
    "data_name": "ga_fmls",
    "vendor_id": "76257",
    "address_components": {
      "address": "176 Milton Ave, Atlanta, GA 30317",
      "street_name": "Milton",
      "street_number": "176",
      "street_suffix": "Ave",
      "city": "Atlanta",
      "state": "GA",
      "zipcode": "30317"
    },
    "list": "$275,000",
    "date": "2018-05-02T04:19:27-04:00",
    "property": {
      "bed_count": "3",
      "bath_count": "2",
      "half_bath_count": "1",
      "square_feet": "2300"
    }
  }


function jsonIn(object, customerID) {

    let editPrice = parseInt(object.list.replace(/$|,/g,''))//remove $ and ,
    let editZipcode = parseInt(object.address_components.zipcode)
    let editBedrooms = parseInt(object.property.bed_count)
    let editFullBaths = parseInt(object.property.bath_count)
    let editHalfBaths = parseInt(object.property.half_bath_count)
    let editSize =  parseInt(object.property.square_feet)
    let editDate = new Date(object.date).valueOf()//turn it to UNIX timestamp
    
    
    const url = "https://knock-crm.io/customer/" + customerID.toString() + "/properties"
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'applicaton/json',
        },
        body: JSON.stringify({
            mls_name : object.data_name,
            mls_id: object.vendor_id,
            street_address: object.address_components.street_number + " " + object.address_components.street_name,
            city: object.address_components.city,
            state: object.address_components.state,
            zip_code: editZipcode,
            list_price: editPrice,
            list_date: editDate,
            bedrooms: editBedrooms,
            full_baths: editFullBaths,
            half_baths: editHalfBaths,
            size: editSize,
        })
    }).then(resp => resp.json()).then(resp => console.log("Added post" + resp)).catch(err => console.log("Catch error: " + err))
}


jsonIn(json_A, 762910)



