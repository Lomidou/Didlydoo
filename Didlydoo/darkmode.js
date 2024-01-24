document.addEventListener('DOMContentLoaded', function () {
    const switchInput = document.getElementById('themeSwitch');
    const wrapper = document.querySelector('.wrapper');
    const body = document.body;
  
    // Fonction pour basculer entre le thème sombre et le thème clair
    function toggleTheme() {
      body.classList.toggle('dark-mode');
      // Enregistrez le choix de l'utilisateur dans le stockage local
      const isDarkMode = body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDarkMode);
    }
  
    // Gestionnaire d'événements pour le changement de l'interrupteur (switch)
    switchInput.addEventListener('change', toggleTheme);
  
    // Fonction pour initialiser le thème en fonction du choix de l'utilisateur au chargement de la page
    function initializeTheme() {
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode === 'true') {
        body.classList.add('dark-mode');
        switchInput.checked = true;
      }
    }
  
    // Gestionnaire d'événements pour le chargement de la page
    document.addEventListener('DOMContentLoaded', initializeTheme);
  });
  