
function lengthOfLongestSubstring (str) {
  const len = str.length;
  const set = new Set();
  let ans = 0, i = 0, j = 0;
  while (i < len && j < len) {
    if (!set.has(str.charAt(j))) {
      set.add(str.charAt(j++));
      ans = Math.max(ans, j - i);
    } else {
      set.delete(s.charAt(i ++));
    }
  }
  return ans;
}