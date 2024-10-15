const users = [
  {id: 1,  name: 'Egos'},
  {id: 2,  name: 'Brutos'},
  {id: 3,  name: 'Amang'}
]

export async function GET(request) {
  const responseData = {
    success: true,
    message: 'Users fetched successfully',
    data: users,
  };

  return new Response(JSON.stringify(responseData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });

}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return new Response(
        JSON.stringify({ error: 'Name is required' }),
        { status: 400 }
      );
    }

    const newUser = {
      id: users.length + 1,
      name: name
    };
    users.push(newUser);

    const responseData = {
      success: true,
      message: 'Users added successfully',
      data: users,
    };

    return new Response(JSON.stringify(responseData), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
     
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Invalid request body' }),
      { status: 400 }
    );
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'ID is required' }),
        { status: 400 }
      );
    }

    // Find the user by id
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404 }
      );
    }

    // Remove the user
    const deletedUser = users.splice(userIndex, 1);

    const responseData = {
      success: true,
      message: 'Username  deleted successfully',
      data: deletedUser[0],
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Invalid request body' }),
      { status: 400 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, name } = body;

    if (!id || !name) {
      return new Response(
        JSON.stringify({ error: 'ID and Name are required' }),
        { status: 400 }
      );
    }

    // Find the user by id
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404 }
      );
    }

    // Update the user's name
    users[userIndex].name = name;

    const responseData = {
      success: true,
      message: 'Users updated successfully',
      data: users[userIndex],
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Invalid request body' }),
      { status: 400 }
    );
  }
}
