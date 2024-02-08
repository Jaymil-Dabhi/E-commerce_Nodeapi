const Category = require("../models/categoryModel");

const getAllCategory = async ({options}) => {
  const { limit = 10, page = 1 } = options;

  return Category.aggregate([
    {
      $match: { _id: { $exists: true } },
    },
    {
      $project: {
        _id: 1,
        stores: 1,
        category: 1,
        description: 1,
        category_image: 1,
      },
    },
    {
      $lookup: {
        from: "stores",
        let: { store_id: "$stores" },
        pipeline: [
          { 
            $match: {
              $expr: {
                $in: ["$_id", "$$store_id"],
              },
            },
          },
        ],
        as: "stores",
      },
    },
    {
        $project: {
          _id: 1,
          category: 1,
          description: 1,
          category_image: 1,
          stores: {
            _id: 1,
            store_name: 1,
            shop_name: 1,
            shop_alias: 1,
          },
        },
      },
      {
        $facet: {
          metadata: [
            { $count: 'total' },
            { $addFields: { totalPages: { $ceil: { $divide: ['$total', 8] } }, limit: Number(limit) } },
          ],
          data: [{ $skip: Number(limit) * (Number(page) - 1) }, { $limit: Number(limit) }],
        },
      },
  ]);
};

module.exports = {
    getAllCategory,
};
