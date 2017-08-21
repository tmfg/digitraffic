window.onscroll = () => {
  const headerClasses = document.body.querySelector(".header").classList;
  
  if (window.scrollY < 40) {
    console.log('Scrolled to Top!', window.scrollY);
    if (headerClasses.contains("header--scrolled")) {
      headerClasses.remove("header--scrolled");
    }
  }
  else {
    console.log('Scrolled:', window.scrollY);
    if (!headerClasses.contains("header-scrolled")) {
      headerClasses.add("header--scrolled");
    }
  }
}