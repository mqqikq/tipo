import re, base64, pathlib, sys

def inline(html_path):
    p = pathlib.Path(html_path)
    base = p.parent
    html = p.read_text(encoding='utf-8')
    cache = {}
    def datauri(rel):
        rel = rel.strip().strip('"').strip("'")
        if rel.startswith('data:'): return rel
        fp = (base / rel)
        if not fp.exists(): return rel
        if rel in cache: return cache[rel]
        b = fp.read_bytes()
        ext = fp.suffix.lower().lstrip('.')
        mime = 'image/jpeg' if ext in ('jpg','jpeg') else 'image/'+ext
        uri = 'data:%s;base64,%s' % (mime, base64.b64encode(b).decode())
        cache[rel] = uri
        return uri
    # src="assets/x.jpg"
    html = re.sub(r'src="(assets/[^"]+)"', lambda m: 'src="%s"' % datauri(m.group(1)), html)
    # url("assets/x.jpg") / url('...') / url(...)
    html = re.sub(r'url\((["\']?)(assets/[^"\')]+)\1\)', lambda m: 'url("%s")' % datauri(m.group(2)), html)
    p.write_text(html, encoding='utf-8')
    n = len(cache)
    print('%s -> inlined %d images, %d KB' % (html_path, n, len(html)//1024))

for f in sys.argv[1:]:
    inline(f)
