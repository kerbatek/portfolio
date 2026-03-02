(function () {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', theme);

    document.addEventListener('DOMContentLoaded', function () {
        var btn = document.querySelector('.theme-toggle');
        if (!btn) return;

        function update() {
            var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            btn.querySelector('.icon-sun').style.display = isDark ? 'block' : 'none';
            btn.querySelector('.icon-moon').style.display = isDark ? 'none' : 'block';
        }

        btn.addEventListener('click', function () {
            var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            update();
        });

        update();
    });
})();
