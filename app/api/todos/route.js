import { connectToDB } from './utils/mongodb';
import User from './models/User';

// GET: Fetch all users
export async function GET() {
  try {
    await connectToDB();
    const users = await User.find();
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Users fetched successfully',
        data: users,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch users' }),
      { status: 500 }
    );
  }
}

// POST: Add a new user
export async function POST(request) {
  try {
    const { name } = await request.json();
    if (!name) {
      return new Response(
        JSON.stringify({ error: 'Name is required' }),
        { status: 400 }
      );
    }

    await connectToDB();
    const newUser = new User({ name });
    const savedUser = await newUser.save(); // Save and retrieve the created user

    return new Response(
      JSON.stringify({
        success: true,
        message: 'User added successfully',
        data: savedUser,
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Invalid request body' }),
      { status: 400 }
    );
  }
}