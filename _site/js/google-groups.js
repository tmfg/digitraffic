/***Write javascript under this line***/

/* Check if DOM is ready */
'use strict';

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init, false);
}

// Init function gets run when DOM is ready
function init() {
  // Write on load javascript below

  console.log('Google Groups script initiated');

  // Write on load javascript above
}