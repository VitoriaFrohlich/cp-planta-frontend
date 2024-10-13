#!/bin/bash

# Fetch the commit message
message=$(git log -1 --pretty=%B)

# Define the commit message pattern (adjust as needed)
pattern="^(feat|fix|docs|style|refactor|perf|test|chore): .+"

# Check if the commit message matches the pattern
if [[ ! $message =~ $pattern ]]; then
  echo "Invalid commit message format."
  echo "Commit message should start with one of the following: feat, fix, docs, style, refactor, perf, test, chore."
  echo "Example: 'feat: add user login functionality'"
  exit 1
fi