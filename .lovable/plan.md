Root cause: pages like Home and Workspace call `useBloom()`, but the root layout no longer wraps routes in `BloomProvider`. During publish/SSR this throws `useBloom must be used within BloomProvider`, which displays the “This page didn’t load” screen in your screenshot.

Plan:
1. Update `src/routes/__root.tsx` to import `BloomProvider`, `SiteHeader`, and `SiteFooter`.
2. Wrap all routed pages with `BloomProvider` inside the existing `QueryClientProvider`.
3. Restore the shared app shell so every page renders with the navigation header, main content area, footer, and toaster.
4. Keep the existing branded error page and not-found page intact.
5. Verify the relevant signal by checking that the dev logs no longer show `useBloom must be used within BloomProvider` after the change.