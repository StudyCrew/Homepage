export const WaitlistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Waitlist = models.Waitlist || model("Waitlist", WaitlistSchema);

export default Waitlist;
