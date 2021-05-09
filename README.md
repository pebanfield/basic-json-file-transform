# BASIC-JSON-FILE-TRANSFORM

A zero dependency Node js command line app that reads, transforms and writes JSON to an output file.

## Pre-requisites :

- (Node version 11 or greater.)[https://nodejs.org/en/]

## Verification Steps :

1. Install a recent version of node
2. run ``` node index.js ``` from project directory
3. Verify results
- output.json is produced
- playlist 4 is added
- playlist 2 is removed
- playlist 3 updated with song 5

## A note about performance

This simple single node example will be constrained by available system RAM memory. The main bottle-neck is the in-memory size of the mixtape JSON when it is parsed, although large change files could be theoretically constrained as well.

A SAX style JSON streaming parser could address this issue by processing smaller amounts of data serially within a single node, but this approach can be awkward and difficult to enhance. 

It is generally best to consider general system architecture and requirements wholistically to ensure an optimal solution. Are there special constraints that require large file support? Cost, legacy or third party systems, etc? Can the application model be designed to make changes more atomic? Would it make more sense to use a datastore as opposed to file storage? Are there redundancy and backup requirements, etc.?
