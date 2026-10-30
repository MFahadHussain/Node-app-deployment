const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// API Endpoint for raw JSON data
app.get('/api', (req, res) => {
    res.json({
        status: "success",
        message: "Node.js application is running successfully via Docker and Nginx!",
        developer: "Fahad Hussain",
        organization: "FJR Technologies",
        timestamp: new Date().toISOString()
    });
});

// Root route serving a modern UI dashboard
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>FJR Technologies | Node.js Deployment</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-slate-900 text-slate-100 min-h-screen flex flex-col justify-between font-sans">
        <!-- Header / Navbar -->
        <header class="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
            <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                <div class="flex items-center space-x-3">
                    <div class="h-9 w-9 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
                        F
                    </div>
                    <span class="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">FJR Technologies</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span class="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span> Service Active
                    </span>
                </div>
            </div>
        </header>

        <!-- Main Content Hero -->
        <main class="max-w-4xl mx-auto px-6 py-12 flex-grow flex flex-col justify-center">
            <div class="text-center space-y-6">
                <div class="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-4 py-1.5 rounded-full text-sm font-medium">
                    <i class="fa-solid fa-server text-xs"></i>
                    <span>Docker Container Deployment</span>
                </div>
                
                <h1 class="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
                    Node.js Infrastructure <br/>
                    <span class="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">Live & Operational</span>
                </h1>

                <p class="text-slate-400 text-lg max-w-2xl mx-auto">
                    Reverse proxied with Nginx, secured via SSL certificates, and managed within a lightweight isolated Docker environment.
                </p>
            </div>

            <!-- Stats & Details Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div class="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 shadow-xl backdrop-blur-sm">
                    <div class="text-slate-400 text-sm font-medium mb-1">Lead Engineer</div>
                    <div class="text-xl font-bold text-white flex items-center">
                        <i class="fa-solid fa-code text-indigo-400 mr-2 text-base"></i> Fahad Hussain
                    </div>
                </div>

                <div class="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 shadow-xl backdrop-blur-sm">
                    <div class="text-slate-400 text-sm font-medium mb-1">Organization</div>
                    <div class="text-xl font-bold text-white flex items-center">
                        <i class="fa-solid fa-building text-sky-400 mr-2 text-base"></i> FJR Technologies
                    </div>
                </div>

                <div class="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 shadow-xl backdrop-blur-sm">
                    <div class="text-slate-400 text-sm font-medium mb-1">Environment</div>
                    <div class="text-xl font-bold text-white flex items-center">
                        <i class="fa-brands fa-docker text-emerald-400 mr-2 text-base"></i> Port 3000
                    </div>
                </div>
            </div>

            <!-- Endpoint Quick Reference -->
            <div class="mt-8 bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-400">
                <div class="flex items-center space-x-2 font-mono mb-2 sm:mb-0">
                    <span class="text-emerald-400">GET</span>
                    <span class="text-slate-200">/api</span>
                </div>
                <div class="text-slate-500 text-xs">
                    Access raw JSON status payload at <a href="/api" class="text-indigo-400 hover:underline">/api</a>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="border-t border-slate-800 py-6 text-center text-slate-500 text-sm">
            &copy; ${new Date().getFullYear()} FJR Technologies. Managed by Fahad Hussain. All rights reserved.
        </footer>
    </body>
    </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
