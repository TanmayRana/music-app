import mongoose, { Schema } from "mongoose";

const PlaylistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Playlist =
  mongoose.models.Playlist || mongoose.model("Playlist", PlaylistSchema);

export default Playlist;
