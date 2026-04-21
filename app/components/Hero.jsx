import React from "react";
import Link from "next/link";

export default function Hero () {
    return(
        <div>
            <div className="hero bg-base-200 py-16">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img
      src="https://images.pexels.com/photos/7948038/pexels-photo-7948038.jpeg"
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
      <h1 className="text-5xl font-bold">Collaborative Annotating Tool</h1>
      <p className="py-6">
      Join forces with researchers and engineers to annotate, label, and query Earth observation data in a unified, cloud-native environment.
      </p>
      <Link href="/auth"><button className="btn btn-neutral">Get Started</button></Link>
    </div>
  </div>
</div>
        </div>
    )
}