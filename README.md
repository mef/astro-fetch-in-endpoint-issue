# Using `fetch` inside endpoints with Astro v2.0.2 and node.js adapter

C.f. bug report [in astro's repository](https://github.com/withastro/astro/issues/6443).

## About this repository

Contains an Astro "Basics" starter kit installation updated to reproduce the reported bug.

## How to reproduce the bug

Running in node.js v16

### Steps

```
git clone git@github.com:mef/astro-fetch-in-endpoint-issue.git
cd astro-fetch-in-endpoint-issue
npm install
npm run build; npm run preview
```

### Expected result

Preview server starts

### Observed result

Process crashes with the following error message:

```
const response = await fetch('https://www.mediawiki.org/w/api.php?action=opensearch&search=example');
	                 ^

ReferenceError: fetch is not defined
```
