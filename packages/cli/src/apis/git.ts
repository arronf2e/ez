export const getRepoLatestRelease = ({ owner, repo }: { owner: string; repo: string }) =>
  `https://api.github.com/repos/${owner}/${repo}/releases/latest`;

export const getRepoByTag = ({ owner, repo, tag }: { owner: string; repo: string; tag: string }) =>
  `https://api.github.com/repos/${owner}/${repo}/releases/tags/${tag}`;
