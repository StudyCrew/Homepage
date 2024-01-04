import mongoose from "mongoose";
import { ConnectOptions } from "mongoose";

export const WaitlistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Waitlist = models.Waitlist || model("Waitlist", WaitlistSchema);

export default Waitlist;
