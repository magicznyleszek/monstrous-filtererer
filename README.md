![coverage-shield-badge-1](https://img.shields.io/badge/coverage-51.74%25-red.svg)

# Monstrous Filtererer

[Check it out live!](http://monstrous-filtererer.smutnyleszek.com/)

Features:

- ES6 (with Babel)
- Angular 1.6
- Karma tests
- MADCSS
- Responsive design
- Linters

Note: I assumed that this would be a `PHP`-based website with Backend providing the data via `window.hotelsData`. For now Jekyll mocks it.

Requirements:

1. [Jekyll](http://jekyllrb.com/)
2. [Node](https://nodejs.org)

## Building

To preview the project, you need to do three things:

1. `npm install`
2. `npm run serve`
3. open [127.0.0.1:4000](http://127.0.0.1:4000/) in the browser

## Development

What you want is to basically have two terminals:

1. `npm run serve` -- this is providing the [127.0.0.1:4000](http://127.0.0.1:4000/) "server" and watching changes on Jekyll
2. `npm run watch` -- this is watching all source files and producing dist ones

## TODO

- write test for modules
- implement some pretty inputs (range, double-range, select)
- stars filter should be a range filter
- paginate results
- store filters and sorter value in localStorage
- keep filters and sorter values as routing parameters
- name filter should use fuzzy search algorithm
- some smart way of displaying recommended hotels based on:
    - stars
    - rating (weighted by the number of votes)
    - distance
    - cost
- display the decimal parts of prices nicer
