import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        shippingInfo: {
             address: {
                type: String,
                required:true,
                trim: true
             }
        },
        city: {
            type: String,
            required: true,
            trim:true
        },
        state: {
            type: String,
            required: true,
            trim: true
        },
        country: {
            type: String,
            required: true,
            trim: true
        },
        pincode: {
            type: String,
            required: true,
            trim: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        subTotal: {
            type: Number,
            required: true
        },
        tax: {
            type: Number,
            required: true
        },
        shippingCharges: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["PENDING","SHIPPED","DELIVERED"],
            default:"PENDING"
        },
        orderItems: [
            {
                productName: String,
                productImage: String,
                price: Number,
                quantity: Number,
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"Product"
                }

            }
        ]

    },
    {
        timestamps:true
    }
)


export const Order = mongoose.model("Order",orderSchema);