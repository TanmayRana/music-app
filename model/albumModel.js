import mongoose, { Schema } from "mongoose";

const AlbumSchema = new Schema({
  title: { type: String, maxlength: 50, unique: true, required: true },
  description: { type: String, maxlength: 250 },
  year: { type: String, maxlength: 4 },
  albumimage: [{ type: String, require: true }],
  songs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
});

const Album = mongoose.models.Album || mongoose.model("Album", AlbumSchema);

export default Album;
