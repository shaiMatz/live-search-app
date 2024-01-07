import Link from "next/link";
import React from 'react';

export default function Custom404() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link href="/" style={{ color: "blue", textDecoration: "underline" }}>
        Go back home
      </Link>
    </div>
  );
}
