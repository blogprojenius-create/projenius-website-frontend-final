const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";

/* =========================================================
   RESPONSE
========================================================= */

async function parseApiResponse(
  response
) {
  const type =
    response.headers.get(
      "content-type"
    ) || "";

  if (
    type.includes(
      "application/json"
    )
  ) {
    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data?.error ||
          data?.message ||
          "Request failed."
      );
    }

    return data;
  }

  const text =
    await response.text();

  throw new Error(
    text ||
      `Server returned ${response.status}.`
  );
}

/* =========================================================
   MEDIA
========================================================= */

export function mediaUrl(
  value
) {
  if (!value) return "";

  if (
    value.startsWith(
      "data:"
    ) ||
    value.startsWith(
      "http://"
    ) ||
    value.startsWith(
      "https://"
    ) ||
    value.startsWith(
      "blob:"
    )
  ) {
    return value;
  }

  return `${API_BASE_URL}${
    value.startsWith("/")
      ? ""
      : "/"
  }${value}`;
}

/* =========================================================
   COURSES
========================================================= */

export async function getCourses(
  query = ""
) {
  const response =
    await fetch(
      `${API_BASE_URL}/api/courses${query}`,
      {
        method: "GET",
        headers: {
          Accept:
            "application/json",
        },
      }
    );

  return parseApiResponse(
    response
  );
}

export async function getCourse(
  identifier
) {
  if (!identifier) {
    throw new Error(
      "Course identifier is missing."
    );
  }

  const response =
    await fetch(
      `${API_BASE_URL}/api/courses/${encodeURIComponent(
        identifier
      )}`,
      {
        method: "GET",
        headers: {
          Accept:
            "application/json",
        },
      }
    );

  return parseApiResponse(
    response
  );
}

/* =========================================================
   NEWS & INSIGHTS
========================================================= */

export async function getNews(
  query = ""
) {
  const finalQuery = query
    ? query.startsWith("?")
      ? query
      : `?${query}`
    : "?limit=50";

  const response =
    await fetch(
      `${API_BASE_URL}/api/news${finalQuery}`,
      {
        method: "GET",
        headers: {
          Accept:
            "application/json",
        },
      }
    );

  const data =
    await parseApiResponse(
      response
    );

  /*
   * Backend response:
   *
   * {
   *   items: [],
   *   page: 1,
   *   total: 0,
   *   totalPages: 1
   * }
   */

  if (Array.isArray(data)) {
    return data;
  }

  if (
    Array.isArray(
      data?.items
    )
  ) {
    return data.items;
  }

  return [];
}

/* =========================================================
   NEWS DETAILS
========================================================= */

export async function getNewsItem(
  identifier
) {
  if (!identifier) {
    throw new Error(
      "News identifier is missing."
    );
  }

  const response =
    await fetch(
      `${API_BASE_URL}/api/news/${encodeURIComponent(
        identifier
      )}`,
      {
        method: "GET",
        headers: {
          Accept:
            "application/json",
        },
      }
    );

  return parseApiResponse(
    response
  );
}

/* =========================================================
   COMPATIBILITY
========================================================= */

export const getNewsBySlug =
  getNewsItem;