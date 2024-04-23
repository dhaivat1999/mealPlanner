import React from "react";

export default function Footer() {
  return (
    <footer id="footer" className="fixed-bottom bg-custom-1000 text-center">
      <p className="text-custom-200">&copy; {new Date().getFullYear()} By Dhaivat Desai</p>
    </footer>
  );
}
