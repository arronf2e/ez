"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRepoLatestRelease = ({ owner, repo }) => `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
exports.getRepoByTag = ({ owner, repo, tag }) => `https://api.github.com/repos/${owner}/${repo}/releases/tags/${tag}`;
