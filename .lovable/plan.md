

## Problem

The login input fields in the SalesFlow component have a light background (`#F8FAFC`) but no explicit `color` property set. The global CSS sets `body { color: white }` (dark theme), so the text typed in the inputs is white on a near-white background — invisible.

## Fix

Add `color: "#0F172A"` (dark text) to the input style object on line 422 of `src/components/SalesFlowApp.jsx`.

**Line 422** — add `color: "#0F172A"` to the inline style:
```jsx
style={{ width: "100%", background: "#F8FAFC", border: `1.5px solid ${error ? "#FCA5A5" : "#E2E8F0"}`, borderRadius: 10, padding: "12px 15px", fontSize: 14, color: "#0F172A", outline: "none", boxSizing: "border-box", fontFamily: "'DM Sans',sans-serif" }}
```

This is a one-line style fix — no other files need changes.

