import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { review } = await req.json();

    if (!review) {
      return NextResponse.json(
        { error: "Review text is required" },
        { status: 400 }
      );
    }

    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ review }), 
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
