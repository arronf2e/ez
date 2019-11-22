export const getRepoLatestRelease = ({ owner, repo }) =>
  `https://api.github.com/repos/${owner}/${repo}/releases/latest`;

export const getRepoByTag = ({ owner, repo, tag }) =>
  `https://api.github.com/repos/${owner}/${repo}/releases/tags/${tag}`;
