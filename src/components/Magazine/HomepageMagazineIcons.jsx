/* Small inline SVG icons for the magazine section (no CSS file needed —
   each parent component sizes them with its own prefixed class). */

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  focusable: "false",
};

export const ChevronLeftIcon = () => (
  <svg {...base} strokeWidth="2"><path d="M15 5l-7 7 7 7" /></svg>
);

export const ChevronRightIcon = () => (
  <svg {...base} strokeWidth="2"><path d="M9 5l7 7-7 7" /></svg>
);

export const DownloadIcon = () => (
  <svg {...base} strokeWidth="1.8"><path d="M12 3v12m0 0-4-4m4 4 4-4M4 20h16" /></svg>
);

export const BookOpenIcon = () => (
  <svg {...base} strokeWidth="1.8">
    <path d="M2 5.5c3-1.3 6-1.3 10 .8 4-2.1 7-2.1 10-.8v13c-3-1.3-6-1.3-10 .8-4-2.1-7-2.1-10-.8z" />
    <path d="M12 6.3v13" />
  </svg>
);

export const CloseIcon = () => (
  <svg {...base} strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
);

export const ExpandIcon = () => (
  <svg {...base} strokeWidth="2"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
);
