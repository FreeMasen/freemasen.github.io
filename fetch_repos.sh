#! /bin/bash

gh repo list \
  --no-archived \
  --source \
  --visibility public \
  --json homepageUrl,name,updatedAt,description \
  --jq '. - map(select(.homepageUrl | .==""))' \
  --limit 1000 \
  > repos.json
