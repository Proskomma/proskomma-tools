# proskomma-tools
Helpers to use when building projects around Proskomma

## Setup
```
cd proskomma-tools
npm install
```

## Usage
`proskomma-tools` currently exposes 3 objects as an interface to different utility functions for querying Proskomma.
- `queries`: functions to generate a query string to be passed to a Proskomma instance
- `preQueries`: functions to pre-process data being passed into a query function (most are already called from within the query functions)
- `postQueries`: functions to filter the results of a query
