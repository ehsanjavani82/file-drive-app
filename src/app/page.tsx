"use client";

import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const createFile = useMutation(api.files.createFile);

  const getFiles = useQuery(api.files.getFiles);

  return (
    <main>
      <SignedIn>
        <SignOutButton>
          <Button>Sign Out</Button>
        </SignOutButton>
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>

      <Button
        onClick={() => {
          createFile({
            name: "Hello World ...",
          });
        }}
      >
        Insert Name
      </Button>

      <h1>My Files</h1>

      <ul>
        {getFiles?.map(({name, _id}) => {
          return <li key={_id}>
            {name}
          </li>
        })}
      </ul>
    </main>
  );
}
