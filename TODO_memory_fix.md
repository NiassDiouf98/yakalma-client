# Memory Fix for Render Deployment

## Problem
- App deployment on Render failing with "Ran out of memory (used over 512MB) while running your code."
- Issue caused by Angular SSR build consuming too much memory.

## Solution Implemented
- [x] Disabled Server-Side Rendering (SSR) in Angular to reduce build memory usage
- [x] Removed "server", "ssr", and "outputMode": "server" options from angular.json build configuration
- [x] Updated package.json scripts: changed start to use "serve" for static files
- [x] Removed SSR dependencies: @angular/platform-server, @angular/ssr, express, @types/express
- [x] Added "serve" package for static file serving
- [x] Created render.yaml with static site configuration and reduced memory limit (512MB)

## Files Modified
- yakalma-client/angular.json: Removed SSR options
- yakalma-client/package.json: Updated scripts and dependencies
- yakalma-client/render.yaml: Created deployment configuration

## Next Steps
- Redeploy the app on Render
- Monitor memory usage during build
- If still failing, consider upgrading Render plan or further optimizing bundle size
