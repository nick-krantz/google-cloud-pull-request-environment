This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# Google Cloud Notes

- Went through the ringer creating Google Cloud Account, enabling APIs, etc, etc, etc.
- Created environment-test project
- Connected GitHub repo with starter NextJS App
- Added `.cloudbuild.yaml` file to the repo that should install and build the app
- Created test trigger in Google Cloud Build that runs on push to main
  - trigger didn't run on first push because my build file wasn't found
  - turns out that my build file had to be `cloudbuild.yaml` not prefixed with `.`
- Adding deployment build step in `cloudbuild.yaml`
  - Failed first time because my `next.config.js` was incorrect so the build failed
  - Failed second time because I didn't enable google cloud function api
  - Third failed again because of permissions but I think it was because I had an invalid region in `cloudbuild.yaml`
  - 4th failed again, same reason, going to try locally just to see if something fun is happening. Locally, I tried to enable cloud functions via the CLI but also failed because of permissions. I found a SO post about adding "Cloud Build Service Account" IAM role to the projects service account. Going to see if that works.
  - Alright, I needed to enable permissions within Google Cloud Build and I had my project-id wrong in the commands, so I was able to use the CLI locally to enable a bunch of cloud APIs that I needed.
    The build & deploy still failed because my entry point to my app was wrong
  - Trying again but putting an `index.js` file at the root with a cloud function listening for `nextjs` request that will serve the nextjs app. Configured the entry-point in the `cloudbuild.yaml` as well.
  - New error: Permission 'run.services.setIamPolicy', so baby steps? Running commands locally to see if I get more information from the CLI.
  - Got 403 from deployed application, changed ingress settings to all: `--ingress-settings=all`. But now getting internal server error when access the app
  - Still getting some weird permission denied issues
