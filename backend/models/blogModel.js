import express from 'express';
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
    {
        userAdminId:{type:mongoose.Schema.Types.ObjectId, ref:"Admin",required: true},
        
        title: { type: String, required: true, trim: true },
        eventName: { type: String, trim: true },
        publisher: { type: String, required: true, trim: true },
        videos: [
            {
                url: { type: String, required: true, trim: true },
                description: { type: String, trim: true },
            }
        ],
        images: [
            {
                url: { type: String, required: true, trim: true },
                description: { type: String, trim: true },
            }
        ],
    },
    { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
