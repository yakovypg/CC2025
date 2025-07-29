# Requirements

The application does not have significant restrictions on the runtime environment. Most browsers should be able to run the application correctly. However, there are some considerations to keep in mind, which are described in this document.

## Table Of Contents

*    [CORS](#cors)

## CORS

The application requires permission for CORS requests. However, in some browsers, these requests may be disabled or restricted, while in others, they may not be.

For example, no issues were found when running the application in Google Chrome. Conversely, in the LibreWolf with pre-installed special extensions and in Firefox with privacy settings, problems accessing the server were observed due to the blocking of CORS requests. In such browsers with these settings, enabling CORS requests is necessary for the application to function correctly.
