#!/bin/bash
set -uo pipefail

GH_USER="IhorLazarkov"
CACHE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/.cache"
PROFILE_CACHE="$CACHE_DIR/profile.json"
CONTRIB_CACHE="$CACHE_DIR/contributions.html"
LANG_PCT_CACHE="$CACHE_DIR/lang_pct.tsv"
REPO_COUNT_CACHE="$CACHE_DIR/repo_count.txt"
FETCH_TIMEOUT=4

mkdir -p "$CACHE_DIR"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

command -v jq >/dev/null 2>&1 || { echo "jq is required (brew install jq)" >&2; exit 1; }
command -v curl >/dev/null 2>&1 || { echo "curl is required" >&2; exit 1; }

# --- Profile: live fetch with a short timeout, falling back to the last good cache ---
profile=""
if fresh=$(curl -sf --max-time "$FETCH_TIMEOUT" "https://api.github.com/users/${GH_USER}" 2>/dev/null) \
  && [ -n "$fresh" ] && echo "$fresh" | jq -e . >/dev/null 2>&1; then
  profile="$fresh"
  echo "$profile" > "$PROFILE_CACHE"
elif [ -s "$PROFILE_CACHE" ]; then
  profile=$(cat "$PROFILE_CACHE")
  stale=true
fi

if [ -z "$profile" ]; then
  echo "GitHub API unreachable and no cached profile available" >&2
  exit 1
fi

name=$(echo "$profile" | jq -r '.name // .login')
login=$(echo "$profile" | jq -r '.login')
bio=$(echo "$profile" | jq -r '.bio // ""')
location=$(echo "$profile" | jq -r '.location // "Unknown"')
website=$(echo "$profile" | jq -r '.blog // ""')
public_repos=$(echo "$profile" | jq -r '.public_repos')
followers=$(echo "$profile" | jq -r '.followers')
following=$(echo "$profile" | jq -r '.following')
joined_raw=$(echo "$profile" | jq -r '.created_at')
joined=$(date -j -f "%Y-%m-%dT%H:%M:%SZ" "$joined_raw" "+%B %Y" 2>/dev/null || echo "$joined_raw")

echo -e "${BOLD}${CYAN}"
echo "  ___ _   _  ___  ____  "
echo " |_ _| |_| |/ _ \|  _ \ "
echo "  | ||  _  | | | | |_) |"
echo "  | || | | | |_| |  _ < "
echo " |___|_| |_|\___/|_| \_\\"
echo -e "${NC}"

echo -e "${BOLD}${MAGENTA}${name}${NC}  ${CYAN}@${login}${NC}"
[ -n "$bio" ] && echo -e "${YELLOW}${bio}${NC}\n"
[ -n "${stale:-}" ] && echo -e "${YELLOW}(showing cached data — GitHub API unreachable)${NC}\n"

echo -e "${GREEN}📍 Location:${NC}  ${location}"
echo -e "${GREEN}📧 Email:${NC}     ilazarkov@gmail.com"
[ -n "$website" ] && echo -e "${GREEN}🌐 Website:${NC}   ${website}"
echo -e "${GREEN}📝 Blog:${NC}      http://articles-ihor-lazarkov-swe.s3-website-us-east-1.amazonaws.com/"
echo -e "${GREEN}🐙 GitHub:${NC}    https://github.com/${login}\n"

echo -e "${BLUE}📦 Public repos:${NC}  ${public_repos}"
echo -e "${BLUE}👥 Followers:${NC}     ${followers}"
echo -e "${BLUE}➡️  Following:${NC}     ${following}"
echo -e "${BLUE}📅 Joined:${NC}        ${joined}\n"

# --- Real contribution graph, scraped from the profile's contributions calendar ---
contrib_html=""
if fresh=$(curl -sf --max-time "$FETCH_TIMEOUT" "https://github.com/users/${GH_USER}/contributions" 2>/dev/null) && [ -n "$fresh" ]; then
  contrib_html="$fresh"
  echo "$contrib_html" > "$CONTRIB_CACHE"
elif [ -s "$CONTRIB_CACHE" ]; then
  contrib_html=$(cat "$CONTRIB_CACHE")
fi

if [ -z "$contrib_html" ]; then
  echo -e "${YELLOW}(contribution graph unavailable)${NC}"
