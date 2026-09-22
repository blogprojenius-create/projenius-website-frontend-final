/* ==========================================================================
   HomepageMagazineConfig.jsx
   Single place to connect your EXISTING magazine content.
   ========================================================================== */

export const MAGAZINE_TITLE = "ProJenius Magazine";

export const MAGAZINE_TOTAL_PAGES = 27;

/* ==========================================================================
   MAGAZINE PAGE IMAGES
   index 0 = page 1
   index 26 = page 27

   Files expected:
   /public/magazine/page-1.webp
   /public/magazine/page-2.webp
   ...
   /public/magazine/page-27.webp
========================================================================== */

export const MAGAZINE_PAGES = Array.from(
  { length: MAGAZINE_TOTAL_PAGES },
  (_, i) => `/magazine/page-${i + 1}.webp`
);

/* ==========================================================================
   MAGAZINE PDF
========================================================================== */

export const MAGAZINE_DOWNLOAD_URL =
  "/magazine/projenius-magazine.pdf";

/* ==========================================================================
   OPTIONAL ISSUE / DATE
   null = hidden
========================================================================== */

export const MAGAZINE_ISSUE = null;
export const MAGAZINE_DATE = null;

/* ==========================================================================
   INSIDE THIS ISSUE

   These are the navigation options shown below the magazine introduction.

   Page 21 and Page 27 have been added.
========================================================================== */

export const MAGAZINE_SECTIONS = [
  {
    id: "story",
    label: "Company Story",
    page: 1,
  },

  {
    id: "services",
    label: "Services",
    page: 9,
  },

  {
    id: "workshops",
    label: "Workshops",
    page: 15,
  },

  {
    id: "innovation",
    label: "innovate",
    page: 18,
  },

  {
    id: "future",
    label: "build",
    page: 25,
  },
];

/* ==========================================================================
   PAGE CLAMP
========================================================================== */

export const clampMagazinePage = (n) =>
  Math.min(
    MAGAZINE_TOTAL_PAGES,
    Math.max(
      1,
      Math.round(n)
    )
  );

/* ==========================================================================
   PAGE IMAGE SOURCE
========================================================================== */

export const getMagazinePageSrc = (n) =>
  MAGAZINE_PAGES[n - 1];

/* ==========================================================================
   PAGE ALT TEXT
========================================================================== */

export const getMagazinePageAlt = (n) =>
  `${MAGAZINE_TITLE}, page ${n} of ${MAGAZINE_TOTAL_PAGES}`;

/* ==========================================================================
   MAGAZINE META
========================================================================== */

export const getMagazineMeta = () => {
  const items = [
    MAGAZINE_TITLE,
  ];

  if (MAGAZINE_ISSUE) {
    items.push(
      `Issue ${MAGAZINE_ISSUE}`
    );
  }

  if (MAGAZINE_DATE) {
    items.push(
      MAGAZINE_DATE
    );
  }

  items.push(
    "Digital publication",
    `${MAGAZINE_TOTAL_PAGES} pages`
  );

  return items;
};

/* ==========================================================================
   IMAGE PRELOAD / LAZY LOADING
========================================================================== */

const readyCache = new Map();

export const magazinePageReady = (n) => {
  if (
    n < 1 ||
    n > MAGAZINE_TOTAL_PAGES
  ) {
    return Promise.resolve();
  }

  if (!readyCache.has(n)) {
    const img = new Image();

    img.decoding = "async";

    img.src =
      getMagazinePageSrc(n);

    const decoded =
      typeof img.decode === "function"
        ? img.decode()
        : new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });

    readyCache.set(
      n,
      decoded.catch(() => {})
    );
  }

  return readyCache.get(n);
};