#!/bin/bash

rm -rf main.js

tsc main.ts --outFile main.js

open index.html
