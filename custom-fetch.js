const data = require('./db.json')

module.exports = (req, res, next) => {
  const productsByCategory = req.path.match(/\/api\/categories\/([a-zA-Z0-9]+)\/products/);
  const subCategories = req.path.match(/\/api\/categories\/([a-zA-Z0-9]+)\/sub/);
  const reviews = req.path.match(/\/api\/products\/([a-zA-Z0-9]+)\/reviews/);
  const alsoViewed = req.path.match(/\/api\/products\/([a-zA-Z0-9]+)\/also-viewed/);

  if (productsByCategory) {
    const found = data.products.filter(p => 
      p.categoryPath.some(c => c.id == productsByCategory[1])
    );
    res.status(200).json(found);
  } else if (subCategories) {
    const categoryId = subCategories[1];
    const primary = data.categories.filter(c => c.id == categoryId)[0]

    if (!primary) {
      res.status(200).json([]);
    } else {
      const subs = primary.subCategories;
      const subIds = subs.map(s => s.id);
      const subsWithData = data.categories.filter(c => c.id != categoryId && subIds.includes(c.id));
      const subWithDataIds = subsWithData.map(s => s.id);
      const all = subsWithData.concat(subs.filter(sub => !subWithDataIds.includes(sub.id)));
  
      res.status(200).json(all);
    }
  } else if(reviews) {
    const productId = parseInt(reviews[1]);
    let userId = productId % 11;
    userId = userId ? userId : 1;

    const reviewData = data.reviews.filter(r => r.userId == userId);
    res.status(200).json(reviewData);
  } else if (alsoViewed) {
    const productCount = data.products.length;
    const randomProducts = [...Array(10).keys()]
      .map(i => {
        const randomIndex = Math.floor(Math.random() * productCount);
        return data.products[randomIndex];
      });
      res.status(200).json(randomProducts);
  } else {
    next();
  }
};
