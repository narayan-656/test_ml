"use client";
import { useState } from "react";

export default function HomePage() {
  const [review, setReview] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review }),
      });

      const data = await response.json();
      setResult(data.sentiment);
    } catch (error) {
      setResult("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center">
          Sentiment Analysis
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Check Sentiment"}
          </button>
        </form>

        {result && (
          <div
            className={`mt-4 text-center text-lg font-semibold ${
              result === "positive" ? "text-green-600" : "text-red-600"
            }`}
          >
            Sentiment: {result}
          </div>
        )}
      </div>
    </main>
  );
}
