"""Static server for the exported web build with SPA fallback (unknown paths -> index.html).
Usage: python3 tools/spa_server.py [dir=dist] [port=8099]"""
import http.server, os, sys

root = sys.argv[1] if len(sys.argv) > 1 else 'dist'
port = int(sys.argv[2]) if len(sys.argv) > 2 else 8099


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=root, **k)

    def log_message(self, *a):
        pass

    def send_head(self):
        if not os.path.exists(self.translate_path(self.path.split('?')[0])):
            self.path = '/index.html'
        return super().send_head()


http.server.ThreadingHTTPServer(('127.0.0.1', port), Handler).serve_forever()
