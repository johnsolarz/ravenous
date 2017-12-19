const apiKey = 'rhatBqHhOBL45cRI8BAfAiOedrK-Pmsb-VN7XBKLDpPCjhn3bhzebWF1U0KFbNHA4qrxRftACU5Y8SfrbxSje5-xT79QncrKJVeM-sXpBO2fvd3PI7Z9h4O1RIM4WnYx';

const Yelp = {
  search(term, location, sortBy) {
    // 0. begin the method with a return which will return a promise that will ultimately resolve to our list of businesses
    // 1. fetch() will currently not function correctly due to CORS restrictions
    // 2. To retrieve businesses, you'll have to hit the /businesses endpoint of the Yelp API
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      // present our Yelp identification for the browser
      headers: { Authorization: `Bearer ${apiKey}` }
    // convert the returned response to JSON for us to be able to effectively utilize our list of businesses
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
    }).then(jsonResponse => {
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => ({
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          state: business.location.state,
          zipCode: business.location.zip_code,
          category: business.categories.alias,
          rating: business.rating,
          reviewCount: business.review_count
        }));
      }
    });
  }
}

export default Yelp;
