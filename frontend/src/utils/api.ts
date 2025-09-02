const isNetlify = process.env.NODE_ENV === "production";

// ✅ Mock + real news
export async function fetchNews() {
  if (isNetlify) {
    return [
      {
        id: 1,
        title: "Demo News Item",
        body: "This is a placeholder news body shown on Netlify.",
        category: "General",
        tags: "demo,placeholder",
        status: "published",
        timestamp: "2025-08-27 10:00:00",
        imageUrl: "/default.jpg",
      },
    ];
  }

  const res = await fetch("http://localhost:5000/routes/news");
  return res.json();
}

// ✅ Mock + real stats
export async function fetchStats() {
  if (isNetlify) {
    return {
      businesses: 12,
      experts: 7,
      organizations: 5,
      resources: 18,
    };
  }

  const res = await fetch("http://localhost:5000/routes/stats");
  return res.json();
}
