# Design Decisions

- 2023-03-17: Use react-hotkeys-hook instead of react-hotkeys for **keyboard
  shortcuts**. It has fewer stars and doesn't support sequences of multiple
  combinations, but react-hotkeys hasn't been maintained in 5 years.

- 2023-03-17: Use clsx instead of classNames for **conditional class names**. It
  has fewer stars, but it still has a drop-in API, is faster, and is used by
  docusaurus.
