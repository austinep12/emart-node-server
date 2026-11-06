// E-MART Electronics - Server-side application using the Node.js HTTP module
const products = [
  { name: "Galaxy Ultra S26", category: "Smartphones", price: "₹1,24,999", icon: "📱" },
  { name: "ZenBook Pro 14", category: "Laptops", price: "₹89,990", icon: "💻" },
  { name: "SoundMax ANC Pro", category: "Audio", price: "₹14,499", icon: "🎧" }
];

// Common HTML layout used by every page
function pageTemplate(title, content, req, status) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} | E-MART</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { background:#060b16; color:#eef4ff; font-family:'Poppins',sans-serif; }
    a { color:inherit; text-decoration:none; }
    header { display:flex; justify-content:space-between; align-items:center;
             padding:20px 8%; background:#0a1222; border-bottom:1px solid #1c2840; }
    .logo { font:700 24px 'Space Grotesk'; } .logo span { color:#22d3ee; }
    nav a { margin-left:26px; color:#b6c2d9; font-size:14px; }
    nav a:hover { color:#22d3ee; }
    main { padding:60px 8%; min-height:72vh;
           background:radial-gradient(circle at 15% 30%, #0e3a5a55, transparent 45%); }
    .tag { color:#22d3ee; font-size:11px; letter-spacing:3px; font-weight:600; }
    h1 { font:700 52px 'Space Grotesk'; margin:16px 0; line-height:1.1; }
    h1 span { color:#22d3ee; display:block; }
    h2 { font:700 30px 'Space Grotesk'; margin:14px 0 8px; }
    p { color:#9fabc2; line-height:1.8; font-size:14px; max-width:620px; }
    .btn { display:inline-block; margin-top:26px; padding:13px 24px; border-radius:8px;
           background:linear-gradient(90deg,#06b6d4,#2563eb); color:#fff; font-size:14px; }
    .grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:28px; }
    .card { background:#0e1626; border:1px solid #1f2a40; border-radius:14px; padding:24px; }
    .card .icon { font-size:40px; }
    .card h3 { margin:12px 0 4px; font-size:17px; }
    .card small { color:#22d3ee; } .card b { display:block; margin-top:10px; color:#fbbf24; }
    .info { margin-top:28px; padding:18px 22px; border:1px solid #1f2a40; border-radius:12px;
            background:#0b1322; font-size:12px; color:#8a97ae; line-height:1.9; }
    .info strong { color:#cbd5e1; }
    footer { text-align:center; padding:24px; background:#0a1222; color:#7c8aa5;
             font-size:12px; border-top:1px solid #1c2840; }
    @media (max-width:700px) { .grid { grid-template-columns:1fr; } h1 { font-size:36px; }
      header { flex-direction:column; gap:12px; } nav a { margin:0 10px; } }
  </style>
</head>
<body>
  <header>
    <a class="logo" href="/">E-<span>MART</span></a>
    <nav>
      <a href="/">Home</a>
      <a href="/home">Store Hub</a>
      <a href="/products">Products</a>
      <a href="/about">About</a>
    </nav>
  </header>
  <main>
    ${content}
    <div class="info">
      <strong>Server request details</strong><br>
      Request URL: ${req.url}<br>
      Request Method: ${req.method}<br>
      HTTP Status Code: ${status}
    </div>
  </main>
  <footer>© 2026 E-MART Electronics. All Rights Reserved.</footer>
</body>
</html>`;
}

function renderProducts() {
  return products.map(p => `
    <div class="card">
      <div class="icon">${p.icon}</div>
      <h3>${p.name}</h3>
      <small>${p.category}</small>
      <b>${p.price}</b>
    </div>`).join("");
}

// Decide what to show for each URL
function pageContent(path) {
  if (path === "/")
    return ["Home", `
      <p class="tag">⚡ INDIA'S SMART ELECTRONICS STORE</p>
      <h1>UPGRADE YOUR <span>DIGITAL LIFE.</span></h1>
      <p>Welcome to E-MART! Shop the latest smartphones, laptops, audio gear
         and smart gadgets at the best prices.</p>
      <a class="btn" href="/products">Explore Products →</a>`];

  if (path === "/home")
    return ["Store Hub", `
      <p class="tag">STORE HUB</p>
      <h2>Shop by Category</h2>
      <p>Pick a category and find the right gadget for you.</p>
      <div class="grid">
        <div class="card"><div class="icon">📱</div><h3>Smartphones</h3><small>120+ models</small></div>
        <div class="card"><div class="icon">💻</div><h3>Laptops</h3><small>80+ models</small></div>
        <div class="card"><div class="icon">⌚</div><h3>Wearables</h3><small>60+ models</small></div>
      </div>`];

  if (path === "/products")
    return ["Products", `
      <p class="tag">TRENDING THIS WEEK</p>
      <h2>Featured Products</h2>
      <p>Some of the best-selling electronics at E-MART.</p>
      <div class="grid">${renderProducts()}</div>`];

  if (path === "/about")
    return ["About", `
      <p class="tag">WHO WE ARE</p>
      <h2>About E-MART</h2>
      <p>E-MART is an online electronics store that brings genuine gadgets,
         fair prices and fast delivery together in one place.</p>
      <div class="grid">
        <div class="card"><div class="icon">🎯</div><h3>Our Mission</h3><small>Make tech shopping simple and affordable.</small></div>
        <div class="card"><div class="icon">🛡️</div><h3>Genuine Products</h3><small>100% original with brand warranty.</small></div>
        <div class="card"><div class="icon">🚚</div><h3>Fast Delivery</h3><small>Delivered to your door in 48 hours.</small></div>
      </div>`];

  return ["404 Error", `
      <p class="tag">ERROR 404</p>
      <h1>PAGE <span>NOT FOUND.</span></h1>
      <p>The page you are looking for does not exist on E-MART.</p>
      <a class="btn" href="/">Return Home</a>`];
}

// Request handler: reads the URL and sends the right response
function handler(req, res) {
  const method = req.method || "GET";
  const path = new URL(req.url, "http://localhost").pathname;
  console.log(method, path);

  if (method !== "GET") {
    res.writeHead(405, { "Content-Type": "text/plain" });
    return res.end("Method Not Allowed");
  }

  const [title, content] = pageContent(path);
  const status = title === "404 Error" ? 404 : 200;

  res.writeHead(status, { "Content-Type": "text/html; charset=utf-8" });
  res.end(pageTemplate(title, content, { url: path, method }, status));
}

module.exports = handler;
