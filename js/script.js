---
---

/* Add .header--scrolled when scrolling page */
window.onscroll = () => {
  const headerClasses = document.body.querySelector(".header").classList;
  
  if (window.scrollY < 40) {
    if (headerClasses.contains("header--scrolled")) {
      headerClasses.remove("header--scrolled");
    }
  } else {
    if (!headerClasses.contains("header--scrolled")) {
      headerClasses.add("header--scrolled");
    }
  }
}