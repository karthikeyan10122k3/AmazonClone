import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  rating: Number,
  comment: String,
  date: Date,
  reviewerName: String,
  reviewerEmail: String
}, { _id: false });

const DimensionSchema = new mongoose.Schema({
  width: Number,
  height: Number,
  depth: Number
}, { _id: false });

const MetaSchema = new mongoose.Schema({
  createdAt: Date,
  updatedAt: Date,
  barcode: String,
  qrCode: String
}, { _id: false });

export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  price: { type: Number, required: true },
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  tags: [String],
  sku: String,
  weight: Number,
  dimensions: DimensionSchema,
  warrantyInformation: String,
  shippingInformation: String,
  availabilityStatus: String,
  reviews: [ReviewSchema],
  returnPolicy: String,
  minimumOrderQuantity: Number,
  meta: MetaSchema,
  images: [String],
  thumbnail: String
},
{
  timestamp:true
});

const ProductModel = mongoose.model('products', ProductSchema);


export default ProductModel;
