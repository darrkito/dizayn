#!/bin/bash
# IndexNow — notifies Bing and Yandex of new/updated URLs.
# Usage: ./scripts/indexnow.sh                  (all URLs, pulled live from sitemap.xml)
#        ./scripts/indexnow.sh url1 url2 ...    (specific URLs only)

KEY="86d75beb2370cde7857a6c24e46ed141"
HOST="dizayn.com.mx"
SITE_URL="https://dizayn.com.mx"

if [ "$#" -gt 0 ]; then
  URLS=("$@")
else
  # Pull the current URL list straight from the live sitemap — no hand-maintained list to drift out of sync.
  mapfile -t URLS < <(curl -s "$SITE_URL/sitemap.xml" | grep -oP '(?<=<loc>)[^<]*')
fi

JSON_URLS=$(printf '"%s",' "${URLS[@]}")
JSON_URLS="[${JSON_URLS%,}]"

RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "{
    \"host\": \"$HOST\",
    \"key\": \"$KEY\",
    \"keyLocation\": \"$SITE_URL/$KEY.txt\",
    \"urlList\": $JSON_URLS
  }")

echo "HTTP $RESPONSE"
if [ "$RESPONSE" = "200" ] || [ "$RESPONSE" = "202" ]; then
  echo "OK — ${#URLS[@]} URL(s) sent to Bing and Yandex"
else
  echo "Error submitting. Code: $RESPONSE"
fi
