import React from 'react';

interface ErrorPageProps {
  statusCode: number;
}

export default function ErrorPage(props: ErrorPageProps) {
  const { statusCode } = props;
  return (
    <>
      <div className="error__code__wrapper">
        <p className="error__code">Something went wrong {`| ${statusCode || 'undefined code'}`}</p>
      </div>
    </>
  );
}
