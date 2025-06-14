import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema(
  {
    videoFile: {
      type: String, // Cloudinary URL
      required: true,
    },
    thumbnail: {
      type: String, // Cloudinary URL
      required: true,
    },
    title: {
      type: String, // Video title
      required: true,
      trim: true,
    },
    description: {
      type: String, // Video description
      trim: true,
    },  
    duration: {
      type: Number, // Video duration in seconds
      required: true,
    },
    isPublished: {
      type: Boolean, // Visibility of the video
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId, // Reference to the User model
      ref: "User",
      required: true,
    },
    views: {
      type: Number, // Number of views
      default: 0,
    },
    likes: {
      type: Number, //` Number of likes
      default: 0,
    },
    dislikes: {
      type: Number, //` Number of dislikes
      default: 0,
    },
    tags: {
      type: [String], // `Array of tags for the video
      default: [],
    },
    comments: [
      {
        type: Schema.Types.ObjectId, // `Reference to the Comment model
        ref: "Comment",
      },
    ],
    category: {
      type: String, // `Category of the video
      enum: ["Music", "Gaming", "Education", "Entertainment", "News", "Sports", "Other"],
      default: "Other",
    },
    uploadDate: {
      type: Date, // `Date when the video was uploaded
      default: Date.now,
    },
    isFeatured: {
      type: Boolean, //` Whether the video is featured
      default: false,
    },

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Video", videoSchema);
// This model defines the structure of a Video document in MongoDB using Mongoose.
// It includes fields for videoFile, thumbnail, and title, with timestamps for creation and updates.