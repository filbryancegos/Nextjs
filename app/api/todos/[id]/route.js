import { connectToDB } from '../utils/mongodb';
import User from '../models/User';

// PATCH: Update a user by ID
export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { name } = await request.json();

    if (!name) {
      return new Response(
        JSON.stringify({ error: 'Name is required' }),
        { status: 400 }
      );
    }

    await connectToDB();
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'User updated successfully',
        data: updatedUser,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to update user' }),
      { status: 500 }
    );
  }
}

// DELETE: Delete a user by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await connectToDB();
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'User deleted successfully',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to delete user' }),
      { status: 500 }
    );
  }
}