else
  total=$(echo "$contrib_html" | perl -0777 -ne 'print $1 if /id="js-contribution-activity-description"[^>]*>\s*([\d,]+)\s*\n\s*contributions/s')
  total=${total:-"?"}

  pairs=$(echo "$contrib_html" | perl -ne 'print "$1 $2 $3\n" if /data-date="([0-9-]+)" id="contribution-day-component-(\d+-\d+)" data-level="(\d+)"/')

  echo -e "${BOLD}${total} contributions in the last year${NC}"

  echo "$pairs" | awk -v y='\033[0;33m' -v nc='\033[0m' \
    -v l0='\033[38;5;236m' -v l1='\033[38;5;22m' -v l2='\033[38;5;28m' -v l3='\033[38;5;34m' -v l4='\033[38;5;46m' '
  BEGIN {
    split("Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec", mnames, " ")
  }
  {
    split($2, a, "-"); dow = a[1]; week = a[2]
    lvl[dow, week] = $3
    date[dow, week] = $1
    if (week + 1 > maxweek) maxweek = week + 1
  }
  END {
    # Build month header from the first row that has a date for each week
    header = ""
    for (w = 0; w < maxweek; w++) header = header " "
    prevmon = 0
    lastend = -1
    for (w = 0; w < maxweek; w++) {
      d = date[1, w]
      if (d == "") { for (dd = 0; dd < 7; dd++) if (date[dd, w] != "") { d = date[dd, w]; break } }
      if (d == "") continue
      split(d, dp, "-")
      mon = dp[2] + 0
      if (mon != prevmon) {
        if (w > lastend) {
          label = mnames[mon]
          header = substr(header, 1, w) label substr(header, w + 1 + length(label))
          lastend = w + length(label)
        }
        prevmon = mon
      }
    }
    printf "%s   %s%s\n", y, header, nc

    split("Mon Wed Fri", rows, " ")
    dowidx[1] = 1; dowidx[2] = 3; dowidx[3] = 5
    for (r = 1; r <= 3; r++) {
      dow = dowidx[r]
      printf "%s%-4s%s", y, rows[r], nc
      for (w = 0; w < maxweek; w++) {
        v = lvl[dow, w]
        if (v == "") v = 0
        if (v == 0) c = l0
        else if (v == 1) c = l1
        else if (v == 2) c = l2
        else if (v == 3) c = l3
        else c = l4
        printf "%s\xe2\x96\x87%s", c, nc
      }
      print ""
    }
  }'

  echo -e "${YELLOW}   Less${NC} ${L0:-\033[38;5;236m}▇${NC} \033[38;5;22m▇${NC} \033[38;5;28m▇${NC} \033[38;5;34m▇${NC} \033[38;5;46m▇${NC} ${YELLOW}More${NC}"
fi

# --- Language breakdown across all owned (non-fork) repos ---
lang_pct=""
repo_count=""
if repos_json=$(curl -sf --max-time "$FETCH_TIMEOUT" "https://api.github.com/users/${GH_USER}/repos?per_page=100&type=owner" 2>/dev/null) \
  && [ -n "$repos_json" ] && echo "$repos_json" | jq -e . >/dev/null 2>&1; then
  repo_names=$(echo "$repos_json" | jq -r '.[] | select(.fork==false) | .name')

  lang_bytes=$(
    echo "$repo_names" | xargs -P 8 -I{} curl -sf --max-time "$FETCH_TIMEOUT" "https://api.github.com/repos/${GH_USER}/{}/languages" \
      | jq -s 'reduce .[] as $o ({}; reduce ($o|keys_unsorted[]) as $k (.; .[$k] = ((.[$k] // 0) + $o[$k])))' 2>/dev/null
  )

  if [ -n "$lang_bytes" ] && echo "$lang_bytes" | jq -e . >/dev/null 2>&1; then
    lang_pct=$(echo "$lang_bytes" | jq -r '
      to_entries | (map(.value) | add) as $total
      | map({key, pct: (.value / $total * 100)})
      | sort_by(-.pct)
      | .[] | "\(.key)\t\(.pct)"
    ')
    repo_count=$(echo "$repo_names" | wc -l | tr -d ' ')
    echo "$lang_pct" > "$LANG_PCT_CACHE"
    echo "$repo_count" > "$REPO_COUNT_CACHE"
  fi
fi

if [ -z "$lang_pct" ] && [ -s "$LANG_PCT_CACHE" ] && [ -s "$REPO_COUNT_CACHE" ]; then
  lang_pct=$(cat "$LANG_PCT_CACHE")
  repo_count=$(cat "$REPO_COUNT_CACHE")
fi

if [ -z "$lang_pct" ]; then
  echo -e "\n${YELLOW}(language breakdown unavailable)${NC}"
else
  echo -e "\n${BOLD}Languages across ${NC}${repo_count} ${BOLD}repos${NC}"

  echo "$lang_pct" | awk -F'\t' -v nc='\033[0m' -v bold='\033[1m' -v width=50 '
  BEGIN {
    n = split("JavaScript TypeScript Python Shell HTML CSS Java Go Ruby C C++ PHP Rust Swift Kotlin Dockerfile", known, " ")
    split("227 39 26 113 166 55 130 45 88 246 204 141 208 202 99 24", kcolor, " ")
    for (i = 1; i <= n; i++) colormap[known[i]] = kcolor[i]
    split("81 214 105 172 42 178 63 220 33 154 93 201", fallback, " ")
    nf = 12
    fi = 0
  }
  {
    lang[NR] = $1; pct[NR] = $2 + 0
    if (!(lang[NR] in colormap)) {
      colormap[lang[NR]] = fallback[(fi % nf) + 1]
      fi++
    }
    total = NR
  }
  END {
    used = 0
    printf "  "
    for (i = 1; i <= total; i++) {
      seg = int(pct[i] / 100 * width + 0.5)
      if (i == total) seg = width - used
      if (seg < 0) seg = 0
      used += seg
      c = colormap[lang[i]]
      for (j = 0; j < seg; j++) printf "\033[38;5;%sm█%s", c, nc
    }
    print ""
    for (i = 1; i <= total; i++) {
      c = colormap[lang[i]]
      printf "  \033[38;5;%sm●%s %-14s %s%5.1f%%%s\n", c, nc, lang[i], bold, pct[i], nc
    }
  }'
fi
