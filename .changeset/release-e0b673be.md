---
"agent-browser": patch
---

Fixed browser launch options not being passed correctly when using persistent profiles, ensuring args, userAgent, proxy, and ignoreHTTPSErrors settings now work properly. Added pre-flight checks for socket path length limits and directory write permissions to provide clearer error messages when daemon startup fails. Improved error handling to properly exit with failure status when browser launch fails.
