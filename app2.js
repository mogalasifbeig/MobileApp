<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Handle 402 Payment Required</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; }
    .status { padding: 1rem; border-radius: 8px; margin-top: 1rem; }
    .ok { background: #e6ffed; border: 1px solid #34d058; color: #1b1f23; }
    .warn { background: #fff5f5; border: 1px solid #ff6a6a; color: #1b1f23; }
    .muted { color: #6a737d; }
    button { padding: 0.6rem 1rem; border: 1px solid #d1d5da; border-radius: 6px; background: #fafbfc; cursor: pointer; }
    button:hover { background: #f6f8fa; }
    code { background: #f6f8fa; padding: 0.2rem 0.4rem; border-radius: 4px; }
  </style>
</head>
<body>
  <h1>Bitbucket push status demo</h1>

  <p class="muted">Click “Check status” to simulate a call that may return <code>402 Payment Required</code>.</p>

  <button id="checkBtn">Check status</button>

  <div id="status" class="status" style="display:none;"></div>

  <script>
    const statusBox = document.getElementById('status');
    const btn = document.getElementById('checkBtn');

    // Utility to render messages
    function showMessage(type, text) {
      statusBox.className = 'status ' + (type === 'ok' ? 'ok' : 'warn');
      statusBox.textContent = text;
      statusBox.style.display = 'block';
    }

    // Simulated API call: flip the "simulate402" flag to test both paths
    async function checkPushStatus({ simulate402 = true } = {}) {
      // Example placeholder endpoint; replace with your own API if needed
      const endpoint = 'https://httpstat.us/' + (simulate402 ? '402' : '200');

      try {
        const res = await fetch(endpoint, { method: 'GET' });

        if (res.status === 402) {
          showMessage('warn', 'Push blocked: Payment Required (402). Your plan/user limit has been exceeded. Update your plan or reduce users.');
          return;
        }

        if (!res.ok) {
          showMessage('warn', 'Unexpected error: ' + res.status + ' ' + res.statusText);
          return;
        }

        showMessage('ok', 'All good! You have write access.');
      } catch (err) {
        showMessage('warn', 'Network error: ' + (err && err.message ? err.message : 'unknown'));
      }
    }

    btn.addEventListener('click', () => {
      // Toggle simulate402:true/false to test success vs. 402
      checkPushStatus({ simulate402: true });
    });
  </script>
</body>
</html>
