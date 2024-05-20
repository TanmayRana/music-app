import mongoose, { Schema } from "mongoose";

const SongSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  artistname: {
    type: String,
    required: true,
  },
  artistimage: [{ type: String }],
  songimage: [{ type: String }],
  songpath: [
    {
      type: String,
      required: true,
    },
  ],
  album: [
    {
      type: Schema.Types.ObjectId,
      ref: "Album",
    },
  ],
  releaseyear: {
    type: Date,
    required: true,
  },
});

const Song = mongoose.models.Song || mongoose.model("Song", SongSchema);

export default Song;
