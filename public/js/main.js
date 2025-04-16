document.getElementById("tahun").textContent = new Date().getFullYear();
  document.addEventListener('DOMContentLoaded', function () {
    const themeSwitcherButton = document.querySelector('.theme-switcher-module--button--1cdf0');
    const rootElement = document.documentElement;

    const setTheme = (theme) => {
      if (theme === 'dark') {
        rootElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        rootElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    };

    const currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);

    themeSwitcherButton.addEventListener('click', function () {
      const isDarkMode = rootElement.classList.contains('dark');
      setTheme(isDarkMode ? 'light' : 'dark');
    });
  });
