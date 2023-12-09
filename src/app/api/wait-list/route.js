import { connectDB } from "../../../lib/mongodb";
import Waitlist from "../../../lib/model";

export async function POST(req) {
  try {
    await connectDB();

    const { email } = req.json();

    // TODO: Add email verification

    const newEntry = new Waitlist({ email });
    await newEntry.save();

    return new Response(
      JSON.stringify({ message: "Email added to waitlist!" }),
      {
        status: 201,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await connectDB();

    const spotsLeft = await getSpotsLeft();

    return new Response(JSON.stringify({ spotsLeft }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

const getTotalWaitlistCount = async () => {
  try {
    const count = await Waitlist.countDocuments();
    return count;
  } catch (error) {
    console.error("Error fetching waitlist count:", error);
    throw error;
  }
};

const getSpotsLeft = async () => {
  const totalWaitlistCount = await getTotalWaitlistCount();
  return MAX_SPOTS - totalWaitlistCount;
};

// app.post('/join-waitlist', async (req, res) => {
//     try {
//       const { email } = req.body;

//       // TODO: Add email verification

//       const newEntry = new Waitlist({ email });
//       await newEntry.save();
//       res.status(201).json({ message: 'Email added to waitlist!' });
//     } catch (error) {
//       console.error(error); // Log the full error
//       res.status(500).json({ message: error.message, stack: error.stack });
//     }
// });

// app.get('/spots-left', async (req, res) => {
//     try {
//       const spotsLeft = await getSpotsLeft();
//       res.status(200).json({ spotsLeft });
//     } catch (error) {
//       console.error(error); // Log the full error
//       res.status(500).json({ message: "Failed to fetch spots left", stack: error.stack });
//     }
//   });
