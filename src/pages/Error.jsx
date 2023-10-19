import React from "react";

function ErrorElement() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Oops! Something went wrong.</h1>
      <p style={styles.message}>
        We apologize for the inconvenience. An error has occurred.
      </p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  message: {
    fontSize: "1rem",
    marginTop: "20px",
  },
};

export default ErrorElement;
