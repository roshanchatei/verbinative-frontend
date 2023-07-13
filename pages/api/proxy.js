import { createProxyMiddleware } from 'http-proxy-middleware';

const proxy = createProxyMiddleware({
    target: 'http://54.211.136.163:8080', // The target URL
    changeOrigin: true,
    // Add any additional options or headers if required
});

export default function handler(req, res) {
    proxy(req, res);
}
