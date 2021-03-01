# Abstract Feed

A simple, fullscreen app that cycles through recently updated master collections in Abstract.


[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Figorsheg-wix%2Fabstract-feed)

### How to use

Clone the repository:

```bash
git clone https://github.com/igorsheg-wix/abstract-feed.git
```

[Get an Abstract access token](https://app.goabstract.com/account/tokens)

Install and run:

```bash
yarn install
yarn run dev
```


## The idea behind it

[Abstract](https://www.abstract.com) is a safe home for your Sketch design and library files, a single source of truth for your design team's work. Abstract provides our team with a central hub for our design work, helping us manage and maintain design components and files.

We integrate [Abstract's SDK](https://sdk.goabstract.com) into a next.js app that loops over the project's master collections that the current user is invited to. 
