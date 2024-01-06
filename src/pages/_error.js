import React from "react";
import Link from "next/link";

function Error({ statusCode }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </h1>
      <p>Sorry, something went wrong</p>
      <p>
        You can go back to the homepage or contact support if the problem
        persists.
      </p>
      <Link href="/" style={{ color: "blue", textDecoration: "underline" }}>
        Back to home
      </Link>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
