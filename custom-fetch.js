const data = require('./db.json')

module.exports = (req, res, next) => {
  const productsByCategory = req.path.match(/\/api\/categories\/([a-zA-Z0-9]+)\/products/);
  const subCategories = req.path.match(/\/api\/categories\/([a-zA-Z0-9]+)\/sub/);

  if (productsByCategory) {
    const found = data.products.filter(p => 
      p.categoryPath.some(c => c.id == productsByCategory[1])
    );
    res.status(200).json(found);
  } else if (subCategories) {
    const categoryId = subCategories[1];
    const subs = data.categories.filter(c => c.id == categoryId)[0].subCategories;
    const subIds = subs.map(s => s.id);
    const subsWithData = data.categories.filter(c => c.id != categoryId && subIds.includes(c.id));
    const subWithDataIds = subsWithData.map(s => s.id);
    const all = subsWithData.concat(subs.filter(sub => !subWithDataIds.includes(sub.id)));

    res.status(200).json(all);
  } else {
    next();
  }
};
