"use client"

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function TestPage() {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);



  return (
    <div>
      <h1>Auth User</h1>
      {user ? (
        <div>
          <p><strong>Login:</strong> {user.login}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <img src={user.avatarUrl} alt="avatar" width={80} />
        </div>
      ) : (
        <p>No user yet.</p>
      )}
    </div>
  );
}