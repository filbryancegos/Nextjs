export default async function Todo() {
  let data = await fetch('/api/users/')
  let users = await data.json()

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user}</li>
      ))}
    </ul>
  )
}