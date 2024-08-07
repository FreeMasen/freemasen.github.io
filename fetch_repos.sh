#! /bin/bash

gh repo list $1 \
  --no-archived \
  --source \
  --visibility public \
  --json homepageUrl,name,updatedAt,description,url \
  --jq '. - map(select(.homepageUrl | .==""))' \
  --limit 1000
