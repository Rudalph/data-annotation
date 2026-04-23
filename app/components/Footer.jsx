import React from "react";

export default function Footer () {
    return(
        <div>
            <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
  <aside>
    <p>Copyright © {new Date().getFullYear()} - <a href="https://www.linkedin.com/in/rudalphgonsalves/"><b><u>Rudalph Gonsalves</u></b></a> and <a href="https://www.linkedin.com/in/shrutipatil20/"><b><u>Shruti Patil</u></b></a>. All rights reserved.</p>
  </aside>
</footer>
        </div>
    )
}